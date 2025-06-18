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
exports.BaseSysConfEntity = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
/**
 * 系统配置
 */
let BaseSysConfEntity = class BaseSysConfEntity extends base_1.BaseEntity {
};
exports.BaseSysConfEntity = BaseSysConfEntity;
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '配置键' }),
    __metadata("design:type", String)
], BaseSysConfEntity.prototype, "cKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '配置值' }),
    __metadata("design:type", String)
], BaseSysConfEntity.prototype, "cValue", void 0);
exports.BaseSysConfEntity = BaseSysConfEntity = __decorate([
    (0, typeorm_1.Entity)('base_sys_conf')
], BaseSysConfEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy9jb25mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnRDtBQUNoRCxrQ0FBcUM7QUFFckM7O0dBRUc7QUFFSSxJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFrQixTQUFRLGlCQUFVO0NBT2hELENBQUE7QUFQWSw4Q0FBaUI7QUFHNUI7SUFGQyxJQUFBLGVBQUssRUFBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7OytDQUNkO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O2lEQUNaOzRCQU5KLGlCQUFpQjtJQUQ3QixJQUFBLGdCQUFNLEVBQUMsZUFBZSxDQUFDO0dBQ1gsaUJBQWlCLENBTzdCIn0=