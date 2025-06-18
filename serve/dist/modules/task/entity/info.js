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
exports.TaskInfoEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 任务信息
 */
let TaskInfoEntity = class TaskInfoEntity extends base_1.BaseEntity {
};
exports.TaskInfoEntity = TaskInfoEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '任务ID', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '任务配置', nullable: true, length: 1000 }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "repeatConf", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'cron', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "cron", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '最大执行次数 不传为无限次', nullable: true }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "limit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效',
        nullable: true,
    }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "every", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '备注', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态 0-停止 1-运行', default: 1 }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '开始时间', nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '结束时间', nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '数据', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '执行的service实例ID', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态 0-系统 1-用户', default: 0 }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '下一次执行时间', nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "nextRunTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态 0-cron 1-时间间隔', default: 0 }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "taskType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "lastExecuteTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "lockExpireTime", void 0);
exports.TaskInfoEntity = TaskInfoEntity = __decorate([
    (0, typeorm_1.Entity)('task_info')
], TaskInfoEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Rhc2svZW50aXR5L2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW9EO0FBQ3BELHFDQUF5QztBQUV6Qzs7R0FFRztBQUVJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWUsU0FBUSxpQkFBVTtDQXNEN0MsQ0FBQTtBQXREWSx3Q0FBYztBQUV6QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs2Q0FDOUI7QUFHZDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tEQUN2QztBQUduQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQ2I7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs0Q0FDL0I7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs2Q0FDdkM7QUFNZDtJQUpDLElBQUEsZ0JBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSwrQkFBK0I7UUFDeEMsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzs2Q0FDWTtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUMzQjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7OzhDQUNqQztBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ2pDLElBQUk7aURBQUM7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDbkMsSUFBSTsrQ0FBQztBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzRDQUM3QjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQ3RDO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7OzRDQUNuQztBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ2xDLElBQUk7bURBQUM7QUFHbEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOztnREFDbkM7QUFHakI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ1YsSUFBSTt1REFBQztBQUd0QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDWCxJQUFJO3NEQUFDO3lCQXJEVixjQUFjO0lBRDFCLElBQUEsZ0JBQU0sRUFBQyxXQUFXLENBQUM7R0FDUCxjQUFjLENBc0QxQiJ9