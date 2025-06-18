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
exports.DictTypeEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 字典类别
 */
let DictTypeEntity = class DictTypeEntity extends base_1.BaseEntity {
};
exports.DictTypeEntity = DictTypeEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], DictTypeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '标识' }),
    __metadata("design:type", String)
], DictTypeEntity.prototype, "key", void 0);
exports.DictTypeEntity = DictTypeEntity = __decorate([
    (0, typeorm_1.Entity)('dict_type')
], DictTypeEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RpY3QvZW50aXR5L3R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW9EO0FBQ3BELHFDQUF5QztBQUV6Qzs7R0FFRztBQUVJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWUsU0FBUSxpQkFBVTtDQU03QyxDQUFBO0FBTlksd0NBQWM7QUFFekI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzRDQUNiO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJDQUNkO3lCQUxELGNBQWM7SUFEMUIsSUFBQSxnQkFBTSxFQUFDLFdBQVcsQ0FBQztHQUNQLGNBQWMsQ0FNMUIifQ==