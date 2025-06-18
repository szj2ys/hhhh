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
exports.AppUserAddressController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const address_1 = require("../../entity/address");
const address_2 = require("../../service/address");
/**
 * 地址
 */
let AppUserAddressController = class AppUserAddressController extends core_2.BaseController {
    async default() {
        return this.ok(await this.userAddressService.default(this.ctx.user.id));
    }
};
exports.AppUserAddressController = AppUserAddressController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", address_2.UserAddressService)
], AppUserAddressController.prototype, "userAddressService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], AppUserAddressController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Get)('/default', { summary: '默认地址' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppUserAddressController.prototype, "default", null);
exports.AppUserAddressController = AppUserAddressController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: address_1.UserAddressEntity,
        service: address_2.UserAddressService,
        insertParam: ctx => {
            return {
                userId: ctx.user.id,
            };
        },
        pageQueryOp: {
            where: async (ctx) => {
                return [['userId =:userId', { userId: ctx.user.id }]];
            },
            addOrderBy: {
                isDefault: 'DESC',
            },
        },
    })
], AppUserAddressController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXIvY29udHJvbGxlci9hcHAvYWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBc0Q7QUFDdEQsNENBQW1FO0FBQ25FLGtEQUF5RDtBQUN6RCxtREFBMkQ7QUFFM0Q7O0dBRUc7QUFvQkksSUFBTSx3QkFBd0IsR0FBOUIsTUFBTSx3QkFBeUIsU0FBUSxxQkFBYztJQVFwRCxBQUFOLEtBQUssQ0FBQyxPQUFPO1FBQ1gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRixDQUFBO0FBWFksNERBQXdCO0FBRW5DO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1csNEJBQWtCO29FQUFDO0FBR3ZDO0lBREMsSUFBQSxhQUFNLEdBQUU7O3FEQUNMO0FBR0U7SUFETCxJQUFBLFVBQUcsRUFBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Ozs7dURBR3BDO21DQVZVLHdCQUF3QjtJQW5CcEMsSUFBQSxjQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUsMkJBQWlCO1FBQ3pCLE9BQU8sRUFBRSw0QkFBa0I7UUFDM0IsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2pCLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTthQUNwQixDQUFDO1FBQ0osQ0FBQztRQUNELFdBQVcsRUFBRTtZQUNYLEtBQUssRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLE1BQU07YUFDbEI7U0FDRjtLQUNGLENBQUM7R0FDVyx3QkFBd0IsQ0FXcEMifQ==