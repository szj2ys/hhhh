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
exports.BaseSysRoleEntity = void 0;
const base_1 = require("../base");
const typeorm_1 = require("typeorm");
/**
 * 角色
 */
let BaseSysRoleEntity = class BaseSysRoleEntity extends base_1.BaseEntity {
};
exports.BaseSysRoleEntity = BaseSysRoleEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '用户ID' }),
    __metadata("design:type", String)
], BaseSysRoleEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], BaseSysRoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '角色标签', nullable: true, length: 50 }),
    __metadata("design:type", String)
], BaseSysRoleEntity.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '备注', nullable: true }),
    __metadata("design:type", String)
], BaseSysRoleEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '数据权限是否关联上下级', default: false }),
    __metadata("design:type", Boolean)
], BaseSysRoleEntity.prototype, "relevance", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '菜单权限', type: 'json', transformer: base_1.transformerJson }),
    __metadata("design:type", Array)
], BaseSysRoleEntity.prototype, "menuIdList", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '部门权限', type: 'json', transformer: base_1.transformerJson }),
    __metadata("design:type", Array)
], BaseSysRoleEntity.prototype, "departmentIdList", void 0);
exports.BaseSysRoleEntity = BaseSysRoleEntity = __decorate([
    (0, typeorm_1.Entity)('base_sys_role')
], BaseSysRoleEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy9yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFzRDtBQUN0RCxxQ0FBZ0Q7QUFFaEQ7O0dBRUc7QUFFSSxJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFrQixTQUFRLGlCQUFVO0NBdUJoRCxDQUFBO0FBdkJZLDhDQUFpQjtBQUU1QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7aURBQ2I7QUFJZjtJQUZDLElBQUEsZUFBSyxFQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQ2I7QUFJYjtJQUZDLElBQUEsZUFBSyxFQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7O2dEQUMxQztBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUMzQjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O29EQUNoQztBQUduQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsc0JBQWUsRUFBRSxDQUFDOztxREFDbkQ7QUFHckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLHNCQUFlLEVBQUUsQ0FBQzs7MkRBQzdDOzRCQXRCaEIsaUJBQWlCO0lBRDdCLElBQUEsZ0JBQU0sRUFBQyxlQUFlLENBQUM7R0FDWCxpQkFBaUIsQ0F1QjdCIn0=