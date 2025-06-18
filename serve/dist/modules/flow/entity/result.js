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
exports.FlowResultEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
const node_1 = require("../runner/node");
/**
 * 流程结果
 */
let FlowResultEntity = class FlowResultEntity extends base_1.BaseEntity {
};
exports.FlowResultEntity = FlowResultEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '请求ID' }),
    __metadata("design:type", String)
], FlowResultEntity.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '节点ID',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", node_1.FlowNode)
], FlowResultEntity.prototype, "node", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '节点类型' }),
    __metadata("design:type", String)
], FlowResultEntity.prototype, "nodeType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '输入',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], FlowResultEntity.prototype, "input", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '输出',
        type: 'json',
        transformer: base_1.transformerJson,
        nullable: true,
    }),
    __metadata("design:type", Object)
], FlowResultEntity.prototype, "output", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '持续时间(毫秒)', default: 0 }),
    __metadata("design:type", Number)
], FlowResultEntity.prototype, "duration", void 0);
exports.FlowResultEntity = FlowResultEntity = __decorate([
    (0, typeorm_1.Entity)('flow_result')
], FlowResultEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9lbnRpdHkvcmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFxRTtBQUNyRSxxQ0FBeUM7QUFDekMseUNBQTBDO0FBRTFDOztHQUVHO0FBRUksSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBaUIsU0FBUSxpQkFBVTtDQWlDL0MsQ0FBQTtBQWpDWSw0Q0FBZ0I7QUFFM0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O21EQUNWO0FBUWxCO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtRQUM1QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7OEJBQ0ksZUFBUTs4Q0FBQztBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztrREFDWDtBQVFqQjtJQU5DLElBQUEsZ0JBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSxJQUFJO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixXQUFXLEVBQUUsc0JBQWU7UUFDNUIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzsrQ0FDUztBQVFYO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxzQkFBZTtRQUM1QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O2dEQUNVO0FBR1o7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7a0RBQzNCOzJCQWhDTixnQkFBZ0I7SUFENUIsSUFBQSxnQkFBTSxFQUFDLGFBQWEsQ0FBQztHQUNULGdCQUFnQixDQWlDNUIifQ==