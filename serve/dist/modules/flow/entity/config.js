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
exports.FlowConfigEntity = void 0;
const base_1 = require("../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 流程配置
 */
let FlowConfigEntity = class FlowConfigEntity extends base_1.BaseEntity {
};
exports.FlowConfigEntity = FlowConfigEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], FlowConfigEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '描述', nullable: true }),
    __metadata("design:type", String)
], FlowConfigEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '类型' }),
    __metadata("design:type", String)
], FlowConfigEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '节点' }),
    __metadata("design:type", String)
], FlowConfigEntity.prototype, "node", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '配置',
        type: 'json',
        transformer: base_1.transformerJson,
    }),
    __metadata("design:type", Object)
], FlowConfigEntity.prototype, "options", void 0);
exports.FlowConfigEntity = FlowConfigEntity = __decorate([
    (0, typeorm_1.Entity)('flow_config')
], FlowConfigEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9lbnRpdHkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFxRTtBQUNyRSxxQ0FBeUM7QUFFekM7O0dBRUc7QUFFSSxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFpQixTQUFRLGlCQUFVO0NBbUIvQyxDQUFBO0FBbkJZLDRDQUFnQjtBQUUzQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OENBQ2I7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztxREFDdEI7QUFHcEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUNiO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUNiO0FBT2I7SUFMQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxNQUFNO1FBQ1osV0FBVyxFQUFFLHNCQUFlO0tBQzdCLENBQUM7O2lEQUNXOzJCQWxCRixnQkFBZ0I7SUFENUIsSUFBQSxnQkFBTSxFQUFDLGFBQWEsQ0FBQztHQUNULGdCQUFnQixDQW1CNUIifQ==