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
exports.AppDictInfoController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const info_1 = require("../../service/info");
/**
 * 字典信息
 */
let AppDictInfoController = class AppDictInfoController extends core_2.BaseController {
    async data(types = []) {
        return this.ok(await this.dictInfoService.data(types));
    }
    async types() {
        return this.ok(await this.dictInfoService.types());
    }
};
exports.AppDictInfoController = AppDictInfoController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.DictInfoService)
], AppDictInfoController.prototype, "dictInfoService", void 0);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Post)('/data', { summary: '获得字典数据' }),
    __param(0, (0, core_1.Body)('types')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AppDictInfoController.prototype, "data", null);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Get)('/types', { summary: '获得所有字典类型' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppDictInfoController.prototype, "types", null);
exports.AppDictInfoController = AppDictInfoController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)(),
    (0, core_2.CoolUrlTag)()
], AppDictInfoController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RpY3QvY29udHJvbGxlci9hcHAvaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBa0U7QUFDbEUsNENBTTJCO0FBQzNCLDZDQUFxRDtBQUVyRDs7R0FFRztBQUlJLElBQU0scUJBQXFCLEdBQTNCLE1BQU0scUJBQXNCLFNBQVEscUJBQWM7SUFNakQsQUFBTixLQUFLLENBQUMsSUFBSSxDQUFnQixRQUFrQixFQUFFO1FBQzVDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUlLLEFBQU4sS0FBSyxDQUFDLEtBQUs7UUFDVCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNGLENBQUE7QUFmWSxzREFBcUI7QUFFaEM7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDUSxzQkFBZTs4REFBQztBQUkzQjtJQUZMLElBQUEsY0FBTyxFQUFDLGVBQVEsQ0FBQyxZQUFZLENBQUM7SUFDOUIsSUFBQSxXQUFJLEVBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLFdBQUEsSUFBQSxXQUFJLEVBQUMsT0FBTyxDQUFDLENBQUE7Ozs7aURBRXhCO0FBSUs7SUFGTCxJQUFBLGNBQU8sRUFBQyxlQUFRLENBQUMsWUFBWSxDQUFDO0lBQzlCLElBQUEsVUFBRyxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzs7OztrREFHdEM7Z0NBZFUscUJBQXFCO0lBSGpDLElBQUEsY0FBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxHQUFFO0lBQ2hCLElBQUEsaUJBQVUsR0FBRTtHQUNBLHFCQUFxQixDQWVqQyJ9