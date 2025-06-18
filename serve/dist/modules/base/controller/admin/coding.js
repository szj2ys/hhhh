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
exports.AdminCodingController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const coding_1 = require("../../service/coding");
/**
 * Ai编码
 */
let AdminCodingController = class AdminCodingController extends core_1.BaseController {
    async getModuleTree() {
        return this.ok(await this.baseCodingService.getModuleTree());
    }
    async createCode(codes) {
        this.baseCodingService.createCode(codes);
        return this.ok();
    }
};
exports.AdminCodingController = AdminCodingController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", coding_1.BaseCodingService)
], AdminCodingController.prototype, "baseCodingService", void 0);
__decorate([
    (0, core_2.Get)('/getModuleTree', { summary: '获取模块目录结构' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminCodingController.prototype, "getModuleTree", null);
__decorate([
    (0, core_2.Post)('/createCode', { summary: '创建代码' }),
    __param(0, (0, core_2.Body)('codes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AdminCodingController.prototype, "createCode", null);
exports.AdminCodingController = AdminCodingController = __decorate([
    (0, core_1.CoolController)()
], AdminCodingController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL2NvZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUseUNBQXlEO0FBQ3pELGlEQUF5RDtBQUV6RDs7R0FFRztBQUVJLElBQU0scUJBQXFCLEdBQTNCLE1BQU0scUJBQXNCLFNBQVEscUJBQWM7SUFLakQsQUFBTixLQUFLLENBQUMsYUFBYTtRQUNqQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsVUFBVSxDQUVkLEtBR0c7UUFFSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FDRixDQUFBO0FBcEJZLHNEQUFxQjtBQUVoQztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNVLDBCQUFpQjtnRUFBQztBQUcvQjtJQURMLElBQUEsVUFBRyxFQUFDLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDOzs7OzBEQUc5QztBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBRXRDLFdBQUEsSUFBQSxXQUFJLEVBQUMsT0FBTyxDQUFDLENBQUE7Ozs7dURBUWY7Z0NBbkJVLHFCQUFxQjtJQURqQyxJQUFBLHFCQUFjLEdBQUU7R0FDSixxQkFBcUIsQ0FvQmpDIn0=