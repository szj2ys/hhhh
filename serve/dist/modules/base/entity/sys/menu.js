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
exports.BaseSysMenuEntity = void 0;
const base_1 = require("../base");
const typeorm_1 = require("typeorm");
/**
 * 菜单
 */
let BaseSysMenuEntity = class BaseSysMenuEntity extends base_1.BaseEntity {
};
exports.BaseSysMenuEntity = BaseSysMenuEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '父菜单ID', nullable: true }),
    __metadata("design:type", Number)
], BaseSysMenuEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '菜单名称' }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '菜单地址', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "router", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '权限标识', type: 'text', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "perms", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '类型 0-目录 1-菜单 2-按钮',
        default: 0,
    }),
    __metadata("design:type", Number)
], BaseSysMenuEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '图标', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '排序', default: 0 }),
    __metadata("design:type", Number)
], BaseSysMenuEntity.prototype, "orderNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '视图地址', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "viewPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '路由缓存', default: true }),
    __metadata("design:type", Boolean)
], BaseSysMenuEntity.prototype, "keepAlive", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '是否显示', default: true }),
    __metadata("design:type", Boolean)
], BaseSysMenuEntity.prototype, "isShow", void 0);
exports.BaseSysMenuEntity = BaseSysMenuEntity = __decorate([
    (0, typeorm_1.Entity)('base_sys_menu')
], BaseSysMenuEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy9tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFxQztBQUNyQyxxQ0FBeUM7QUFFekM7O0dBRUc7QUFFSSxJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFrQixTQUFRLGlCQUFVO0NBdUNoRCxDQUFBO0FBdkNZLDhDQUFpQjtBQUU1QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDNUI7QUFHakI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7OytDQUNmO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7aURBQzdCO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDNUM7QUFNZDtJQUpDLElBQUEsZ0JBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsT0FBTyxFQUFFLENBQUM7S0FDWCxDQUFDOzsrQ0FDVztBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OytDQUM3QjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O21EQUNyQjtBQUdqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDM0I7QUFHakI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7b0RBQ3hCO0FBR25CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUMzQjs0QkFoQ0wsaUJBQWlCO0lBRDdCLElBQUEsZ0JBQU0sRUFBQyxlQUFlLENBQUM7R0FDWCxpQkFBaUIsQ0F1QzdCIn0=