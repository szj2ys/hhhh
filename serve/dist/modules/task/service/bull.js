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
exports.TaskBullService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const info_1 = require("../entity/info");
const log_1 = require("../entity/log");
const _ = require("lodash");
const utils_1 = require("../../../comm/utils");
const task_1 = require("../queue/task");
const moment = require("moment");
/**
 * 任务
 */
let TaskBullService = class TaskBullService extends core_2.BaseService {
    /**
     * 停止任务
     * @param id
     */
    async stop(id) {
        const task = await this.taskInfoEntity.findOneBy({ id: (0, typeorm_2.Equal)(id) });
        if (task) {
            const result = await this.taskInfoQueue.getJobSchedulers();
            const job = _.find(result, e => {
                return e.key == task.jobId;
            });
            if (job) {
                await this.taskInfoQueue.removeJobScheduler(job.key);
            }
            task.status = 0;
            await this.taskInfoEntity.update(task.id, task);
            await this.updateNextRunTime(task.jobId);
        }
    }
    /**
     * 移除任务
     * @param taskId
     */
    async remove(taskId) {
        const info = await this.taskInfoEntity.findOneBy({ id: (0, typeorm_2.Equal)(taskId) });
        const result = await this.taskInfoQueue.getJobSchedulers();
        const job = _.find(result, { key: info === null || info === void 0 ? void 0 : info.jobId });
        if (job) {
            await this.taskInfoQueue.removeJobScheduler(job.key);
        }
    }
    /**
     * 开始任务
     * @param id
     * @param type
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
     * @param id
     */
    async once(id) {
        const task = await this.taskInfoEntity.findOneBy({ id: (0, typeorm_2.Equal)(id) });
        if (task) {
            await this.taskInfoQueue.add({
                ...task,
                isOnce: true,
            }, {
                jobId: task.jobId,
                removeOnComplete: true,
                removeOnFail: true,
            });
        }
    }
    /**
     * 检查任务是否存在
     * @param jobId
     */
    async exist(jobId) {
        const info = await this.taskInfoEntity.findOneBy({ jobId: (0, typeorm_2.Equal)(jobId) });
        if (!info) {
            return false;
        }
        const result = await this.taskInfoQueue.getJobSchedulers();
        const job = _.find(result, e => {
            return e.key == info.jobId;
        });
        return !!job;
    }
    /**
     * 新增或修改
     * @param params
     */
    async addOrUpdate(params) {
        delete params.repeatCount;
        let repeatConf, jobId;
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
                    await this.remove(params.id);
                }
                const { every, limit, startDate, endDate, cron } = params;
                const repeat = {
                    every,
                    limit,
                    jobId: params.jobId,
                    startDate,
                    endDate,
                    cron,
                };
                await this.utils.removeEmptyP(repeat);
                const result = await this.taskInfoQueue.add(params, {
                    jobId: params.jobId,
                    removeOnComplete: true,
                    removeOnFail: true,
                    repeat,
                });
                if (!(result === null || result === void 0 ? void 0 : result.repeatJobKey)) {
                    throw new Error('任务添加失败，请检查任务配置');
                }
                jobId = result.repeatJobKey;
                repeatConf = result.opts;
            }
        });
        if (params.status === 1) {
            await this.updateNextRunTime(params.jobId);
            await this.taskInfoEntity.update(params.id, {
                repeatConf: JSON.stringify(repeatConf.repeat),
                status: 1,
                jobId,
            });
        }
    }
    /**
     * 删除
     * @param ids
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
            const exist = await this.exist(task.jobId);
            if (exist) {
                this.stop(task.id);
            }
            await this.taskInfoEntity.delete({ id });
            await this.taskLogEntity.delete({ taskId: id });
        }
    }
    /**
     * 保存任务记录，成功任务每个任务保留最新20条日志，失败日志不会删除
     * @param task
     * @param status
     * @param detail
     */
    async record(task, status, detail) {
        const info = await this.taskInfoEntity.findOneBy({
            id: (0, typeorm_2.Equal)(task.id),
        });
        if (!info) {
            return;
        }
        await this.taskLogEntity.save({
            taskId: info.id,
            status,
            detail: detail || '',
        });
        // 删除时间超过20天的日志
        await this.taskLogEntity.delete({
            taskId: info.id,
            createTime: (0, typeorm_2.LessThan)(moment().subtract(this.keepDays, 'days').toDate()),
        });
    }
    /**
     * 初始化任务
     */
    async initTask() {
        try {
            await this.utils.sleep(3000);
            this.logger.info('init task....');
            const runningTasks = await this.taskInfoEntity.findBy({ status: 1 });
            if (!_.isEmpty(runningTasks)) {
                for (const task of runningTasks) {
                    const job = await this.exist(task.jobId); // 任务已存在就不添加
                    if (!job) {
                        this.logger.info(`init task ${task.name}`);
                        await this.addOrUpdate(task);
                    }
                }
            }
        }
        catch (e) { }
    }
    /**
     * 任务ID
     * @param jobId
     */
    async getNextRunTime(jobId) {
        let nextRunTime;
        const result = await this.taskInfoQueue.getJobSchedulers();
        const task = _.find(result, e => {
            return e.key === jobId;
        });
        if (task) {
            nextRunTime = new Date(task.next);
        }
        return nextRunTime;
    }
    /**
     * 更新下次执行时间
     * @param jobId
     */
    async updateNextRunTime(jobId) {
        const nextRunTime = await this.getNextRunTime(jobId);
        if (!nextRunTime) {
            return;
        }
        await this.taskInfoEntity.update({ jobId }, {
            nextRunTime,
        });
    }
    /**
     * 详情
     * @param id
     * @returns
     */
    async info(id) {
        const info = await this.taskInfoEntity.findOneBy({ id });
        return {
            ...info,
            repeatCount: info.limit,
        };
    }
    /**
     * 刷新任务状态
     */
    async updateStatus(jobId) {
        const task = await this.taskInfoEntity.findOneBy({ id: jobId });
        if (!task) {
            return;
        }
        const result = await this.taskInfoQueue.getJobSchedulers();
        const job = _.find(result, { key: task.jobId });
        if (!job) {
            return;
        }
        const nextTime = await this.getNextRunTime(task.jobId);
        if (task) {
            task.nextRunTime = nextTime;
            await this.taskInfoEntity.update(task.id, task);
        }
    }
    /**
     * 调用service
     * @param serviceStr
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
                                return param; // 如果不是有效的JSON,则返回原始字符串
                            }
                        });
                        return service[methodName](...parsedParams);
                    }
                }
            }
        }
    }
};
exports.TaskBullService = TaskBullService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.TaskInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], TaskBullService.prototype, "taskInfoEntity", void 0);
__decorate([
    (0, core_1.Logger)(),
    __metadata("design:type", Object)
], TaskBullService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(log_1.TaskLogEntity),
    __metadata("design:type", typeorm_2.Repository)
], TaskBullService.prototype, "taskLogEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", task_1.TaskInfoQueue)
], TaskBullService.prototype, "taskInfoQueue", void 0);
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], TaskBullService.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], TaskBullService.prototype, "utils", void 0);
__decorate([
    (0, core_1.Config)('task.log.keepDays'),
    __metadata("design:type", Number)
], TaskBullService.prototype, "keepDays", void 0);
exports.TaskBullService = TaskBullService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Request, { allowDowngrade: true })
], TaskBullService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Rhc2svc2VydmljZS9idWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQVF3QjtBQUN4Qiw0Q0FBZ0Q7QUFDaEQsK0NBQXNEO0FBQ3RELHFDQUFzRDtBQUN0RCx5Q0FBZ0Q7QUFDaEQsdUNBQThDO0FBRTlDLDRCQUE0QjtBQUM1QiwrQ0FBNEM7QUFDNUMsd0NBQThDO0FBRTlDLGlDQUFpQztBQUVqQzs7R0FFRztBQUdJLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWdCLFNBQVEsa0JBQVc7SUFzQjlDOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNYLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBQSxlQUFLLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksSUFBSSxFQUFFLENBQUM7WUFDVCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMzRCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDN0IsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNSLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUs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