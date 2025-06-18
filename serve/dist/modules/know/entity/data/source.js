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
exports.KnowDataSourceEntity = void 0;
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 数据源
 */
let KnowDataSourceEntity = class KnowDataSourceEntity extends core_1.BaseEntity {
};
exports.KnowDataSourceEntity = KnowDataSourceEntity;
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], KnowDataSourceEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '来源 0-自定义 1-文件 2-链接', default: 0 }),
    __metadata("design:type", Number)
], KnowDataSourceEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '知识库ID' }),
    __metadata("design:type", Number)
], KnowDataSourceEntity.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '状态 0-准备中 1-已就绪', default: 0 }),
    __metadata("design:type", Number)
], KnowDataSourceEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '内容', type: 'text', nullable: true }),
    __metadata("design:type", String)
], KnowDataSourceEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '配置', type: 'json', nullable: true }),
    __metadata("design:type", Object)
], KnowDataSourceEntity.prototype, "config", void 0);
exports.KnowDataSourceEntity = KnowDataSourceEntity = __decorate([
    (0, typeorm_1.Entity)('know_data_source')
], KnowDataSourceEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9lbnRpdHkvZGF0YS9zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQStDO0FBQy9DLHFDQUFnRDtBQUVoRDs7R0FFRztBQUVJLElBQU0sb0JBQW9CLEdBQTFCLE1BQU0sb0JBQXFCLFNBQVEsaUJBQVU7Q0FxQm5ELENBQUE7QUFyQlksb0RBQW9CO0FBRS9CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDWjtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7a0RBQ3pDO0FBSWI7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7b0RBQ2Q7QUFHZjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O29EQUNuQztBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7cURBQ3hDO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7b0RBR3REOytCQXBCUyxvQkFBb0I7SUFEaEMsSUFBQSxnQkFBTSxFQUFDLGtCQUFrQixDQUFDO0dBQ2Qsb0JBQW9CLENBcUJoQyJ9