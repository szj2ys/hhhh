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
exports.TaskLogEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 任务日志
 */
let TaskLogEntity = class TaskLogEntity extends base_1.BaseEntity {
};
exports.TaskLogEntity = TaskLogEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '任务ID', nullable: true }),
    __metadata("design:type", Number)
], TaskLogEntity.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态 0-失败 1-成功', default: 0 }),
    __metadata("design:type", Number)
], TaskLogEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '详情描述', nullable: true, type: 'text' }),
    __metadata("design:type", String)
], TaskLogEntity.prototype, "detail", void 0);
exports.TaskLogEntity = TaskLogEntity = __decorate([
    (0, typeorm_1.Entity)('task_log')
], TaskLogEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvdGFzay9lbnRpdHkvbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFvRDtBQUNwRCxxQ0FBZ0Q7QUFFaEQ7O0dBRUc7QUFFSSxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFjLFNBQVEsaUJBQVU7Q0FVNUMsQ0FBQTtBQVZZLHNDQUFhO0FBR3hCO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NkNBQzdCO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7NkNBQ2pDO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOzs2Q0FDM0M7d0JBVEosYUFBYTtJQUR6QixJQUFBLGdCQUFNLEVBQUMsVUFBVSxDQUFDO0dBQ04sYUFBYSxDQVV6QiJ9