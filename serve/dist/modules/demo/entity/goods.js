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
exports.DemoGoodsEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 商品模块-商品信息
 */
let DemoGoodsEntity = class DemoGoodsEntity extends base_1.BaseEntity {
};
exports.DemoGoodsEntity = DemoGoodsEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '标题', length: 50 }),
    __metadata("design:type", String)
], DemoGoodsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '价格',
        type: 'decimal',
        precision: 5,
        scale: 2,
    }),
    __metadata("design:type", Number)
], DemoGoodsEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '描述', nullable: true }),
    __metadata("design:type", String)
], DemoGoodsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '主图', nullable: true }),
    __metadata("design:type", String)
], DemoGoodsEntity.prototype, "mainImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '分类', dict: 'goodsType' }),
    __metadata("design:type", Number)
], DemoGoodsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态', dict: ['禁用', '启用'], default: 1 }),
    __metadata("design:type", Number)
], DemoGoodsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '示例图',
        nullable: true,
        type: 'json',
        transformer: base_1.transformerJson,
    }),
    __metadata("design:type", Array)
], DemoGoodsEntity.prototype, "exampleImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '库存', default: 0 }),
    __metadata("design:type", Number)
], DemoGoodsEntity.prototype, "stock", void 0);
exports.DemoGoodsEntity = DemoGoodsEntity = __decorate([
    (0, typeorm_1.Entity)('demo_goods')
], DemoGoodsEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL2VudGl0eS9nb29kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpREFBcUU7QUFDckUscUNBQWdEO0FBRWhEOztHQUVHO0FBRUksSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZ0IsU0FBUSxpQkFBVTtDQW1DOUMsQ0FBQTtBQW5DWSwwQ0FBZTtBQUcxQjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7OzhDQUN4QjtBQVFkO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLFNBQVMsRUFBRSxDQUFDO1FBQ1osS0FBSyxFQUFFLENBQUM7S0FDVCxDQUFDOzs4Q0FDWTtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O29EQUN0QjtBQUdwQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztrREFDeEI7QUFHbEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQzs7NkNBQ2hDO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7OytDQUMzQztBQVFmO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLEtBQUs7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osV0FBVyxFQUFFLHNCQUFlO0tBQzdCLENBQUM7O3NEQUNzQjtBQUd4QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzs4Q0FDeEI7MEJBbENILGVBQWU7SUFEM0IsSUFBQSxnQkFBTSxFQUFDLFlBQVksQ0FBQztHQUNSLGVBQWUsQ0FtQzNCIn0=