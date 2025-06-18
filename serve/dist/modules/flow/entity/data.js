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
exports.FlowDataEntity = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../../base/entity/base");
/**
 * 流程数据
 */
let FlowDataEntity = class FlowDataEntity extends base_1.BaseEntity {
};
exports.FlowDataEntity = FlowDataEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '流程ID' }),
    __metadata("design:type", Number)
], FlowDataEntity.prototype, "flowId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '对象ID' }),
    __metadata("design:type", String)
], FlowDataEntity.prototype, "objectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '数据', type: 'json', transformer: base_1.transformerJson }),
    __metadata("design:type", Object)
], FlowDataEntity.prototype, "data", void 0);
exports.FlowDataEntity = FlowDataEntity = __decorate([
    (0, typeorm_1.Entity)('flow_data')
], FlowDataEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvZW50aXR5L2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdEO0FBQ2hELGlEQUFxRTtBQUVyRTs7R0FFRztBQUVJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWUsU0FBUSxpQkFBVTtDQVc3QyxDQUFBO0FBWFksd0NBQWM7QUFHekI7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7OENBQ2I7QUFJZjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztnREFDWDtBQUdqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsc0JBQWUsRUFBRSxDQUFDOzs0Q0FDNUQ7eUJBVkMsY0FBYztJQUQxQixJQUFBLGdCQUFNLEVBQUMsV0FBVyxDQUFDO0dBQ1AsY0FBYyxDQVcxQiJ9