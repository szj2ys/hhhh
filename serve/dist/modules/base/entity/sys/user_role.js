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
exports.BaseSysUserRoleEntity = void 0;
const base_1 = require("../base");
const typeorm_1 = require("typeorm");
/**
 * 用户角色
 */
let BaseSysUserRoleEntity = class BaseSysUserRoleEntity extends base_1.BaseEntity {
};
exports.BaseSysUserRoleEntity = BaseSysUserRoleEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '用户ID' }),
    __metadata("design:type", Number)
], BaseSysUserRoleEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '角色ID' }),
    __metadata("design:type", Number)
], BaseSysUserRoleEntity.prototype, "roleId", void 0);
exports.BaseSysUserRoleEntity = BaseSysUserRoleEntity = __decorate([
    (0, typeorm_1.Entity)('base_sys_user_role')
], BaseSysUserRoleEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9yb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9lbnRpdHkvc3lzL3VzZXJfcm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxrQ0FBcUM7QUFDckMscUNBQXlDO0FBRXpDOztHQUVHO0FBRUksSUFBTSxxQkFBcUIsR0FBM0IsTUFBTSxxQkFBc0IsU0FBUSxpQkFBVTtDQU1wRCxDQUFBO0FBTlksc0RBQXFCO0FBRWhDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztxREFDYjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztxREFDYjtnQ0FMSixxQkFBcUI7SUFEakMsSUFBQSxnQkFBTSxFQUFDLG9CQUFvQixDQUFDO0dBQ2hCLHFCQUFxQixDQU1qQyJ9