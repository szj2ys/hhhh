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
exports.FlowSessionEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 流程日志
 */
let FlowSessionEntity = class FlowSessionEntity extends base_1.BaseEntity {
};
exports.FlowSessionEntity = FlowSessionEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '用户ID' }),
    __metadata("design:type", Number)
], FlowSessionEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '会话key' }),
    __metadata("design:type", String)
], FlowSessionEntity.prototype, "sessionKey", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'desc',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], FlowSessionEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '消息记录的顺序',
        nullable: true,
    }),
    __metadata("design:type", Number)
], FlowSessionEntity.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '[[isShow, isVoice, isEnd, isNew, isAnimation]]',
        nullable: true,
    }),
    __metadata("design:type", Number)
], FlowSessionEntity.prototype, "status", void 0);
exports.FlowSessionEntity = FlowSessionEntity = __decorate([
    (0, typeorm_1.Entity)('flow_session')
], FlowSessionEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvZW50aXR5L3Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW9GO0FBQ3BGLHFDQUE4QztBQUU5Qzs7R0FFRztBQUVJLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsaUJBQVU7Q0EyQmhELENBQUE7QUEzQlksOENBQWlCO0FBRzVCO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7O2lEQUNYO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUM7O3FEQUNSO0FBUW5CO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtRQUM1QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7OytDQUNRO0FBTVY7SUFKQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsU0FBUztRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O2dEQUNZO0FBTWQ7SUFKQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsZ0RBQWdEO1FBQ3pELFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7aURBQ2E7NEJBMUJKLGlCQUFpQjtJQUQ3QixJQUFBLGdCQUFNLEVBQUMsY0FBYyxDQUFDO0dBQ1YsaUJBQWlCLENBMkI3QiJ9