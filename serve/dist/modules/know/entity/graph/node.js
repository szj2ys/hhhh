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
exports.KnowGraphNodeEntity = void 0;
const base_1 = require("../../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 节点
 */
let KnowGraphNodeEntity = class KnowGraphNodeEntity extends base_1.BaseEntity {
};
exports.KnowGraphNodeEntity = KnowGraphNodeEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], KnowGraphNodeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '类型' }),
    __metadata("design:type", String)
], KnowGraphNodeEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '知识库ID' }),
    __metadata("design:type", Number)
], KnowGraphNodeEntity.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '分块ID' }),
    __metadata("design:type", String)
], KnowGraphNodeEntity.prototype, "chunkId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '资源ID' }),
    __metadata("design:type", Number)
], KnowGraphNodeEntity.prototype, "sourceId", void 0);
exports.KnowGraphNodeEntity = KnowGraphNodeEntity = __decorate([
    (0, typeorm_1.Index)(['name', 'typeId'], { unique: true }),
    (0, typeorm_1.Entity)('know_graph_node')
], KnowGraphNodeEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvZW50aXR5L2dyYXBoL25vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXVEO0FBQ3ZELHFDQUFnRDtBQUVoRDs7R0FFRztBQUdJLElBQU0sbUJBQW1CLEdBQXpCLE1BQU0sbUJBQW9CLFNBQVEsaUJBQVU7Q0FtQmxELENBQUE7QUFuQlksa0RBQW1CO0FBRTlCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDYjtBQUliO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUNiO0FBSWI7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7bURBQ2Q7QUFJZjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztvREFDWjtBQUloQjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztxREFDWDs4QkFsQk4sbUJBQW1CO0lBRi9CLElBQUEsZUFBSyxFQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzNDLElBQUEsZ0JBQU0sRUFBQyxpQkFBaUIsQ0FBQztHQUNiLG1CQUFtQixDQW1CL0IifQ==