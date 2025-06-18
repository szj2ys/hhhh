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
exports.BaseSysLogEntity = void 0;
const base_1 = require("../base");
const typeorm_1 = require("typeorm");
/**
 * 系统日志
 */
let BaseSysLogEntity = class BaseSysLogEntity extends base_1.BaseEntity {
};
exports.BaseSysLogEntity = BaseSysLogEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '用户ID', nullable: true }),
    __metadata("design:type", Number)
], BaseSysLogEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '行为' }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: 'ip', nullable: true }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '参数',
        nullable: true,
        type: 'json',
        transformer: base_1.transformerJson,
    }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "params", void 0);
exports.BaseSysLogEntity = BaseSysLogEntity = __decorate([
    (0, typeorm_1.Entity)('base_sys_log')
], BaseSysLogEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9lbnRpdHkvc3lzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxrQ0FBc0Q7QUFDdEQscUNBQWdEO0FBRWhEOztHQUVHO0FBRUksSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBaUIsU0FBUSxpQkFBVTtDQW9CL0MsQ0FBQTtBQXBCWSw0Q0FBZ0I7QUFHM0I7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDN0I7QUFJZjtJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDWDtBQUlmO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQy9CO0FBUVg7SUFOQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLE1BQU07UUFDWixXQUFXLEVBQUUsc0JBQWU7S0FDN0IsQ0FBQzs7Z0RBQ2E7MkJBbkJKLGdCQUFnQjtJQUQ1QixJQUFBLGdCQUFNLEVBQUMsY0FBYyxDQUFDO0dBQ1YsZ0JBQWdCLENBb0I1QiJ9