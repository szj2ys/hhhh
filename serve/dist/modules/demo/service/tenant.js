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
exports.DemoTenantService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const goods_1 = require("../entity/goods");
const tenant_1 = require("../../base/db/tenant");
/**
 * 商品服务
 */
let DemoTenantService = class DemoTenantService extends core_2.BaseService {
    /**
     * 使用多租户
     */
    async use() {
        await this.demoGoodsEntity.createQueryBuilder().getMany();
        await this.demoGoodsEntity.find();
    }
    /**
     * 不使用多租户(局部不使用)
     */
    async noUse() {
        // 过滤多租户
        await this.demoGoodsEntity.createQueryBuilder().getMany();
        // 被noTenant包裹，不会过滤多租户
        await (0, tenant_1.noTenant)(this.ctx, async () => {
            return await this.demoGoodsEntity.createQueryBuilder().getMany();
        });
        // 过滤多租户
        await this.demoGoodsEntity.find();
    }
    /**
     * 无效多租户
     */
    async invalid() {
        // 自定义sql，不进行多租户过滤
        await this.nativeQuery('select * from demo_goods');
        // 自定义分页sql，不进行多租户过滤
        await this.sqlRenderPage('select * from demo_goods');
    }
};
exports.DemoTenantService = DemoTenantService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(goods_1.DemoGoodsEntity),
    __metadata("design:type", typeorm_2.Repository)
], DemoTenantService.prototype, "demoGoodsEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], DemoTenantService.prototype, "ctx", void 0);
exports.DemoTenantService = DemoTenantService = __decorate([
    (0, core_1.Provide)()
], DemoTenantService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZGVtby9zZXJ2aWNlL3RlbmFudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFDakQsNENBQWdEO0FBQ2hELCtDQUFzRDtBQUN0RCxxQ0FBcUM7QUFDckMsMkNBQWtEO0FBQ2xELGlEQUFnRDtBQUVoRDs7R0FFRztBQUVJLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsa0JBQVc7SUFPaEQ7O09BRUc7SUFDSCxLQUFLLENBQUMsR0FBRztRQUNQLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFELE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsS0FBSztRQUNULFFBQVE7UUFDUixNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxRCxzQkFBc0I7UUFDdEIsTUFBTSxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNsQyxPQUFPLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUTtRQUNSLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsT0FBTztRQUNYLGtCQUFrQjtRQUNsQixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNuRCxvQkFBb0I7UUFDcEIsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDdkQsQ0FBQztDQUNGLENBQUE7QUF0Q1ksOENBQWlCO0FBRTVCO0lBREMsSUFBQSwyQkFBaUIsRUFBQyx1QkFBZSxDQUFDOzhCQUNsQixvQkFBVTswREFBa0I7QUFHN0M7SUFEQyxJQUFBLGFBQU0sR0FBRTs7OENBQ0w7NEJBTE8saUJBQWlCO0lBRDdCLElBQUEsY0FBTyxHQUFFO0dBQ0csaUJBQWlCLENBc0M3QiJ9