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
exports.BaseSysDepartmentEntity = void 0;
const base_1 = require("../base");
const typeorm_1 = require("typeorm");
/**
 * 部门
 */
let BaseSysDepartmentEntity = class BaseSysDepartmentEntity extends base_1.BaseEntity {
};
exports.BaseSysDepartmentEntity = BaseSysDepartmentEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '部门名称' }),
    __metadata("design:type", String)
], BaseSysDepartmentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '创建者ID', nullable: true }),
    __metadata("design:type", Number)
], BaseSysDepartmentEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '上级部门ID', nullable: true }),
    __metadata("design:type", Number)
], BaseSysDepartmentEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '排序', default: 0 }),
    __metadata("design:type", Number)
], BaseSysDepartmentEntity.prototype, "orderNum", void 0);
exports.BaseSysDepartmentEntity = BaseSysDepartmentEntity = __decorate([
    (0, typeorm_1.Entity)('base_sys_department')
], BaseSysDepartmentEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy9kZXBhcnRtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFxQztBQUNyQyxxQ0FBZ0Q7QUFFaEQ7O0dBRUc7QUFFSSxJQUFNLHVCQUF1QixHQUE3QixNQUFNLHVCQUF3QixTQUFRLGlCQUFVO0NBZXRELENBQUE7QUFmWSwwREFBdUI7QUFFbEM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O3FEQUNmO0FBSWI7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzt1REFDOUI7QUFHZjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzt5REFDN0I7QUFHakI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7eURBQ3JCO2tDQVpOLHVCQUF1QjtJQURuQyxJQUFBLGdCQUFNLEVBQUMscUJBQXFCLENBQUM7R0FDakIsdUJBQXVCLENBZW5DIn0=