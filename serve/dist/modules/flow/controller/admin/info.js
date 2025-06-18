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
exports.AdminFlowInfoController = void 0;
const core_1 = require("@cool-midway/core");
const info_1 = require("../../entity/info");
const core_2 = require("@midwayjs/core");
const info_2 = require("../../service/info");
/**
 * 流程信息
 */
let AdminFlowInfoController = class AdminFlowInfoController extends core_1.BaseController {
    async release(flowId) {
        return this.ok(await this.flowInfoService.release(flowId));
    }
};
exports.AdminFlowInfoController = AdminFlowInfoController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_2.FlowInfoService)
], AdminFlowInfoController.prototype, "flowInfoService", void 0);
__decorate([
    (0, core_2.Post)('/release', { summary: '发布流程' }),
    __param(0, (0, core_2.Body)('flowId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminFlowInfoController.prototype, "release", null);
exports.AdminFlowInfoController = AdminFlowInfoController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: info_1.FlowInfoEntity,
        service: info_2.FlowInfoService,
        pageQueryOp: {
            keyWordLikeFields: ['a.name', 'a.label'],
            select: [
                'a.id',
                'a.name',
                'a.label',
                'a.description',
                'a.status',
                'a.data',
                'a.version',
                'a.createTime',
                'a.releaseTime',
            ],
            where: ctx => {
                const { flowId, isRelease } = ctx.request.body;
                return [
                    ['a.id != :flowId', { flowId }, flowId],
                    ['a.releaseTime is not null', {}, isRelease],
                ];
            },
            addOrderBy: {
                createTime: 'desc',
            },
        },
    })
], AdminFlowInfoController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvY29udHJvbGxlci9hZG1pbi9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFtRTtBQUNuRSw0Q0FBbUQ7QUFDbkQseUNBQW9EO0FBQ3BELDZDQUFxRDtBQUVyRDs7R0FFRztBQStCSSxJQUFNLHVCQUF1QixHQUE3QixNQUFNLHVCQUF3QixTQUFRLHFCQUFjO0lBS25ELEFBQU4sS0FBSyxDQUFDLE9BQU8sQ0FBaUIsTUFBYztRQUMxQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FDRixDQUFBO0FBUlksMERBQXVCO0FBRWxDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1Esc0JBQWU7Z0VBQUM7QUFHM0I7SUFETCxJQUFBLFdBQUksRUFBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDdkIsV0FBQSxJQUFBLFdBQUksRUFBQyxRQUFRLENBQUMsQ0FBQTs7OztzREFFNUI7a0NBUFUsdUJBQXVCO0lBOUJuQyxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUscUJBQWM7UUFDdEIsT0FBTyxFQUFFLHNCQUFlO1FBQ3hCLFdBQVcsRUFBRTtZQUNYLGlCQUFpQixFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztZQUN4QyxNQUFNLEVBQUU7Z0JBQ04sTUFBTTtnQkFDTixRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsZUFBZTtnQkFDZixVQUFVO2dCQUNWLFFBQVE7Z0JBQ1IsV0FBVztnQkFDWCxjQUFjO2dCQUNkLGVBQWU7YUFDaEI7WUFDRCxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFFL0MsT0FBTztvQkFDTCxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDO29CQUN2QyxDQUFDLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUM7aUJBQzdDLENBQUM7WUFDSixDQUFDO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CO1NBQ0Y7S0FDRixDQUFDO0dBQ1csdUJBQXVCLENBUW5DIn0=