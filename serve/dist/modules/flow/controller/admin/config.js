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
exports.AdminFlowConfigController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const config_1 = require("../../entity/config");
const config_2 = require("../../service/config");
const config_3 = require("../../../know/service/config");
/**
 * 节点配置
 */
let AdminFlowConfigController = class AdminFlowConfigController extends core_1.BaseController {
    async all() {
        return this.ok([
            ...(await this.flowConfigService.all()),
            ...(await this.knowConfigService.all()),
        ]);
    }
    async config(node, type) {
        return this.ok(await this.flowConfigService.config(node, type));
    }
    async getByNode(node, type) {
        const config = await this.flowConfigService.getByNode(node, type);
        return this.ok(config);
    }
};
exports.AdminFlowConfigController = AdminFlowConfigController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", config_2.FlowConfigService)
], AdminFlowConfigController.prototype, "flowConfigService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", config_3.KnowConfigService)
], AdminFlowConfigController.prototype, "knowConfigService", void 0);
__decorate([
    (0, core_2.Get)('/all', { summary: '获取所有配置' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminFlowConfigController.prototype, "all", null);
__decorate([
    (0, core_2.Post)('/config', { summary: '获取节点配置' }),
    __param(0, (0, core_2.Body)('node')),
    __param(1, (0, core_2.Body)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminFlowConfigController.prototype, "config", null);
__decorate([
    (0, core_2.Get)('/getByNode', { summary: '通过名称获取配置' }),
    __param(0, (0, core_2.Query)('node')),
    __param(1, (0, core_2.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminFlowConfigController.prototype, "getByNode", null);
exports.AdminFlowConfigController = AdminFlowConfigController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: config_1.FlowConfigEntity,
        service: config_2.FlowConfigService,
        pageQueryOp: {
            keyWordLikeFields: ['a.name'],
            fieldEq: ['a.func', 'a.type', 'a.node'],
        },
        listQueryOp: {
            select: ['a.*'],
            fieldEq: ['b.type'],
        },
    })
], AdminFlowConfigController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9jb250cm9sbGVyL2FkbWluL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUseUNBQWdFO0FBQ2hFLGdEQUF1RDtBQUN2RCxpREFBeUQ7QUFFekQseURBQWlFO0FBRWpFOztHQUVHO0FBY0ksSUFBTSx5QkFBeUIsR0FBL0IsTUFBTSx5QkFBMEIsU0FBUSxxQkFBYztJQVFyRCxBQUFOLEtBQUssQ0FBQyxHQUFHO1FBQ1AsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2IsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsTUFBTSxDQUFlLElBQWlCLEVBQWdCLElBQVk7UUFDdEUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsU0FBUyxDQUFnQixJQUFZLEVBQWlCLElBQVk7UUFDdEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUNGLENBQUE7QUF6QlksOERBQXlCO0FBRXBDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1UsMEJBQWlCO29FQUFDO0FBR3JDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1UsMEJBQWlCO29FQUFDO0FBRy9CO0lBREwsSUFBQSxVQUFHLEVBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDOzs7O29EQU1sQztBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLFdBQUEsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFBcUIsV0FBQSxJQUFBLFdBQUksRUFBQyxNQUFNLENBQUMsQ0FBQTs7Ozt1REFFMUQ7QUFHSztJQURMLElBQUEsVUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUMxQixXQUFBLElBQUEsWUFBSyxFQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQWdCLFdBQUEsSUFBQSxZQUFLLEVBQUMsTUFBTSxDQUFDLENBQUE7Ozs7MERBRzFEO29DQXhCVSx5QkFBeUI7SUFickMsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLHlCQUFnQjtRQUN4QixPQUFPLEVBQUUsMEJBQWlCO1FBQzFCLFdBQVcsRUFBRTtZQUNYLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO1NBQ3hDO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2YsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1NBQ3BCO0tBQ0YsQ0FBQztHQUNXLHlCQUF5QixDQXlCckMifQ==