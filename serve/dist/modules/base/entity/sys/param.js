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
exports.BaseSysParamEntity = void 0;
const base_1 = require("../base");
const typeorm_1 = require("typeorm");
/**
 * 参数配置
 */
let BaseSysParamEntity = class BaseSysParamEntity extends base_1.BaseEntity {
};
exports.BaseSysParamEntity = BaseSysParamEntity;
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '键' }),
    __metadata("design:type", String)
], BaseSysParamEntity.prototype, "keyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], BaseSysParamEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '数据', type: 'text' }),
    __metadata("design:type", String)
], BaseSysParamEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '数据类型 0-字符串 1-富文本 2-文件 ',
        default: 0,
    }),
    __metadata("design:type", Number)
], BaseSysParamEntity.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '备注', nullable: true }),
    __metadata("design:type", String)
], BaseSysParamEntity.prototype, "remark", void 0);
exports.BaseSysParamEntity = BaseSysParamEntity = __decorate([
    (0, typeorm_1.Entity)('base_sys_param')
], BaseSysParamEntity);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iYXNlL2VudGl0eS9zeXMvcGFyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsa0NBQXFDO0FBQ3JDLHFDQUFnRDtBQUVoRDs7R0FFRztBQUVJLElBQU0sa0JBQWtCLEdBQXhCLE1BQU0sa0JBQW1CLFNBQVEsaUJBQVU7Q0FtQmpELENBQUE7QUFuQlksZ0RBQWtCO0FBRzdCO0lBRkMsSUFBQSxlQUFLLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDOzttREFDVDtBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Z0RBQ2I7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOztnREFDM0I7QUFNYjtJQUpDLElBQUEsZ0JBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsT0FBTyxFQUFFLENBQUM7S0FDWCxDQUFDOztvREFDZTtBQUdqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztrREFDM0I7NkJBbEJKLGtCQUFrQjtJQUQ5QixJQUFBLGdCQUFNLEVBQUMsZ0JBQWdCLENBQUM7R0FDWixrQkFBa0IsQ0FtQjlCIn0=