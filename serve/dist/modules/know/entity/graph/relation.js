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
exports.KnowGraphRelationEntity = void 0;
const base_1 = require("../../../base/entity/base");
const typeorm_1 = require("typeorm");
/**
 * 关系
 */
let KnowGraphRelationEntity = class KnowGraphRelationEntity extends base_1.BaseEntity {
};
exports.KnowGraphRelationEntity = KnowGraphRelationEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '知识库ID' }),
    __metadata("design:type", Number)
], KnowGraphRelationEntity.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '分块ID' }),
    __metadata("design:type", String)
], KnowGraphRelationEntity.prototype, "chunkId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '资源ID' }),
    __metadata("design:type", Number)
], KnowGraphRelationEntity.prototype, "sourceId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '类型' }),
    __metadata("design:type", String)
], KnowGraphRelationEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '源' }),
    __metadata("design:type", String)
], KnowGraphRelationEntity.prototype, "sourceName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '目标' }),
    __metadata("design:type", String)
], KnowGraphRelationEntity.prototype, "targetName", void 0);
exports.KnowGraphRelationEntity = KnowGraphRelationEntity = __decorate([
    (0, typeorm_1.Entity)('know_graph_relation')
], KnowGraphRelationEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L2VudGl0eS9ncmFwaC9yZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxvREFBdUQ7QUFDdkQscUNBQWdEO0FBRWhEOztHQUVHO0FBRUksSUFBTSx1QkFBdUIsR0FBN0IsTUFBTSx1QkFBd0IsU0FBUSxpQkFBVTtDQXdCdEQsQ0FBQTtBQXhCWSwwREFBdUI7QUFHbEM7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7dURBQ2Q7QUFJZjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzt3REFDWjtBQUloQjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzt5REFDWDtBQUlqQjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztxREFDYjtBQUliO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7OzJEQUNOO0FBSW5CO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJEQUNQO2tDQXZCUix1QkFBdUI7SUFEbkMsSUFBQSxnQkFBTSxFQUFDLHFCQUFxQixDQUFDO0dBQ2pCLHVCQUF1QixDQXdCbkMifQ==