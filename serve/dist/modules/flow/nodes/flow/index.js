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
exports.NodeFlow = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
const context_1 = require("../../runner/context");
const config_1 = require("../../service/config");
const run_1 = require("../../service/run");
const info_1 = require("../../entity/info");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
/**
 * 流程
 */
let NodeFlow = class NodeFlow extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     */
    async run(context) {
        const { outputParams, options } = this.config;
        // 获得输入参数
        const params = this.inputParams;
        // 获取流程label
        const flowInfo = await this.flowInfoEntity.findOneBy({
            id: (0, typeorm_2.Equal)(options.flowId),
        });
        if (!flowInfo) {
            throw new Error('流程不存在');
        }
        const flowContext = new context_1.FlowContext();
        flowContext.setRequestId('xxxxx');
        flowContext.setDebug(false);
        flowContext.setInternal(true);
        // 执行流程
        const { result } = await this.flowRunService.invoke(params, flowInfo.label, false, flowContext);
        for (const param of outputParams) {
            context.set(`${this.getPrefix()}.${param.field}`, result[param.field], 'output');
        }
        return {
            success: true,
            result: result || {},
        };
    }
};
exports.NodeFlow = NodeFlow;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.FlowInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], NodeFlow.prototype, "flowInfoEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", config_1.FlowConfigService)
], NodeFlow.prototype, "flowConfigService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", run_1.FlowRunService)
], NodeFlow.prototype, "flowRunService", void 0);
exports.NodeFlow = NodeFlow = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeFlow);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2Zsb3cvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW1FO0FBQ25FLDRDQUE2QztBQUM3QyxrREFBbUQ7QUFFbkQsaURBQXlEO0FBQ3pELDJDQUFtRDtBQUNuRCw0Q0FBbUQ7QUFDbkQsK0NBQXNEO0FBQ3RELHFDQUE0QztBQUU1Qzs7R0FFRztBQUdJLElBQU0sUUFBUSxHQUFkLE1BQU0sUUFBUyxTQUFRLGVBQVE7SUFVcEM7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFvQjtRQUM1QixNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFOUMsU0FBUztRQUNULE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFaEMsWUFBWTtRQUNaLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDbkQsRUFBRSxFQUFFLElBQUEsZUFBSyxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxxQkFBVyxFQUFFLENBQUM7UUFDdEMsV0FBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsT0FBTztRQUNQLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUNqRCxNQUFNLEVBQ04sUUFBUSxDQUFDLEtBQUssRUFDZCxLQUFLLEVBQ0wsV0FBVyxDQUNaLENBQUM7UUFFRixLQUFLLE1BQU0sS0FBSyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxFQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUNuQixRQUFRLENBQ1QsQ0FBQztRQUNKLENBQUM7UUFFRCxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsTUFBTSxJQUFJLEVBQUU7U0FDckIsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBdERZLDRCQUFRO0FBRW5CO0lBREMsSUFBQSwyQkFBaUIsRUFBQyxxQkFBYyxDQUFDOzhCQUNsQixvQkFBVTtnREFBaUI7QUFHM0M7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDVSwwQkFBaUI7bURBQUM7QUFHckM7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTyxvQkFBYztnREFBQzttQkFScEIsUUFBUTtJQUZwQixJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEsWUFBSyxFQUFDLGdCQUFTLENBQUMsU0FBUyxDQUFDO0dBQ2QsUUFBUSxDQXNEcEIifQ==