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
exports.RecycleDataEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 数据回收站 软删除的时候数据会回收到该表
 */
let RecycleDataEntity = class RecycleDataEntity extends base_1.BaseEntity {
};
exports.RecycleDataEntity = RecycleDataEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '表', type: 'json', transformer: base_1.transformerJson }),
    __metadata("design:type", Object)
], RecycleDataEntity.prototype, "entityInfo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '操作人', nullable: true }),
    __metadata("design:type", Number)
], RecycleDataEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '被删除的数据',
        type: 'json',
        transformer: base_1.transformerJson,
    }),
    __metadata("design:type", Array)
], RecycleDataEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '请求的接口', nullable: true }),
    __metadata("design:type", String)
], RecycleDataEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '请求参数',
        nullable: true,
        type: 'json',
        transformer: base_1.transformerJson,
    }),
    __metadata("design:type", String)
], RecycleDataEntity.prototype, "params", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '删除数据条数', default: 1 }),
    __metadata("design:type", Number)
], RecycleDataEntity.prototype, "count", void 0);
exports.RecycleDataEntity = RecycleDataEntity = __decorate([
    (0, typeorm_1.Entity)('recycle_data')
], RecycleDataEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JlY3ljbGUvZW50aXR5L2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFFO0FBQ3JFLHFDQUFnRDtBQUVoRDs7R0FFRztBQUVJLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsaUJBQVU7Q0FpQ2hELENBQUE7QUFqQ1ksOENBQWlCO0FBRTVCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxzQkFBZSxFQUFFLENBQUM7O3FEQU1uRTtBQUlGO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7aURBQzVCO0FBT2Y7SUFMQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsUUFBUTtRQUNqQixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtLQUM3QixDQUFDOzsrQ0FDYTtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUNqQztBQVFaO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLE1BQU07UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osV0FBVyxFQUFFLHNCQUFlO0tBQzdCLENBQUM7O2lEQUNhO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7Z0RBQzVCOzRCQWhDSCxpQkFBaUI7SUFEN0IsSUFBQSxnQkFBTSxFQUFDLGNBQWMsQ0FBQztHQUNWLGlCQUFpQixDQWlDN0IifQ==