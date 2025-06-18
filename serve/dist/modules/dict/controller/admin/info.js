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
exports.AdminDictInfoController = void 0;
const info_1 = require("./../../entity/info");
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const info_2 = require("../../service/info");
/**
 * 字典信息
 */
let AdminDictInfoController = class AdminDictInfoController extends core_2.BaseController {
    async data(types = []) {
        return this.ok(await this.dictInfoService.data(types));
    }
    async types() {
        return this.ok(await this.dictInfoService.types());
    }
};
exports.AdminDictInfoController = AdminDictInfoController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_2.DictInfoService)
], AdminDictInfoController.prototype, "dictInfoService", void 0);
__decorate([
    (0, core_1.Post)('/data', { summary: '获得字典数据' }),
    __param(0, (0, core_1.Body)('types')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AdminDictInfoController.prototype, "data", null);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Get)('/types', { summary: '获得所有字典类型' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminDictInfoController.prototype, "types", null);
exports.AdminDictInfoController = AdminDictInfoController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: info_1.DictInfoEntity,
        service: info_2.DictInfoService,
        listQueryOp: {
            fieldEq: ['typeId'],
            keyWordLikeFields: ['name'],
            addOrderBy: {
                createTime: 'ASC',
            },
        },
    })
], AdminDictInfoController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RpY3QvY29udHJvbGxlci9hZG1pbi9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUFxRDtBQUNyRCx5Q0FBa0U7QUFDbEUsNENBSzJCO0FBQzNCLDZDQUFxRDtBQUVyRDs7R0FFRztBQWNJLElBQU0sdUJBQXVCLEdBQTdCLE1BQU0sdUJBQXdCLFNBQVEscUJBQWM7SUFLbkQsQUFBTixLQUFLLENBQUMsSUFBSSxDQUFnQixRQUFrQixFQUFFO1FBQzVDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUlLLEFBQU4sS0FBSyxDQUFDLEtBQUs7UUFDVCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNGLENBQUE7QUFkWSwwREFBdUI7QUFFbEM7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDUSxzQkFBZTtnRUFBQztBQUczQjtJQURMLElBQUEsV0FBSSxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUN6QixXQUFBLElBQUEsV0FBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBOzs7O21EQUV4QjtBQUlLO0lBRkwsSUFBQSxjQUFPLEVBQUMsZUFBUSxDQUFDLFlBQVksQ0FBQztJQUM5QixJQUFBLFVBQUcsRUFBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7Ozs7b0RBR3RDO2tDQWJVLHVCQUF1QjtJQWJuQyxJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxxQkFBYztRQUN0QixPQUFPLEVBQUUsc0JBQWU7UUFDeEIsV0FBVyxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ25CLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDO1lBQzNCLFVBQVUsRUFBRTtnQkFDVixVQUFVLEVBQUUsS0FBSzthQUNsQjtTQUNGO0tBQ0YsQ0FBQztHQUNXLHVCQUF1QixDQWNuQyJ9