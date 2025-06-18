"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeJudge = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
const _ = require("lodash");
// 条件对应的方法
const methods = {
    /** 包含 */
    include: (paramValue, value) => _.includes(paramValue, value),
    /** 不包含 */
    exclude: (paramValue, value) => !_.includes(paramValue, value),
    /** 开始是 */
    startWith: (paramValue, value) => _.startsWith(paramValue, value),
    /** 结束是 */
    endWith: (paramValue, value) => _.endsWith(paramValue, value),
    /** 等于 */
    equal: (paramValue, value) => _.isEqual(paramValue, value),
    /** 不等于 */
    notEqual: (paramValue, value) => !_.isEqual(paramValue, value),
    /** 大于 */
    greaterThan: (paramValue, value) => _.gt(paramValue, value),
    /** 大于等于 */
    greaterThanOrEqual: (paramValue, value) => _.gte(paramValue, value),
    /** 小于 */
    lessThan: (paramValue, value) => _.lt(paramValue, value),
    /** 小于等于 */
    lessThanOrEqual: (paramValue, value) => _.lte(paramValue, value),
    /** 为空 */
    isNull: (paramValue) => _.isNull(paramValue),
    /** 不为空 */
    isNotNull: (paramValue) => !_.isNull(paramValue),
};
/**
 * 判断器
 */
let NodeJudge = class NodeJudge extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     */
    async run(context) {
        const { IF } = this.config.options;
        const datas = context.getData('output');
        const eqResult = [];
        for (const item of IF) {
            const paramValue = datas.get(`${item.nodeType}.${item.nodeId}.${item.field}`);
            const value = item.value;
            const result = await this.eq(paramValue, value, item.condition);
            eqResult.push({
                result: result,
                operator: item.operator,
            });
        }
        const result = await this.result(eqResult);
        context.set(`${this.getPrefix()}.result`, result, 'output');
        const nextIds = await this.nextNode(context.getFlowGraph(), result);
        return {
            success: true,
            result,
            next: nextIds,
        };
    }
    /**
     * 获取输入参数
     * @returns
     */
    getInputParams(context) {
        const { IF } = this.config.options;
        const datas = context.getData('output');
        const params = {};
        for (const item of IF) {
            const paramValue = datas.get(`${item.nodeType}.${item.nodeId}.${item.field}`);
            const node = this.context
                .getFlowGraph()
                .nodes.find(e => e.id == item.nodeId);
            if (node) {
                params[`${node.label}.${item.field}`] = paramValue;
            }
        }
        return params;
    }
    /**
     * 下一个节点ID
     * @param flowGraph
     * @param result
     * @returns
     */
    async nextNode(flowGraph, result) {
        // 找到所有的线
        const edges = flowGraph.edges.filter(edge => edge.source == this.id);
        // 找到所有线中sourceHandle为 source-if 或 source-else 的线
        const edgesFilter = edges.filter(edge => edge.sourceHandle == (result ? 'source-if' : 'source-else'));
        const nexts = flowGraph.nodes.filter(node => edgesFilter.some(edge => edge.target == node.id));
        return nexts.map(e => ({
            id: e.id,
            type: e.type,
        }));
    }
    /**
     * 结果
     * @param eqResult
     */
    async result(eqResult) {
        let result = null;
        for (const item of eqResult) {
            if (result == null) {
                result = item.result;
                continue;
            }
            if (item.operator == 'AND') {
                result = result && item.result;
            }
            else {
                result = result || item.result;
            }
        }
        return result;
    }
    /**
     * 对比
     * @param paramValue
     * @param value
     * @param condition
     * @returns
     */
    async eq(paramValue, value, condition) {
        const method = await this.conditonMethod(condition);
        return method(paramValue, value);
    }
    /**
     * 将条件转为 lodash 具体方法
     * @param condition
     */
    async conditonMethod(condition) {
        return methods[condition];
    }
};
exports.NodeJudge = NodeJudge;
exports.NodeJudge = NodeJudge = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeJudge);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2p1ZGdlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUEyRDtBQUMzRCw0Q0FBNkM7QUFFN0MsNEJBQTRCO0FBdUM1QixVQUFVO0FBQ1YsTUFBTSxPQUFPLEdBQUc7SUFDZCxTQUFTO0lBQ1QsT0FBTyxFQUFFLENBQUMsVUFBa0IsRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztJQUM3RSxVQUFVO0lBQ1YsT0FBTyxFQUFFLENBQUMsVUFBa0IsRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUM3QyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztJQUNoQyxVQUFVO0lBQ1YsU0FBUyxFQUFFLENBQUMsVUFBa0IsRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUMvQyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7SUFDakMsVUFBVTtJQUNWLE9BQU8sRUFBRSxDQUFDLFVBQWtCLEVBQUUsS0FBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7SUFDN0UsU0FBUztJQUNULEtBQUssRUFBRSxDQUFDLFVBQWtCLEVBQUUsS0FBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7SUFDMUUsVUFBVTtJQUNWLFFBQVEsRUFBRSxDQUFDLFVBQWtCLEVBQUUsS0FBYSxFQUFFLEVBQUUsQ0FDOUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7SUFDL0IsU0FBUztJQUNULFdBQVcsRUFBRSxDQUFDLFVBQWtCLEVBQUUsS0FBYSxFQUFFLEVBQUUsQ0FB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