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
exports.UserInfoEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 用户信息
 */
let UserInfoEntity = class UserInfoEntity extends base_1.BaseEntity {
};
exports.UserInfoEntity = UserInfoEntity;
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '登录唯一ID', nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "unionid", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '头像', nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '昵称', nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '手机号', nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '性别', dict: ['未知', '男', '女'], default: 0 }),
    __metadata("design:type", Number)
], UserInfoEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态', dict: ['禁用', '正常', '已注销'], default: 1 }),
    __metadata("design:type", Number)
], UserInfoEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '登录方式', dict: ['小程序', '公众号', 'H5'], default: 0 }),
    __metadata("design:type", Number)
], UserInfoEntity.prototype, "loginType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '密码', nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '介绍', type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "description", void 0);
exports.UserInfoEntity = UserInfoEntity = __decorate([
    (0, typeorm_1.Entity)('user_info')
], UserInfoEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXIvZW50aXR5L2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW9EO0FBQ3BELHFDQUFnRDtBQUVoRDs7R0FFRztBQUVJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWUsU0FBUSxpQkFBVTtDQTZCN0MsQ0FBQTtBQTdCWSx3Q0FBYztBQUd6QjtJQUZDLElBQUEsZUFBSyxFQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzsrQ0FDOUI7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7aURBQ3hCO0FBR2xCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUN6QjtBQUlqQjtJQUZDLElBQUEsZUFBSyxFQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs2Q0FDN0I7QUFHZDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7OzhDQUMvQztBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7OENBQ2xEO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOztpREFDbEQ7QUFHbEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Z0RBQ3pCO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bURBQ3BDO3lCQTVCVCxjQUFjO0lBRDFCLElBQUEsZ0JBQU0sRUFBQyxXQUFXLENBQUM7R0FDUCxjQUFjLENBNkIxQiJ9