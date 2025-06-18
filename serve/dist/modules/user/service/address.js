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
exports.UserAddressService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
const address_1 = require("../entity/address");
const typeorm_2 = require("@midwayjs/typeorm");
/**
 * 地址
 */
let UserAddressService = class UserAddressService extends core_2.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.userAddressEntity);
    }
    /**
     * 列表信息
     */
    async list() {
        return this.userAddressEntity
            .createQueryBuilder()
            .where('userId = :userId ', { userId: this.ctx.user.id })
            .addOrderBy('isDefault', 'DESC')
            .getMany();
    }
    /**
     * 修改之后
     * @param data
     * @param type
     */
    async modifyAfter(data, type) {
        if (type == 'add' || type == 'update') {
            if (data.isDefault) {
                await this.userAddressEntity
                    .createQueryBuilder()
                    .update()
                    .set({ isDefault: false })
                    .where('userId = :userId ', { userId: this.ctx.user.id })
                    .andWhere('id != :id', { id: data.id })
                    .execute();
            }
        }
    }
    /**
     * 默认地址
     */
    async default(userId) {
        return await this.userAddressEntity.findOneBy({
            userId: (0, typeorm_1.Equal)(userId),
            isDefault: true,
        });
    }
};
exports.UserAddressService = UserAddressService;
__decorate([
    (0, typeorm_2.InjectEntityModel)(address_1.UserAddressEntity),
    __metadata("design:type", typeorm_1.Repository)
], UserAddressService.prototype, "userAddressEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], UserAddressService.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserAddressService.prototype, "init", null);
exports.UserAddressService = UserAddressService = __decorate([
    (0, core_1.Provide)()
], UserAddressService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXIvc2VydmljZS9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF1RDtBQUN2RCw0Q0FBZ0Q7QUFDaEQscUNBQTRDO0FBQzVDLCtDQUFzRDtBQUN0RCwrQ0FBc0Q7QUFFdEQ7O0dBRUc7QUFFSSxJQUFNLGtCQUFrQixHQUF4QixNQUFNLGtCQUFtQixTQUFRLGtCQUFXO0lBUTNDLEFBQU4sS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxJQUFJLENBQUMsaUJBQWlCO2FBQzFCLGtCQUFrQixFQUFFO2FBQ3BCLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUN4RCxVQUFVLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzthQUMvQixPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFTLEVBQUUsSUFBaUM7UUFDNUQsSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUN0QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkIsTUFBTSxJQUFJLENBQUMsaUJBQWlCO3FCQUN6QixrQkFBa0IsRUFBRTtxQkFDcEIsTUFBTSxFQUFFO3FCQUNSLEdBQUcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztxQkFDekIsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO3FCQUN4RCxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztxQkFDdEMsT0FBTyxFQUFFLENBQUM7WUFDZixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTTtRQUNsQixPQUFPLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztZQUM1QyxNQUFNLEVBQUUsSUFBQSxlQUFLLEVBQUMsTUFBTSxDQUFDO1lBQ3JCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBcERZLGdEQUFrQjtBQUU3QjtJQURDLElBQUEsMkJBQWlCLEVBQUMsMkJBQWlCLENBQUM7OEJBQ2xCLG9CQUFVOzZEQUFvQjtBQUdqRDtJQURDLElBQUEsYUFBTSxHQUFFOzsrQ0FDTDtBQUdFO0lBREwsSUFBQSxXQUFJLEdBQUU7Ozs7OENBSU47NkJBWFUsa0JBQWtCO0lBRDlCLElBQUEsY0FBTyxHQUFFO0dBQ0csa0JBQWtCLENBb0Q5QiJ9