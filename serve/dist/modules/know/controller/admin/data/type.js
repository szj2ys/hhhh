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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminKnowDataTypeController = void 0;
const core_1 = require("@cool-midway/core");
const type_1 = require("../../../entity/data/type");
const type_2 = require("../../../service/data/type");
const core_2 = require("@midwayjs/core");
/**
 * 知识信息类型
 */
let AdminKnowDataTypeController = class AdminKnowDataTypeController extends core_1.BaseController {
    async rebuild(typeId) {
        this.service.rebuild(typeId);
        return this.ok();
    }
};
exports.AdminKnowDataTypeController = AdminKnowDataTypeController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", type_2.KnowDataTypeService)
], AdminKnowDataTypeController.prototype, "service", void 0);
__decorate([
    (0, core_2.Post)('/rebuild', { summary: '重建' }),
    __param(0, (0, core_2.Body)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminKnowDataTypeController.prototype, "rebuild", null);
exports.AdminKnowDataTypeController = AdminKnowDataTypeController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: type_1.KnowDataTypeEntity,
        service: type_2.KnowDataTypeService,
        pageQueryOp: {
            keyWordLikeFields: ['a.name'],
        },
    })
], AdminKnowDataTypeController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvY29udHJvbGxlci9hZG1pbi9kYXRhL3R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQW1FO0FBQ25FLG9EQUErRDtBQUMvRCxxREFBaUU7QUFDakUseUNBQW9EO0FBRXBEOztHQUVHO0FBU0ksSUFBTSwyQkFBMkIsR0FBakMsTUFBTSwyQkFBNEIsU0FBUSxxQkFBYztJQUt2RCxBQUFOLEtBQUssQ0FBQyxPQUFPLENBQWlCLE1BQWM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNGLENBQUE7QUFUWSxrRUFBMkI7QUFFdEM7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDQSwwQkFBbUI7NERBQUM7QUFHdkI7SUFETCxJQUFBLFdBQUksRUFBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDckIsV0FBQSxJQUFBLFdBQUksRUFBQyxRQUFRLENBQUMsQ0FBQTs7OzswREFHNUI7c0NBUlUsMkJBQTJCO0lBUnZDLElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSx5QkFBa0I7UUFDMUIsT0FBTyxFQUFFLDBCQUFtQjtRQUM1QixXQUFXLEVBQUU7WUFDWCxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUM5QjtLQUNGLENBQUM7R0FDVywyQkFBMkIsQ0FTdkMifQ==