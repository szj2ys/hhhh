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
exports.DemoI18nService = void 0;
const core_1 = require("@midwayjs/core");
const translate_1 = require("../../base/service/translate");
/**
 * 国际化服务
 */
let DemoI18nService = class DemoI18nService {
    /**
     * 翻译成英文
     */
    async en() {
        const value = this.translate.comm('一个很Cool的框架')['en'];
        console.log(value);
        return value;
    }
    /**
     * 翻译成繁体
     */
    async tw() {
        const value = this.translate.comm('一个很Cool的框架')['zh-tw'];
        console.log(value);
        return value;
    }
};
exports.DemoI18nService = DemoI18nService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", translate_1.BaseTranslateService)
], DemoI18nService.prototype, "translate", void 0);
exports.DemoI18nService = DemoI18nService = __decorate([
    (0, core_1.Provide)()
], DemoI18nService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RlbW8vc2VydmljZS9pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFpRDtBQUNqRCw0REFBb0U7QUFFcEU7O0dBRUc7QUFFSSxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0lBSTFCOztPQUVHO0lBQ0gsS0FBSyxDQUFDLEVBQUU7UUFDTixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLEVBQUU7UUFDTixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGLENBQUE7QUFyQlksMENBQWU7QUFFMUI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDRSxnQ0FBb0I7a0RBQUM7MEJBRnJCLGVBQWU7SUFEM0IsSUFBQSxjQUFPLEdBQUU7R0FDRyxlQUFlLENBcUIzQiJ9