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
exports.UserWxEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 微信用户
 */
let UserWxEntity = class UserWxEntity extends base_1.BaseEntity {
};
exports.UserWxEntity = UserWxEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '微信unionid', nullable: true }),
    __metadata("design:type", String)
], UserWxEntity.prototype, "unionid", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '微信openid' }),
    __metadata("design:type", String)
], UserWxEntity.prototype, "openid", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '头像', nullable: true }),
    __metadata("design:type", String)
], UserWxEntity.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '昵称', nullable: true }),
    __metadata("design:type", String)
], UserWxEntity.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '性别 0-未知 1-男 2-女', default: 0 }),
    __metadata("design:type", Number)
], UserWxEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '语言', nullable: true }),
    __metadata("design:type", String)
], UserWxEntity.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '城市', nullable: true }),
    __metadata("design:type", String)
], UserWxEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '省份', nullable: true }),
    __metadata("design:type", String)
], UserWxEntity.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '国家', nullable: true }),
    __metadata("design:type", String)
], UserWxEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '类型 0-小程序 1-公众号 2-H5 3-APP', default: 0 }),
    __metadata("design:type", Number)
], UserWxEntity.prototype, "type", void 0);
exports.UserWxEntity = UserWxEntity = __decorate([
    (0, typeorm_1.Entity)('user_wx')
], UserWxEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy91c2VyL2VudGl0eS93eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpREFBb0Q7QUFDcEQscUNBQWdEO0FBRWhEOztHQUVHO0FBRUksSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBYSxTQUFRLGlCQUFVO0NBZ0MzQyxDQUFBO0FBaENZLG9DQUFZO0FBR3ZCO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NkNBQ2pDO0FBSWhCO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7OzRDQUNqQjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OytDQUN4QjtBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDekI7QUFHakI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzs0Q0FDcEM7QUFHZjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDekI7QUFHakI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7MENBQzdCO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OENBQ3pCO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzZDQUMxQjtBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7OzBDQUNoRDt1QkEvQkYsWUFBWTtJQUR4QixJQUFBLGdCQUFNLEVBQUMsU0FBUyxDQUFDO0dBQ0wsWUFBWSxDQWdDeEIifQ==