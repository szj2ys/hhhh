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
exports.KnowDataTypeEntity = void 0;
const base_1 = require("../../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 知识信息类型
 */
let KnowDataTypeEntity = class KnowDataTypeEntity extends base_1.BaseEntity {
};
exports.KnowDataTypeEntity = KnowDataTypeEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], KnowDataTypeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '图标', nullable: true }),
    __metadata("design:type", String)
], KnowDataTypeEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '集合ID', nullable: true }),
    __metadata("design:type", String)
], KnowDataTypeEntity.prototype, "collectionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '描述', nullable: true }),
    __metadata("design:type", String)
], KnowDataTypeEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'embedding配置ID' }),
    __metadata("design:type", Number)
], KnowDataTypeEntity.prototype, "embedConfigId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'llm配置',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], KnowDataTypeEntity.prototype, "llmOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'embedding配置',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], KnowDataTypeEntity.prototype, "embedOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '是否开启rerank 0-否 1-是', default: 0 }),
    __metadata("design:type", Number)
], KnowDataTypeEntity.prototype, "enableRerank", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'rerank配置ID', nullable: true }),
    __metadata("design:type", Number)
], KnowDataTypeEntity.prototype, "rerankConfigId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'rerank配置',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], KnowDataTypeEntity.prototype, "rerankOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态', dict: ['禁用', '启用'], default: 1 }),
    __metadata("design:type", Number)
], KnowDataTypeEntity.prototype, "enable", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '索引方式',
        dict: ['经济', '高质量', '知识图谱'],
        default: 1,
    }),
    __metadata("design:type", Number)
], KnowDataTypeEntity.prototype, "indexType", void 0);
exports.KnowDataTypeEntity = KnowDataTypeEntity = __decorate([
    (0, typeorm_1.Entity)('know_data_type')
], KnowDataTypeEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvZW50aXR5L2RhdGEvdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxvREFBd0U7QUFDeEUscUNBQXlDO0FBRXpDOztHQUVHO0FBRUksSUFBTSxrQkFBa0IsR0FBeEIsTUFBTSxrQkFBbUIsU0FBUSxpQkFBVTtDQWdFakQsQ0FBQTtBQWhFWSxnREFBa0I7QUFFN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUNiO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Z0RBQzdCO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7d0RBQ3ZCO0FBR3JCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3VEQUN0QjtBQUdwQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQzs7eURBQ2Y7QUFRdEI7SUFOQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsT0FBTztRQUNoQixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtRQUM1QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O3NEQVVBO0FBUUY7SUFOQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsYUFBYTtRQUN0QixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtRQUM1QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O3dEQUNnQjtBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O3dEQUNqQztBQUdyQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzswREFDM0I7QUFRdkI7SUFOQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsVUFBVTtRQUNuQixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtRQUM1QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O3lEQUNpQjtBQUduQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7a0RBQzNDO0FBT2Y7SUFMQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsTUFBTTtRQUNmLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBQzNCLE9BQU8sRUFBRSxDQUFDO0tBQ1gsQ0FBQzs7cURBQ2dCOzZCQS9EUCxrQkFBa0I7SUFEOUIsSUFBQSxnQkFBTSxFQUFDLGdCQUFnQixDQUFDO0dBQ1osa0JBQWtCLENBZ0U5QiJ9