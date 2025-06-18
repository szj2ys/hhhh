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
exports.KnowDataInfoEntity = void 0;
const base_1 = require("../../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 知识信息
 */
let KnowDataInfoEntity = class KnowDataInfoEntity {
};
exports.KnowDataInfoEntity = KnowDataInfoEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ comment: 'ID' }),
    __metadata("design:type", String)
], KnowDataInfoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '知识库ID' }),
    __metadata("design:type", Number)
], KnowDataInfoEntity.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '数据源ID', nullable: true }),
    __metadata("design:type", Number)
], KnowDataInfoEntity.prototype, "sourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '内容', type: 'text' }),
    __metadata("design:type", String)
], KnowDataInfoEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '来源 0-自定义 1-文件 2-链接', default: 0 }),
    __metadata("design:type", Number)
], KnowDataInfoEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '元数据',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], KnowDataInfoEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态 0-准备中 1-已就绪', default: 0 }),
    __metadata("design:type", Number)
], KnowDataInfoEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '启用 0-禁用 1-启用', default: 1 }),
    __metadata("design:type", Number)
], KnowDataInfoEntity.prototype, "enable", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        comment: '创建时间',
        type: 'varchar',
        transformer: base_1.transformerTime,
    }),
    __metadata("design:type", Date)
], KnowDataInfoEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        comment: '更新时间',
        type: 'varchar',
        transformer: base_1.transformerTime,
    }),
    __metadata("design:type", Date)
], KnowDataInfoEntity.prototype, "updateTime", void 0);
exports.KnowDataInfoEntity = KnowDataInfoEntity = __decorate([
    (0, typeorm_1.Entity)('know_data_info')
], KnowDataInfoEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvZW50aXR5L2RhdGEvaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxvREFBNkU7QUFDN0UscUNBQStEO0FBRS9EOztHQUVHO0FBRUksSUFBTSxrQkFBa0IsR0FBeEIsTUFBTSxrQkFBa0I7Q0FpRDlCLENBQUE7QUFqRFksZ0RBQWtCO0FBRTdCO0lBREMsSUFBQSx1QkFBYSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDdEI7QUFJWDtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDOztrREFDZDtBQUlmO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7b0RBQzVCO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7O21EQUN4QjtBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O2dEQUN6QztBQVFiO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLEtBQUs7UUFDZCxJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtRQUM1QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O29EQUdBO0FBR0Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOztrREFDbkM7QUFHZjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOztrREFDakM7QUFRZjtJQU5DLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFBRSxzQkFBZTtLQUM3QixDQUFDOzhCQUNVLElBQUk7c0RBQUM7QUFRakI7SUFOQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSxNQUFNO1FBQ2YsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUsc0JBQWU7S0FDN0IsQ0FBQzs4QkFDVSxJQUFJO3NEQUFDOzZCQWhETixrQkFBa0I7SUFEOUIsSUFBQSxnQkFBTSxFQUFDLGdCQUFnQixDQUFDO0dBQ1osa0JBQWtCLENBaUQ5QiJ9