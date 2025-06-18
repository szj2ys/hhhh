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
exports.FlowInfoEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 流程信息
 */
let FlowInfoEntity = class FlowInfoEntity extends base_1.BaseEntity {
};
exports.FlowInfoEntity = FlowInfoEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], FlowInfoEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '标签（可以根据标签调用）', nullable: true }),
    __metadata("design:type", String)
], FlowInfoEntity.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '描述', nullable: true }),
    __metadata("design:type", String)
], FlowInfoEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态 0-禁用 1-禁用', default: 1 }),
    __metadata("design:type", Number)
], FlowInfoEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '版本', default: 1 }),
    __metadata("design:type", Number)
], FlowInfoEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '草稿',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], FlowInfoEntity.prototype, "draft", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '数据',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], FlowInfoEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '发布时间', nullable: true }),
    __metadata("design:type", Date)
], FlowInfoEntity.prototype, "releaseTime", void 0);
exports.FlowInfoEntity = FlowInfoEntity = __decorate([
    (0, typeorm_1.Entity)('flow_info')
], FlowInfoEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvZW50aXR5L2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFFO0FBQ3JFLHFDQUFnRDtBQUdoRDs7R0FFRztBQUVJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWUsU0FBUSxpQkFBVTtDQW9DN0MsQ0FBQTtBQXBDWSx3Q0FBYztBQUd6QjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs0Q0FDYjtBQUliO0lBRkMsSUFBQSxlQUFLLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzZDQUN0QztBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUN0QjtBQUdwQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzs4Q0FDakM7QUFHZjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzsrQ0FDdEI7QUFRaEI7SUFOQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxNQUFNO1FBQ1osV0FBVyxFQUFFLHNCQUFlO1FBQzVCLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7NkNBQ2U7QUFRakI7SUFOQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxNQUFNO1FBQ1osV0FBVyxFQUFFLHNCQUFlO1FBQzVCLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7NENBQ2M7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDL0IsSUFBSTttREFBQzt5QkFuQ1AsY0FBYztJQUQxQixJQUFBLGdCQUFNLEVBQUMsV0FBVyxDQUFDO0dBQ1AsY0FBYyxDQW9DMUIifQ==