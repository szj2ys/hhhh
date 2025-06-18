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
exports.AdminKnowRetrieverController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const retriever_1 = require("../../service/retriever");
/**
 * 检索器
 */
let AdminKnowRetrieverController = class AdminKnowRetrieverController extends core_1.BaseController {
    async invoke(knowId, text, options) {
        const result = await this.knowRetrieverService.invoke(knowId, text, options);
        return this.ok(result);
    }
};
exports.AdminKnowRetrieverController = AdminKnowRetrieverController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", retriever_1.KnowRetrieverService)
], AdminKnowRetrieverController.prototype, "knowRetrieverService", void 0);
__decorate([
    (0, core_2.Post)('/invoke', { summary: '调用' }),
    __param(0, (0, core_2.Body)('knowId')),
    __param(1, (0, core_2.Body)('text')),
    __param(2, (0, core_2.Body)('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], AdminKnowRetrieverController.prototype, "invoke", null);
exports.AdminKnowRetrieverController = AdminKnowRetrieverController = __decorate([
    (0, core_1.CoolController)()
], AdminKnowRetrieverController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9jb250cm9sbGVyL2FkbWluL3JldHJpZXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUseUNBQW9EO0FBQ3BELHVEQUErRDtBQUcvRDs7R0FFRztBQUVJLElBQU0sNEJBQTRCLEdBQWxDLE1BQU0sNEJBQTZCLFNBQVEscUJBQWM7SUFLeEQsQUFBTixLQUFLLENBQUMsTUFBTSxDQUNNLE1BQWMsRUFDaEIsSUFBWSxFQUNULE9BQXNCO1FBRXZDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FDbkQsTUFBTSxFQUNOLElBQUksRUFDSixPQUFPLENBQ1IsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDO0NBQ0YsQ0FBQTtBQWpCWSxvRUFBNEI7QUFFdkM7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDYSxnQ0FBb0I7MEVBQUM7QUFHckM7SUFETCxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFFaEMsV0FBQSxJQUFBLFdBQUksRUFBQyxRQUFRLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFDWixXQUFBLElBQUEsV0FBSSxFQUFDLFNBQVMsQ0FBQyxDQUFBOzs7OzBEQVFqQjt1Q0FoQlUsNEJBQTRCO0lBRHhDLElBQUEscUJBQWMsR0FBRTtHQUNKLDRCQUE0QixDQWlCeEMifQ==