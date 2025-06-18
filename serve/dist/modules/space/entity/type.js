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
exports.SpaceTypeEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 图片空间信息分类
 */
let SpaceTypeEntity = class SpaceTypeEntity extends base_1.BaseEntity {
};
exports.SpaceTypeEntity = SpaceTypeEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '类别名称' }),
    __metadata("design:type", String)
], SpaceTypeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '父分类ID', nullable: true }),
    __metadata("design:type", Number)
], SpaceTypeEntity.prototype, "parentId", void 0);
exports.SpaceTypeEntity = SpaceTypeEntity = __decorate([
    (0, typeorm_1.Entity)('space_type')
], SpaceTypeEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NwYWNlL2VudGl0eS90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFvRDtBQUNwRCxxQ0FBeUM7QUFFekM7O0dBRUc7QUFFSSxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFnQixTQUFRLGlCQUFVO0NBTTlDLENBQUE7QUFOWSwwQ0FBZTtBQUUxQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7NkNBQ2Y7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDNUI7MEJBTE4sZUFBZTtJQUQzQixJQUFBLGdCQUFNLEVBQUMsWUFBWSxDQUFDO0dBQ1IsZUFBZSxDQU0zQiJ9