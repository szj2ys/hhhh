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
exports.DemoGoodsService = void 0;
const goods_1 = require("./../entity/goods");
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
/**
 * 商品示例
 */
let DemoGoodsService = class DemoGoodsService extends core_2.BaseService {
    /**
     * 执行sql分页
     */
    async sqlPage(query) {
        await this.demoGoodsEntity.save({
            id: 1,
            title: '标题',
            price: 99.0,
            description: '商品描述',
            mainImage: '',
        });
        return this.sqlRenderPage('select * from demo_goods ORDER BY id ASC', query, false);
    }
    /**
     * 执行entity分页
     */
    async entityPage(query) {
        const find = this.demoGoodsEntity.createQueryBuilder();
        return this.entityRenderPage(find, query);
    }
};
exports.DemoGoodsService = DemoGoodsService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(goods_1.DemoGoodsEntity),
    __metadata("design:type", typeorm_2.Repository)
], DemoGoodsService.prototype, "demoGoodsEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], DemoGoodsService.prototype, "ctx", void 0);
exports.DemoGoodsService = DemoGoodsService = __decorate([
    (0, core_1.Provide)()
], DemoGoodsService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL3NlcnZpY2UvZ29vZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW9EO0FBQ3BELHlDQUFpRDtBQUNqRCw0Q0FBZ0Q7QUFDaEQsK0NBQXNEO0FBQ3RELHFDQUFxQztBQUVyQzs7R0FFRztBQUVJLElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQWlCLFNBQVEsa0JBQVc7SUFPL0M7O09BRUc7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUs7UUFDakIsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUM5QixFQUFFLEVBQUUsQ0FBQztZQUNMLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxXQUFXLEVBQUUsTUFBTTtZQUNuQixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FDdkIsMENBQTBDLEVBQzFDLEtBQUssRUFDTCxLQUFLLENBQ04sQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSztRQUNwQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRixDQUFBO0FBaENZLDRDQUFnQjtBQUUzQjtJQURDLElBQUEsMkJBQWlCLEVBQUMsdUJBQWUsQ0FBQzs4QkFDbEIsb0JBQVU7eURBQWtCO0FBRzdDO0lBREMsSUFBQSxhQUFNLEdBQUU7OzZDQUNMOzJCQUxPLGdCQUFnQjtJQUQ1QixJQUFBLGNBQU8sR0FBRTtHQUNHLGdCQUFnQixDQWdDNUIifQ==