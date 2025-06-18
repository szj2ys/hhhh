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
exports.TaskInfoService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const info_1 = require("../entity/info");
const task_1 = require("@cool-midway/task");
const bull_1 = require("./bull");
const local_1 = require("./local");
const log_1 = require("../entity/log");
/**
 * 任务
 */
let TaskInfoService = class TaskInfoService extends core_2.BaseService {
    constructor() {
        super(...arguments);
        this.type = 'local';
    }
    async init() {
        await super.init();
        await this.initType();
        this.setEntity(this.taskInfoEntity);
    }
    /**
     * 初始化任务类型
     */
    async initType() {
        try {
            const check = await this.app
                .getApplicationContext()
                .getAsync(task_1.CoolQueueHandle);
            if (check) {
                this.type = 'bull';
            }
            else {
                this.type = 'local';
            }
        }
        catch (e) {
            this.type = 'local';
        }
        return this.type;
    }
    /**
     * 停止任务
     * @param id
     */
    async stop(id) {
        this.type === 'bull'
            ? await this.taskBullService.stop(id)
            : await this.taskLocalService.stop(id);
    }
    /**
     * 开始任务
     * @param id
     * @param type
     */
    async start(id, type) {
        this.type === 'bull'
            ? await this.taskBullService.start(id)
            : await this.taskLocalService.start(id, type);
    }
    /**
     * 手动执行一次
     * @param id
     */
    async once(id) {
        this.type === 'bull'
            ? this.taskBullService.once(id)
            : this.taskLocalService.once(id);
    }
    /**
     * 检查任务是否存在
     * @param jobId
     */
    async exist(jobId) {
        this.type === 'bull'
            ? this.taskBullService.exist(jobId)
            : this.taskLocalService.exist(jobId);
    }
    /**
     * 新增或修改
     * @param params
     */
    async addOrUpdate(params) {
        this.type === 'bull'
            ? this.taskBullService.addOrUpdate(params)
            : this.taskLocalService.addOrUpdate(params);
    }
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        this.type === 'bull'
            ? this.taskBullService.delete(ids)
            : this.taskLocalService.delete(ids);
    }
    /**
     * 任务日志
     * @param query
     */
    async log(query) {
        const { id, status } = query;
        const find = await this.taskLogEntity
            .createQueryBuilder('a')
            .select(['a.*', 'b.name as taskName'])
            .leftJoin(info_1.TaskInfoEntity, 'b', 'a.taskId = b.id')
            .where('a.taskId = :id', { id });
        if (status || status == 0) {
            find.andWhere('a.status = :status', { status });
        }
        return await this.entityRenderPage(find, query);
    }
    /**
     * 初始化任务
     */
    async initTask() {
        this.type === 'bull'
            ? this.taskBullService.initTask()
            : this.taskLocalService.initTask();
    }
    /**
     * 详情
     * @param id
     * @returns
     */
    async info(id) {
        this.type === 'bull'
            ? this.taskBullService.info(id)
            : this.taskLocalService.info(id);
    }
};
exports.TaskInfoService = TaskInfoService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.TaskInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], TaskInfoService.prototype, "taskInfoEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(log_1.TaskLogEntity),
    __metadata("design:type", typeorm_2.Repository)
], TaskInfoService.prototype, "taskLogEntity", void 0);
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], TaskInfoService.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", bull_1.TaskBullService)
], TaskInfoService.prototype, "taskBullService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", local_1.TaskLocalService)
], TaskInfoService.prototype, "taskLocalService", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskInfoService.prototype, "init", null);
exports.TaskInfoService = TaskInfoService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Request, { allowDowngrade: true })
], TaskInfoService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Rhc2svc2VydmljZS9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUE4RTtBQUM5RSw0Q0FBZ0Q7QUFDaEQsK0NBQXNEO0FBQ3RELHFDQUFxQztBQUNyQyx5Q0FBZ0Q7QUFHaEQsNENBQW9EO0FBQ3BELGlDQUF5QztBQUN6QyxtQ0FBMkM7QUFDM0MsdUNBQThDO0FBQzlDOztHQUVHO0FBR0ksSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZ0IsU0FBUSxrQkFBVztJQUF6Qzs7UUFPTCxTQUFJLEdBQXFCLE9BQU8sQ0FBQztJQWlJbkMsQ0FBQztJQXJITyxBQUFOLEtBQUssQ0FBQyxJQUFJO1FBQ1IsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFFBQVE7UUFDWixJQUFJLENBQUM7WUFDSCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHO2lCQUN6QixxQkFBcUIsRUFBRTtpQkFDdkIsUUFBUSxDQUFDLHNCQUFlLENBQUMsQ0FBQztZQUM3QixJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUN0QixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25C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