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
exports.FlowLogEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 流程日志
 */
let FlowLogEntity = class FlowLogEntity extends base_1.BaseEntity {
};
exports.FlowLogEntity = FlowLogEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '流程ID' }),
    __metadata("design:type", Number)
], FlowLogEntity.prototype, "flowId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '类型 0-失败 1-成功 2-未知', default: 0 }),
    __metadata("design:type", Number)
], FlowLogEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '传入参数',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], FlowLogEntity.prototype, "inputParams", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '结果',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], FlowLogEntity.prototype, "result", void 0);
exports.FlowLogEntity = FlowLogEntity = __decorate([
    (0, typeorm_1.Entity)('flow_log')
], FlowLogEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9lbnRpdHkvbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFxRTtBQUNyRSxxQ0FBeUM7QUFFekM7O0dBRUc7QUFFSSxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFjLFNBQVEsaUJBQVU7Q0FzQjVDLENBQUE7QUF0Qlksc0NBQWE7QUFFeEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7OzZDQUNiO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzsyQ0FDeEM7QUFRYjtJQU5DLElBQUEsZ0JBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSxNQUFNO1FBQ2YsSUFBSSxFQUFFLE1BQU07UUFDWixXQUFXLEVBQUUsc0JBQWU7UUFDNUIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOztrREFDZTtBQVFqQjtJQU5DLElBQUEsZ0JBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSxJQUFJO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixXQUFXLEVBQUUsc0JBQWU7UUFDNUIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzs2Q0FDVTt3QkFyQkQsYUFBYTtJQUR6QixJQUFBLGdCQUFNLEVBQUMsVUFBVSxDQUFDO0dBQ04sYUFBYSxDQXNCekIifQ==