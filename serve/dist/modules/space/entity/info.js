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
exports.SpaceInfoEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 文件空间信息
 */
let SpaceInfoEntity = class SpaceInfoEntity extends base_1.BaseEntity {
};
exports.SpaceInfoEntity = SpaceInfoEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '地址' }),
    __metadata("design:type", String)
], SpaceInfoEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '类型' }),
    __metadata("design:type", String)
], SpaceInfoEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '分类ID', nullable: true }),
    __metadata("design:type", Number)
], SpaceInfoEntity.prototype, "classifyId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '文件id' }),
    __metadata("design:type", String)
], SpaceInfoEntity.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '文件名' }),
    __metadata("design:type", String)
], SpaceInfoEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '文件大小' }),
    __metadata("design:type", Number)
], SpaceInfoEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '文档版本', default: 1 }),
    __metadata("design:type", Number)
], SpaceInfoEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '文件位置' }),
    __metadata("design:type", String)
], SpaceInfoEntity.prototype, "key", void 0);
exports.SpaceInfoEntity = SpaceInfoEntity = __decorate([
    (0, typeorm_1.Entity)('space_info')
], SpaceInfoEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NwYWNlL2VudGl0eS9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFvRDtBQUNwRCxxQ0FBZ0Q7QUFFaEQ7O0dBRUc7QUFFSSxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFnQixTQUFRLGlCQUFVO0NBeUI5QyxDQUFBO0FBekJZLDBDQUFlO0FBRTFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs0Q0FDZDtBQUdaO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs2Q0FDYjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUN6QjtBQUluQjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzsrQ0FDYjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOzs2Q0FDZDtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs2Q0FDZjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O2dEQUN4QjtBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7NENBQ2hCOzBCQXhCRCxlQUFlO0lBRDNCLElBQUEsZ0JBQU0sRUFBQyxZQUFZLENBQUM7R0FDUixlQUFlLENBeUIzQiJ9