"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskLocalService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const info_1 = require("../entity/info");
const log_1 = require("../entity/log");
const _ = require("lodash");
const utils_1 = require("../../../comm/utils");
const uuid_1 = require("uuid");
const moment = require("moment");
const CronJob = require("cron");
/**
 * 本地任务
 */
let TaskLocalService = class TaskLocalService extends core_2.BaseService {
    constructor() {
        super(...arguments);
        // 存储所有运行的任务
        this.cronJobs = new Map();
    }
    /**
     * 停止任务
     */
    async stop(id) {
        const task = await this.taskInfoEntity.findOneBy({ id: (0, typeorm_2.Equal)(id) });
        if (task) {
            this.stopByJobId(task.jobId);
            this.coolEventManager.emit('onLocalTaskStop', task.jobId);
            task.status = 0;
            await this.taskInfoEntity.update(task.id, task);
            await this.updateNextRunTime(task.jobId);
        }
    }
    /**
     * 停止任务
     * @param jobId
     */
    async stopByJobId(jobId) {
        const job = this.cronJobs.get(jobId);
        if (job) {
            job.stop();
            this.cronJobs.delete(jobId);
        }
    }
    /**
     * 开始任务
     */
    async start(id, type) {
        const task = await this.taskInfoEntity.findOneBy({ id: (0, typeorm_2.Equal)(id) });
        task.status = 1;
        if (type || type == 0) {
            task.type = type;
        }
        await this.addOrUpdate(task);
    }
    /**
     * 手动执行一次
     */
    async once(id) {
        const task = await this.taskInfoEntity.findOneBy({ id: (0, typeorm_2.Equal)(id) });
        if (task) {
            await this.executeJob(task);
        }
    }
    /**
     * 检查任务是否存在
     */
    async exist(jobId) {
        return this.cronJobs.has(jobId);
    }
    /**
     * 创建定时任务
     */
    createCronJob(task) {
        let cronTime;
        if (task.taskType === 0) {
            // cron 类型
            cronTime = task.cron;
        }
        else {
            // 间隔类型
            cronTime = `*/${task.every / 1000} * * * * *`;
        }
        const job = new CronJob.CronJob(cronTime, async () => {
            await this.executeJob(task);
        }, null, false, 'Asia/Shanghai');
        this.cronJobs.set(task.jobId, job);
        job.start();
        return job;
    }
    /**
     * 执行任务
     */
    async executeJob(task) {
        await this.executor(task);
    }
    /**
     * 新增或修改
     */
    async addOrUpdate(params) {
        if (!params.jobId) {
            params.jobId = (0, uuid_1.v4)();
        }
        await this.getOrmManager().transaction(async (transactionalEntityManager) => {
            if (params.taskType === 0) {
                params.limit = null;
                params.every = null;
            }
            else {
                params.cron = null;
            }
            await transactionalEntityManager.save(info_1.TaskInfoEntity, params);
            if (params.status === 1) {
                const exist = await this.exist(params.jobId);
                if (exist) {
                    const job = this.cronJobs.get(params.jobId);
                    job.stop();
                    this.cronJobs.delete(params.jobId);
                    this.coolEventManager.emit('onLocalTaskStop', params.jobId);
                }
                this.createCronJob(params);
            }
        });
        if (params.status === 1) {
            await this.updateNextRunTime(params.jobId);
        }
    }
    /**
     * 删除任务
     */
    async delete(ids) {
        let idArr;
        if (ids instanceof Array) {
            idArr = ids;
        }
        else {
            idArr = ids.split(',');
        }
        for (const id of idArr) {
            const task = await this.taskInfoEntity.findOneBy({ id });
            if (task) {
                const job = this.cronJobs.get(task.jobId);
                if (job) {
                    job.stop();
                    this.cronJobs.delete(task.jobId);
                }
                await this.taskInfoEntity.delete({ id });
                await this.taskLogEntity.delete({ taskId: id });
            }
        }
    }
    /**
     * 记录任务执行情况
     */
    async record(task, status, detail) {
        const info = await this.taskInfoEntity.findOneBy({
            jobId: (0, typeorm_2.Equal)(task.jobId),
        });
        await this.taskLogEntity.save({
            taskId: info.id,
            status,
            detail: detail || '',
        });
        await this.taskLogEntity.delete({
            taskId: info.id,
            createTime: (0, typeorm_2.LessThan)(moment().subtract(this.keepDays, 'days').toDate()),
        });
    }
    /**
     * 获取下次执行时间
     */
    async getNextRunTime(jobId) {
        const job = this.cronJobs.get(jobId);
        return job ? job.nextDate().toJSDate() : null;
    }
    /**
     * 更新下次执行时间
     */
    async updateNextRunTime(jobId) {
        const nextRunTime = await this.getNextRunTime(jobId);
        if (nextRunTime) {
            await this.taskInfoEntity.update({ jobId }, { nextRunTime });
        }
    }
    /**
     * 初始化任务
     */
    async initTask() {
        try {
            this.logger.info('init local task....');
            const runningTasks = await this.taskInfoEntity.findBy({ status: 1 });
            if (!_.isEmpty(runningTasks)) {
                for (const task of runningTasks) {
                    const job = await this.exist(task.jobId);
                    if (!job) {
                        this.logger.info(`init local task ${task.name}`);
                        await this.addOrUpdate(task);
                    }
                }
            }
        }
        catch (e) {
            this.logger.error('Init local task error:', e);
        }
    }
    /**
     * 调用service
     */
    async invokeService(serviceStr) {
        if (serviceStr) {
            const arr = serviceStr.split('.');
            const service = await this.app
                .getApplicationContext()
                .getAsync(_.lowerFirst(arr[0]));
            for (let i = 1; i < arr.length; i++) {
                const child = arr[i];
                if (child.includes('(')) {
                    const [methodName, paramsStr] = child.split('(');
                    const params = paramsStr
                        .replace(')', '')
                        .split(',')
                        .map(param => param.trim());
                    if (params.length === 1 && params[0] === '') {
                        return service[methodName]();
                    }
                    else {
                        const parsedParams = params.map(param => {
                            try {
                                return JSON.parse(param);
                            }
                            catch (e) {
                                return param;
                            }
                        });
                        return service[methodName](...parsedParams);
                    }
                }
            }
        }
    }
    /**
     * 获取任务详情
     */
    async info(id) {
        const info = await this.taskInfoEntity.findOneBy({ id });
        return {
            ...info,
            repeatCount: info.limit,
        };
    }
    /**
     * 执行器
     */
    async executor(task) {
        // 如果不是开始时间之后的 则不执行
        if (task.startDate && moment(task.startDate).isAfter(moment())) {
            return;
        }
        try {
            const currentTime = moment().toDate();
            const lockExpireTime = moment().add(5, 'minutes').toDate();
            const result = await this.taskInfoEntity
                .createQueryBuilder()
                .update()
                .set({
                lastExecuteTime: currentTime,
                lockExpireTime: lockExpireTime,
            })
                .where('id = :id', { id: task.id })
                .andWhere('lockExpireTime IS NULL OR lockExpireTime < :currentTime', {
                currentTime,
            })
                .execute();
            // 如果更新失败（affected === 0），说明其他实例正在执行
            if (result.affected === 0) {
                return;
            }
            const serviceResult = await this.invokeService(task.service);
            await this.record(task, 1, JSON.stringify(serviceResult));
        }
        catch (error) {
            await this.record(task, 0, error.message);
        }
        finally {
            // 释放锁
            await this.taskInfoEntity.update({ id: task.id }, { lockExpireTime: null });
        }
        if (!task.isOnce) {
            await this.updateNextRunTime(task.jobId);
            await this.taskInfoEntity.update({ id: task.id }, { status: 1 });
        }
    }
};
exports.TaskLocalService = TaskLocalService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.TaskInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], TaskLocalService.prototype, "taskInfoEntity", void 0);
__decorate([
    (0, core_1.Logger)(),
    __metadata("design:type", Object)
], TaskLocalService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(log_1.TaskLogEntity),
    __metadata("design:type", typeorm_2.Repository)
], TaskLocalService.prototype, "taskLogEntity", void 0);
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], TaskLocalService.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], TaskLocalService.prototype, "utils", void 0);
__decorate([
    (0, core_1.Config)('task.log.keepDays'),
    __metadata("design:type", Number)
], TaskLocalService.prototype, "keepDays", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_2.CoolEventManager)
], TaskLocalService.prototype, "coolEventManager", void 0);
exports.TaskLocalService = TaskLocalService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton)
], TaskLocalService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy90YXNrL3NlcnZpY2UvbG9jYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBUXdCO0FBQ3hCLDRDQUFrRTtBQUNsRSwrQ0FBc0Q7QUFDdEQscUNBQXNEO0FBQ3RELHlDQUFnRDtBQUNoRCx1Q0FBOEM7QUFFOUMsNEJBQTRCO0FBQzVCLCtDQUE0QztBQUU1QywrQkFBb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLGdDQUFnQztBQUVoQzs7R0FFRztBQUdJLElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQWlCLFNBQVEsa0JBQVc7SUFBMUM7O1FBc0JMLFlBQVk7UUFDSixhQUFRLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7SUE0UzdELENBQUM7SUExU0M7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDWCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUEsZUFBSyxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hELE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0gsQ0FB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