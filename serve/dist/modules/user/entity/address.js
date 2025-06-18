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
exports.UserAddressEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 用户模块-收货地址
 */
let UserAddressEntity = class UserAddressEntity extends base_1.BaseEntity {
};
exports.UserAddressEntity = UserAddressEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '用户ID' }),
    __metadata("design:type", Number)
], UserAddressEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '联系人' }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '手机号', length: 11 }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '省' }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '市' }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '区' }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '地址' }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '是否默认', default: false }),
    __metadata("design:type", Boolean)
], UserAddressEntity.prototype, "isDefault", void 0);
exports.UserAddressEntity = UserAddressEntity = __decorate([
    (0, typeorm_1.Entity)('user_address')
], UserAddressEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXIvZW50aXR5L2FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW9EO0FBQ3BELHFDQUFnRDtBQUVoRDs7R0FFRztBQUVJLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsaUJBQVU7Q0EwQmhELENBQUE7QUExQlksOENBQWlCO0FBRzVCO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O2lEQUNiO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O2tEQUNYO0FBSWhCO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQzs7Z0RBQ3pCO0FBR2Q7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7O21EQUNSO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDOzsrQ0FDWjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDOzttREFDUjtBQUdqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7a0RBQ1Y7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7b0RBQ3pCOzRCQXpCUixpQkFBaUI7SUFEN0IsSUFBQSxnQkFBTSxFQUFDLGNBQWMsQ0FBQztHQUNWLGlCQUFpQixDQTBCN0IifQ==