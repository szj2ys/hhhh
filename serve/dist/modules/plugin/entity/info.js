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
exports.PluginInfoEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 插件信息
 */
let PluginInfoEntity = class PluginInfoEntity extends base_1.BaseEntity {
};
exports.PluginInfoEntity = PluginInfoEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], PluginInfoEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '简介' }),
    __metadata("design:type", String)
], PluginInfoEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: 'Key名' }),
    __metadata("design:type", String)
], PluginInfoEntity.prototype, "keyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'Hook' }),
    __metadata("design:type", String)
], PluginInfoEntity.prototype, "hook", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '描述', type: 'text' }),
    __metadata("design:type", String)
], PluginInfoEntity.prototype, "readme", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '版本' }),
    __metadata("design:type", String)
], PluginInfoEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'Logo(base64)', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PluginInfoEntity.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '作者' }),
    __metadata("design:type", String)
], PluginInfoEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态 0-禁用 1-启用', default: 0 }),
    __metadata("design:type", Number)
], PluginInfoEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '内容', type: 'json', transformer: base_1.transformerJson }),
    __metadata("design:type", Object)
], PluginInfoEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ts内容', type: 'json', transformer: base_1.transformerJson }),
    __metadata("design:type", Object)
], PluginInfoEntity.prototype, "tsContent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '插件的plugin.json',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PluginInfoEntity.prototype, "pluginJson", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '配置',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PluginInfoEntity.prototype, "config", void 0);
exports.PluginInfoEntity = PluginInfoEntity = __decorate([
    (0, typeorm_1.Entity)('plugin_info')
], PluginInfoEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3BsdWdpbi9lbnRpdHkvaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpREFBcUU7QUFDckUscUNBQWdEO0FBRWhEOztHQUVHO0FBRUksSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBaUIsU0FBUSxpQkFBVTtDQXdEL0MsQ0FBQTtBQXhEWSw0Q0FBZ0I7QUFFM0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUNiO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O3FEQUNOO0FBSXBCO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O2lEQUNaO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs4Q0FDZjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7O2dEQUN6QjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDVjtBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUNyRDtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDWDtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O2dEQUNqQztBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxzQkFBZSxFQUFFLENBQUM7O2lEQUlwRTtBQUdGO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxzQkFBZSxFQUFFLENBQUM7O21EQUl0RTtBQVFGO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtRQUM1QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O29EQUNjO0FBUWhCO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtRQUM1QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O2dEQUNVOzJCQXZERCxnQkFBZ0I7SUFENUIsSUFBQSxnQkFBTSxFQUFDLGFBQWEsQ0FBQztHQUNULGdCQUFnQixDQXdENUIifQ==