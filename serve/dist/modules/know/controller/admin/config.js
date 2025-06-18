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
exports.AdminKnowConfigController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const config_1 = require("../../service/config");
const config_2 = require("../../entity/config");
const config_3 = require("../../../flow/service/config");
/**
 * 配置
 */
let AdminKnowConfigController = class AdminKnowConfigController extends core_1.BaseController {
    async all() {
        return this.ok([
            ...(await this.flowConfigService.all()),
            ...(await this.knowConfigService.all()),
        ]);
    }
    async config(func, type) {
        return this.ok(await this.knowConfigService.config(func, type));
    }
    async getByNode(func, type) {
        const config = await this.knowConfigService.getByFunc(func, type);
        return this.ok(config);
    }
};
exports.AdminKnowConfigController = AdminKnowConfigController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", config_1.KnowConfigService)
], AdminKnowConfigController.prototype, "knowConfigService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", config_3.FlowConfigService)
], AdminKnowConfigController.prototype, "flowConfigService", void 0);
__decorate([
    (0, core_2.Get)('/all', { summary: '获取所有配置' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminKnowConfigController.prototype, "all", null);
__decorate([
    (0, core_2.Post)('/config', { summary: '获取配置' }),
    __param(0, (0, core_2.Body)('func')),
    __param(1, (0, core_2.Body)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminKnowConfigController.prototype, "config", null);
__decorate([
    (0, core_2.Get)('/getByFunc', { summary: '通过功能获取配置' }),
    __param(0, (0, core_2.Query)('func')),
    __param(1, (0, core_2.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminKnowConfigController.prototype, "getByNode", null);
exports.AdminKnowConfigController = AdminKnowConfigController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: config_2.KnowConfigEntity,
        service: config_1.KnowConfigService,
        pageQueryOp: {
            select: ['a.*'],
            keyWordLikeFields: ['a.name'],
            fieldEq: ['a.func', 'a.type'],
        },
        listQueryOp: {
            select: ['a.*'],
            fieldEq: ['b.type'],
        },
    })
], AdminKnowConfigController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9jb250cm9sbGVyL2FkbWluL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUseUNBQWdFO0FBQ2hFLGlEQUF5RDtBQUV6RCxnREFBdUQ7QUFDdkQseURBQWlFO0FBRWpFOztHQUVHO0FBZUksSUFBTSx5QkFBeUIsR0FBL0IsTUFBTSx5QkFBMEIsU0FBUSxxQkFBYztJQVFyRCxBQUFOLEtBQUssQ0FBQyxHQUFHO1FBQ1AsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2IsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsTUFBTSxDQUFlLElBQW1CLEVBQWdCLElBQVk7UUFDeEUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsU0FBUyxDQUFnQixJQUFZLEVBQWlCLElBQVk7UUFDdEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUNGLENBQUE7QUF6QlksOERBQXlCO0FBRXBDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1UsMEJBQWlCO29FQUFDO0FBR3JDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1UsMEJBQWlCO29FQUFDO0FBRy9CO0lBREwsSUFBQSxVQUFHLEVBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDOzs7O29EQU1sQztBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLFdBQUEsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFBdUIsV0FBQSxJQUFBLFdBQUksRUFBQyxNQUFNLENBQUMsQ0FBQTs7Ozt1REFFNUQ7QUFHSztJQURMLElBQUEsVUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUMxQixXQUFBLElBQUEsWUFBSyxFQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQWdCLFdBQUEsSUFBQSxZQUFLLEVBQUMsTUFBTSxDQUFDLENBQUE7Ozs7MERBRzFEO29DQXhCVSx5QkFBeUI7SUFkckMsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLHlCQUFnQjtRQUN4QixPQUFPLEVBQUUsMEJBQWlCO1FBQzFCLFdBQVcsRUFBRTtZQUNYLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNmLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7U0FDOUI7UUFDRCxXQUFXLEVBQUU7WUFDWCxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDcEI7S0FDRixDQUFDO0dBQ1cseUJBQXlCLENBeUJyQyJ9