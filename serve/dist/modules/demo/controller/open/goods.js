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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenDemoGoodsController = void 0;
const goods_1 = require("../../service/goods");
const goods_2 = require("../../entity/goods");
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
/**
 * 测试
 */
let OpenDemoGoodsController = class OpenDemoGoodsController extends core_2.BaseController {
    async sqlPage(query) {
        return this.ok(await this.demoGoodsService.sqlPage(query));
    }
    async entityPage(query) {
        return this.ok(await this.demoGoodsService.entityPage(query));
    }
};
exports.OpenDemoGoodsController = OpenDemoGoodsController;
__decorate([
    (0, typeorm_1.InjectEntityModel)(goods_2.DemoGoodsEntity),
    __metadata("design:type", typeorm_2.Repository)
], OpenDemoGoodsController.prototype, "demoGoodsEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", goods_1.DemoGoodsService)
], OpenDemoGoodsController.prototype, "demoGoodsService", void 0);
__decorate([
    (0, core_1.Post)('/sqlPage', { summary: 'sql分页查询' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OpenDemoGoodsController.prototype, "sqlPage", null);
__decorate([
    (0, core_1.Post)('/entityPage', { summary: 'entity分页查询' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OpenDemoGoodsController.prototype, "entityPage", null);
exports.OpenDemoGoodsController = OpenDemoGoodsController = __decorate([
    (0, core_2.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: goods_2.DemoGoodsEntity,
        service: goods_1.DemoGoodsService,
        pageQueryOp: {
            fieldLike: ['title'],
        },
    })
], OpenDemoGoodsController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvb3Blbi9nb29kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBdUQ7QUFDdkQsOENBQXFEO0FBQ3JELHlDQUFvRDtBQUNwRCw0Q0FBbUU7QUFDbkUsK0NBQXNEO0FBQ3RELHFDQUFxQztBQUVyQzs7R0FFRztBQVNJLElBQU0sdUJBQXVCLEdBQTdCLE1BQU0sdUJBQXdCLFNBQVEscUJBQWM7SUFRbkQsQUFBTixLQUFLLENBQUMsT0FBTyxDQUFTLEtBQUs7UUFDekIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxVQUFVLENBQVMsS0FBSztRQUM1QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNGLENBQUE7QUFoQlksMERBQXVCO0FBRWxDO0lBREMsSUFBQSwyQkFBaUIsRUFBQyx1QkFBZSxDQUFDOzhCQUNsQixvQkFBVTtnRUFBa0I7QUFHN0M7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDUyx3QkFBZ0I7aUVBQUM7QUFHN0I7SUFETCxJQUFBLFdBQUksRUFBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDMUIsV0FBQSxJQUFBLFdBQUksR0FBRSxDQUFBOzs7O3NEQUVwQjtBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDO0lBQzdCLFdBQUEsSUFBQSxXQUFJLEdBQUUsQ0FBQTs7Ozt5REFFdkI7a0NBZlUsdUJBQXVCO0lBUm5DLElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSx1QkFBZTtRQUN2QixPQUFPLEVBQUUsd0JBQWdCO1FBQ3pCLFdBQVcsRUFBRTtZQUNYLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUNyQjtLQUNGLENBQUM7R0FDVyx1QkFBdUIsQ0FnQm5DIn0=