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
exports.BaseSysUserEntity = void 0;
const base_1 = require("../base");
const typeorm_1 = require("typeorm");
/**
 * 系统用户
 */
let BaseSysUserEntity = class BaseSysUserEntity extends base_1.BaseEntity {
};
exports.BaseSysUserEntity = BaseSysUserEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '部门ID', nullable: true }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '创建者ID', nullable: true }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '姓名', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '用户名', length: 100 }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '密码' }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '密码版本, 作用是改完密码，让原来的token失效',
        default: 1,
    }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "passwordV", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '昵称', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '头像', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "headImg", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '手机', nullable: true, length: 20 }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '邮箱', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '备注', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态 0-禁用 1-启用', default: 1 }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'socketId', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "socketId", void 0);
exports.BaseSysUserEntity = BaseSysUserEntity = __decorate([
    (0, typeorm_1.Entity)('base_sys_user')
], BaseSysUserEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFxQztBQUNyQyxxQ0FBZ0Q7QUFFaEQ7O0dBRUc7QUFFSSxJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFrQixTQUFRLGlCQUFVO0NBa0RoRCxDQUFBO0FBbERZLDhDQUFpQjtBQUc1QjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3VEQUN2QjtBQUlyQjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUM5QjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OytDQUM3QjtBQUliO0lBRkMsSUFBQSxlQUFLLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7O21EQUN2QjtBQUdqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bURBQ1Q7QUFNakI7SUFKQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsMkJBQTJCO1FBQ3BDLE9BQU8sRUFBRSxDQUFDO0tBQ1gsQ0FBQzs7b0RBQ2dCO0FBR2xCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUN6QjtBQUdqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztrREFDMUI7QUFJaEI7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7O2dEQUN4QztBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUM1QjtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUMzQjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O2lEQUNqQztBQU9mO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUMvQjs0QkFqRE4saUJBQWlCO0lBRDdCLElBQUEsZ0JBQU0sRUFBQyxlQUFlLENBQUM7R0FDWCxpQkFBaUIsQ0FrRDdCIn0=