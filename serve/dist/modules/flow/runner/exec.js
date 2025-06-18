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
exports.FlowExecutor = void 0;
const core_1 = require("@midwayjs/core");
const langgraph_1 = require("@langchain/langgraph");
const core_2 = require("@cool-midway/core");
const moment = require("moment");
const state_1 = require("./state");
const events_1 = require("events");
/**
 * 执行器
 */
let FlowExecutor = class FlowExecutor {
    setFlowGraph(flowGraph) {
        this.flowGraph = flowGraph;
    }
    setContext(context) {
        this.context = context;
    }
    setFlowNode(flowNode) {
        this.flowNode = flowNode;
    }
    /**
     * 发送回调消息
     */
    sendCallback(msgType, data) {
        this.callback && this.callback({ msgType, data });
    }
    /**
     * 执行一个节点
     * @param node
     */
    async oneNode(nodeId) {
        // 如果未提供节点ID，直接返回
        if (!nodeId)
            return;
        this.context.setDebugOne(true);
        // 查找指定的节点
        const targetNode = this.flowGraph.nodes.find(node => node.id === nodeId);
        if (!targetNode) {
            throw new core_2.CoolCommException('指定的节点不存在');
        }
        this.flowGraph.nodes = [targetNode];
        this.flowNode = [this.flowNode.find(node => node.id == nodeId)];
        return targetNode;
    }
    /**
     * 执行流程
     */
    async run(nodeId, callback) {
        var _a;
        events_1.EventEmitter.defaultMaxListeners = 100;
        const oneNode = await this.oneNode(nodeId);
        this.context.setStartTime(new Date());
        this.callback = callback;
        this.sendCallback('flow', { status: 'start' });
        // 状态
        const builder = new langgraph_1.StateGraph(state_1.FlowState);
        // 添加节点
        await this.addNode(builder, oneNode);
        // 添加边
        await this.addEdge(builder, oneNode);
        // 编译
        const graph = builder.compile();
        const tasks = [];
        const controller = new AbortController();
        this.context.addCancelListener(() => {
            controller.abort();
            controller == null;
        });
        let flowResult;
        if (this.context.isInternal()) {
            await graph.invoke({ context: this.context });
            return this.context.getFlowResult();
        }
        try {
            // 执行
            for await (const chunk of await graph.stream({ context: this.context }, {
                streamMode: 'debug',
                signal: controller.signal,
                runId: this.context.getRequestId(),
            })) {
                tasks.push(chunk);
                const nodeType = chunk.payload.name.split('-')[0];
                const nodeId = chunk.payload.name.split('-')[1];
                const status = chunk.type == 'task' ? 'running' : 'done';
                const result = this.context.get(nodeId, 'result');
                let nextNodeIds = [];
                if (status == 'done' &&
                    ['judge', 'classify'].includes(nodeType) &&
                    result) {
                    nextNodeIds = result.next.map(e => e.id);
                }
                if (chunk.type == 'task_result') {
                    flowResult = result;
                }
                this.sendCallback('node', {
                    status,
                    nodeId,
                    nodeType,
                    duration: status == 'done'
                        ? (_a = this.context.getNodeRunInfo(nodeId)) === null || _a === void 0 ? void 0 : _a.duration
                        : null,
                    result: status == 'done'
                        ? {
                            success: result.success,
                            error: result.error,
                        }
                        : {},
                    nextNodeIds,
                });
            }
            this.sendCallback('flow', {
                status: 'end',
                reason: 'success',
                duration: moment().diff(this.context.getStartTime(), 'milliseconds'),
                count: this.context.getCount(),
                result: flowResult,
            });
        }
        catch (e) {
            if (e.message == 'Aborted') {
                this.logger.warn('流程已取消');
                this.sendCallback('flow', {
                    status: 'end',
                    reason: 'cancel',
                    duration: moment().diff(this.context.getStartTime(), 'milliseconds'),
                    count: this.context.getCount(),
                });
            }
            else {
                controller.abort();
                controller == null;
                console.log('请求ID', this.context.getRequestId());
                this.logger.error(e);
                this.sendCallback('flow', {
                    status: 'end',
                    reason: 'error',
                    duration: moment().diff(this.context.getStartTime(), 'milliseconds'),
                    count: this.context.getCount(),
                });
                flowResult = {
                    success: false,
                    error: e.message,
                };
            }
        }
        finally {
            controller == null;
        }
        return flowResult;
    }
    /**
     * 添加节点
     * @param builder
     */
    async addNode(builder, oneNode) {
        if (oneNode) {
            builder.addNode(`${oneNode.type}-${oneNode.id}`, {
                fn: async (state) => {
                    const context = state.context;
                    const result = await this.flowNode[0].invoke(context);
                    context.set(oneNode.id, result, 'result');
                },
            });
            return;
        }
        // 去除judge和classify节点以及没有任何连线的节点
        for (const node of this.flowNode) {
            // 检查节点是否有连线（作为源节点或目标节点）
            const hasConnection = this.flowGraph.edges.some(edge => edge.source === node.id || edge.target === node.id);
            // 跳过没有连线的节点
            if (!hasConnection) {
                continue;
            }
            builder.addNode(`${node.type}-${node.id}`, {
                fn: async (state) => {
                    if (node.type == 'judge' || node.type == 'classify') {
                        return;
                    }
                    const context = state.context;
                    const result = await node.invoke(context);
                    context.set(node.id, result, 'result');
                    if (!result.success) {
                        throw new Error(`报错中断[${node.type}节点]：${result.error}`);
                    }
                },
            });
        }
    }
    /**
     * 添加边
     * @param builder
     */
    async addEdge(builder, oneNode) {
        if (oneNode) {
            // @ts-ignore
            builder.addEdge(langgraph_1.START, `${oneNode.type}-${oneNode.id}`);
            // @ts-ignore
            builder.addEdge(`${oneNode.type}-${oneNode.id}`, langgraph_1.END);
            return;
        }
        // 找到开始节点
        const startNode = this.flowGraph.nodes.find(node => node.type === 'start');
        if (!startNode) {
            throw new core_2.CoolCommException('开始节点不存在');
        }
        // 开始节点
        // @ts-ignore
        builder.addEdge(langgraph_1.START, `${startNode.type}-${startNode.id}`);
        // 找出条件节点
        const judgeNodes = this.flowGraph.nodes.filter(node => node.type === 'judge' || node.type === 'classify');
        for (const judgeNode of judgeNodes) {
            // 找出所有该条件节点的目标节点
            const targetNodes = this.flowGraph.edges.filter(edge => edge.source === judgeNode.id &&
                (edge.sourceType === 'judge' || edge.sourceType === 'classify'));
            builder.addConditionalEdges(
            // @ts-ignore
            `${judgeNode.type}-${judgeNode.id}`, async (state) => {
                const node = this.flowNode.find(node => node.id === judgeNode.id);
                const context = state.context;
                const result = await node.invoke(context);
                context.set(node.id, result, 'result');
                if (!result.success) {
                    throw new core_2.CoolCommException(result.error.message);
                }
                return result.next.map(e => `${e.type}-${e.id}`);
            }, targetNodes.map(node => `${node.targetType}-${node.target}`));
        }
        // 过滤掉judge和classify节点
        const edges = this.flowGraph.edges.filter(edge => edge.sourceType !== 'judge' && edge.sourceType !== 'classify');
        for (const edge of edges) {
            builder.addEdge(
            // @ts-ignore
            `${edge.sourceType}-${edge.source}`, `${edge.targetType}-${edge.target}`);
        }
        // 找出所有的结束节点
        const endNodes = this.flowGraph.nodes.filter(node => node.type === 'end');
        for (const endNode of endNodes) {
            // @ts-ignore
            builder.addEdge(`${endNode.type}-${endNode.id}`, langgraph_1.END);
        }
    }
};
exports.FlowExecutor = FlowExecutor;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], FlowExecutor.prototype, "logger", void 0);
exports.FlowExecutor = FlowExecutor = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], FlowExecutor);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvcnVubmVyL2V4ZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTRFO0FBRTVFLG9EQUE4RDtBQUU5RCw0Q0FBc0Q7QUFDdEQsaUNBQWlDO0FBQ2pDLG1DQUFvQztBQUNwQyxtQ0FBc0M7QUFFdEM7O0dBRUc7QUFHSSxJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFZO0lBY3ZCLFlBQVksQ0FBQyxTQUFvQjtRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQW9CO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBb0I7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ssWUFBWSxDQUFDLE9BQXdCLEVBQUUsSUFBUztRQUN0RCxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFjO1FBQzFCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsVUFBVTtRQUNWLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hCLE1B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