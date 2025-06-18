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
exports.KnowConfigEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 知识库配置
 */
let KnowConfigEntity = class KnowConfigEntity extends base_1.BaseEntity {
};
exports.KnowConfigEntity = KnowConfigEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], KnowConfigEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '描述', nullable: true }),
    __metadata("design:type", String)
], KnowConfigEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '类型' }),
    __metadata("design:type", String)
], KnowConfigEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '功能' }),
    __metadata("design:type", String)
], KnowConfigEntity.prototype, "func", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '配置', type: 'json', transformer: base_1.transformerJson }),
    __metadata("design:type", Object)
], KnowConfigEntity.prototype, "options", void 0);
exports.KnowConfigEntity = KnowConfigEntity = __decorate([
    (0, typeorm_1.Entity)('know_config')
], KnowConfigEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9lbnRpdHkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFxRTtBQUNyRSxxQ0FBeUM7QUFFekM7O0dBRUc7QUFFSSxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFpQixTQUFRLGlCQUFVO0NBZS9DLENBQUE7QUFmWSw0Q0FBZ0I7QUFFM0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUNiO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7cURBQ3RCO0FBR3BCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDYjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDYjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxzQkFBZSxFQUFFLENBQUM7O2lEQUN6RDsyQkFkRixnQkFBZ0I7SUFENUIsSUFBQSxnQkFBTSxFQUFDLGFBQWEsQ0FBQztHQUNULGdCQUFnQixDQWU1QiJ9