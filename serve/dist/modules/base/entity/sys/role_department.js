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
exports.BaseSysRoleDepartmentEntity = void 0;
const base_1 = require("../base");
const typeorm_1 = require("typeorm");
/**
 * 角色部门
 */
let BaseSysRoleDepartmentEntity = class BaseSysRoleDepartmentEntity extends base_1.BaseEntity {
};
exports.BaseSysRoleDepartmentEntity = BaseSysRoleDepartmentEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '角色ID' }),
    __metadata("design:type", Number)
], BaseSysRoleDepartmentEntity.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '部门ID' }),
    __metadata("design:type", Number)
], BaseSysRoleDepartmentEntity.prototype, "departmentId", void 0);
exports.BaseSysRoleDepartmentEntity = BaseSysRoleDepartmentEntity = __decorate([
    (0, typeorm_1.Entity)('base_sys_role_department')
], BaseSysRoleDepartmentEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZV9kZXBhcnRtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9lbnRpdHkvc3lzL3JvbGVfZGVwYXJ0bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxrQ0FBcUM7QUFDckMscUNBQXlDO0FBRXpDOztHQUVHO0FBRUksSUFBTSwyQkFBMkIsR0FBakMsTUFBTSwyQkFBNEIsU0FBUSxpQkFBVTtDQU0xRCxDQUFBO0FBTlksa0VBQTJCO0FBRXRDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzsyREFDYjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztpRUFDUDtzQ0FMViwyQkFBMkI7SUFEdkMsSUFBQSxnQkFBTSxFQUFDLDBCQUEwQixDQUFDO0dBQ3RCLDJCQUEyQixDQU12QyJ9