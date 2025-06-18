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
exports.FlowRunService = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const info_1 = require("./info");
const exec_1 = require("../runner/exec");
const result_1 = require("../entity/result");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const log_1 = require("../entity/log");
/**
 * 运行流程
 */
let FlowRunService = class FlowRunService extends core_1.BaseService {
    /**
     * 预初始化
     * @param params 请求参数
     * @param label 流程label
     * @param nodeId 节点ID
     * @param stream 是否流式调用
     * @param context 上下文
     * @param callback 回调
     */
    async preInit(params, label, stream, context) {
        // 设置请求参数
        context.setRequestParams(params);
        // 调试的时候非流式调用
        context.setStream(stream);
        // 获得所有节点
        const { nodes, graph, info } = await this.flowInfoService.getNodes(label, context.isDebug());
        // 设置流程图
        context.setFlowGraph(graph);
        // 设置上下文
        this.flowExecutor.setContext(context);
        // 设置流程图
        this.flowExecutor.setFlowGraph(graph);
        // 设置节点
        this.flowExecutor.setFlowNode(nodes);
        return { nodes, graph, info };
    }
    /**
     * 调试
     * @param params 请求参数
     * @param label 流程label
     * @param stream 是否流式调用
     * @param context 上下文
     * @param nodeId 节点ID
     * @param callback 回调
     */
    async debug(params, label, stream, context, nodeId, callback) {
        // 设置调试
        context.setDebug(true);
        // 预初始化
        await this.preInit(params, label, stream, context);
        // 执行流程
        await this.flowExecutor.run(nodeId, callback);
    }
    /**
     * 调用
     * @param params 请求参数
     * @param label 流程label
     * @param stream 是否流式调用
     * @param context 上下文
     * @param callback 回调
     */
    async invoke(params, label, stream, context, callback) {
        // 预初始化
        const { info } = await this.preInit(params, label, stream, context);
        // 执行流程
        const result = await this.flowExecutor.run(null, callback);
        // 保存日志
        this.flowLogEntity.save({
            flowId: info.id,
            type: result.success ? 1 : 0,
            inputParams: params,
            result,
        });
        return result;
    }
};
exports.FlowRunService = FlowRunService;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", exec_1.FlowExecutor)
], FlowRunService.prototype, "flowExecutor", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_1.FlowInfoService)
], FlowRunService.prototype, "flowInfoService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], FlowRunService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(log_1.FlowLogEntity),
    __metadata("design:type", typeorm_2.Repository)
], FlowRunService.prototype, "flowLogEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(result_1.FlowResultEntity),
    __metadata("design:type", typeorm_2.Repository)
], FlowRunService.prototype, "flowResultEntity", void 0);
exports.FlowRunService = FlowRunService = __decorate([
    (0, core_2.Provide)()
], FlowRunService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9zZXJ2aWNlL3J1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUseUNBQTBEO0FBQzFELGlDQUF5QztBQUN6Qyx5Q0FBOEM7QUFFOUMsNkNBQW9EO0FBQ3BELCtDQUFzRDtBQUN0RCxxQ0FBcUM7QUFDckMsdUNBQThDO0FBRTlDOztHQUVHO0FBRUksSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBZSxTQUFRLGtCQUFXO0lBaUI3Qzs7Ozs7Ozs7T0FRRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQ1gsTUFBVyxFQUNYLEtBQWEsRUFDYixNQUFlLEVBQ2YsT0FBb0I7UUFFcEIsU0FBUztRQUNULE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxhQUFhO1FBQ2IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixTQUFTO1FBQ1QsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FDaEUsS0FBSyxFQUNMLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FDbEIsQ0FBQztRQUNGLFFBQVE7UUFDUixPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLFFBQVE7UUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxRQUFRO1FBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsT0FBTztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQ1QsTUFBVyxFQUNYLEtBQWEsRUFDYixNQUFlLEVBQ2YsT0FBb0IsRUFDcEIsTUFBZSxFQUNmLFFBQXdCO1FBRXhCLE9BQU87UUFDUCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLE9BQU87UUFDUCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsT0FBTztRQUNQLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FDVixNQUFXLEVBQ1gsS0FBYSxFQUNiLE1BQWUsRUFDZixPQUFvQixFQUNwQixRQUF3QjtRQUV4QixPQUFPO1FBQ1AsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRSxPQUFPO1FBQ1AsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0QsT0FBTztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNmLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsV0FBVyxFQUFFLE1BQU07WUFDbkIsTUFBTTtTQUNQLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFBO0FBekdZLHdDQUFjO0FBR3pCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ0ssbUJBQVk7b0RBQUM7QUFHM0I7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDUSxzQkFBZTt1REFBQztBQUdqQztJQURDLElBQUEsYUFBTSxHQUFFOzs4Q0FDTztBQUdoQjtJQURDLElBQUEsMkJBQWlCLEVBQUMsbUJBQWEsQ0FBQzs4QkFDbEIsb0JBQVU7cURBQWdCO0FBR3pDO0lBREMsSUFBQSwyQkFBaUIsRUFBQyx5QkFBZ0IsQ0FBQzs4QkFDbEIsb0JBQVU7d0RBQW1CO3lCQWZwQyxjQUFjO0lBRDFCLElBQUEsY0FBTyxHQUFFO0dBQ0csY0FBYyxDQXlHMUIifQ==