"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowContext = void 0;
/**
 * 上下文
 */
class FlowContext {
    constructor() {
        /** 是否取消 */
        this.cancelled = false;
        /** 是否调试 */
        this.debug = false;
        /** 是否内部调用 */
        this.internal = false;
        /** 运行情况 */
        this.nodeRunInfo = new Map();
        /** 取消监听 */
        this.cancelListeners = [];
        // 存储输入输出数据
        this.data = {
            input: new Map(),
            output: new Map(),
            result: new Map(),
        };
        // 请求参数
        this.requestParams = {};
        // 调试单个节点
        this.debugOne = false;
        // 统计
        this.count = {
            // token使用量
            tokenUsage: 0,
        };
        // 执行信息
        this.flowNodeExec = {
            current: null,
            prev: null,
            next: null,
            nextList: [],
        };
        // 是否流式调用
        this.stream = false;
    }
    /**
     * 设置流程结果
     * @param flowResult
     */
    setFlowResult(flowResult) {
        this.flowResult = flowResult;
    }
    /**
     * 获得流程结果
     * @returns
     */
    getFlowResult() {
        return this.flowResult;
    }
    /**
     * 设置是否内部调用
     * @param internal
     */
    setInternal(internal) {
        this.internal = internal;
    }
    /**
     * 是否内部调用
     * @returns
     */
    isInternal() {
        return this.internal;
    }
    /**
     * 设置开始时间
     * @param startTime
     */
    setStartTime(startTime) {
        this.startTime = startTime;
    }
    /**
     * 获得开始时间
     * @returns
     */
    getStartTime() {
        return this.startTime;
    }
    /**
     * 设置节点运行情况
     * @param nodeId
     * @param info
     */
    setNodeRunInfo(nodeId, info) {
        this.nodeRunInfo.set(nodeId, info);
    }
    /**
     * 获取节点运行情况
     * @param nodeId
     * @returns
     */
    getNodeRunInfo(nodeId) {
        return this.nodeRunInfo.get(nodeId);
    }
    isDebug() {
        return this.debug;
    }
    setDebug(debug) {
        this.debug = debug;
    }
    /**
     * 设置会话ID
     * @param sessionId
     */
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
    /**
     * 获得会话ID
     * @returns
     */
    getSessionId() {
        return this.sessionId;
    }
    /**
     * 设置请求ID
     * @param requestId
     */
    setRequestId(requestId) {
        this.requestId = requestId;
    }
    /**
     * 获得请求ID
     * @returns
     */
    getRequestId() {
        return this.requestId;
    }
    /**
     * 添加取消监听
     * @param listener
     */
    addCancelListener(listener) {
        this.cancelListeners.push(listener);
    }
    /**
     * 移除取消监听
     * @param listener
     */
    removeCancelListener(listener) {
        const index = this.cancelListeners.indexOf(listener);
        if (index !== -1) {
            this.cancelListeners.splice(index, 1);
        }
    }
    setCancelled(cancelled) {
        this.cancelled = cancelled;
        if (cancelled) {
            for (const listener of this.cancelListeners) {
                listener();
            }
        }
    }
    isCancelled() {
        return this.cancelled;
    }
    /**
     * 设置调试单个节点
     * @param debugOne
     */
    setDebugOne(debugOne) {
        this.debugOne = debugOne;
    }
    /**
     * 是否调试单个节点
     * @returns
     */
    isDebugOne() {
        return this.debugOne;
    }
    /**
     * 更新统计
     * @param key
     * @param increment
     */
    updateCount(key, increment) {
        this.count[key] += increment;
    }
    /**
     * 获取统计
     * @returns
     */
    getCount() {
        return this.count;
    }
    /**
     * 设置流式调用
     * @param stream
     */
    setStream(stream) {
        this.stream = stream;
    }
    /**
     * 是否流式调用
     * @returns
     */
    isStream() {
        return this.stream;
    }
    /**
     * 设置请求参数
     * @param params
     */
    setRequestParams(params) {
        this.requestParams = params;
    }
    /**
     * 获得请求参数
     * @returns
     */
    getRequestParams() {
        return this.requestParams;
    }
    /**
     * 设置执行信息
     * @param flowNodeExec
     */
    setFlowNodeExec(flowNodeExec) {
        this.flowNodeExec = flowNodeExec;
    }
    /**
     * 获取执行信息
     * @returns
     */
    getFlowNodeExec() {
        return this.flowNodeExec;
    }
    /**
     * 设置流程图
     * @param flowGraph
     */
    setFlowGraph(flowGraph) {
        this.flowGraph = flowGraph;
    }
    /**
     * 获取流程图
     * @returns
     */
    getFlowGraph() {
        return this.flowGraph;
    }
    /**
     * 设置数据
     * @param key 键
     * @param value 值
     * @param type 类型
     */
    set(key, value, type = 'input') {
        this.data[type].set(key, value);
    }
    /**
     * 获取数据
     * @param key
     * @returns
     */
    get(key, type = 'input') {
        return this.data[type].get(key);
    }
    /**
     * 获取所有输入数据
     * @returns
     */
    getData(type) {
        return type ? this.data[type] : this.data;
    }
}
exports.FlowContext = FlowContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvcnVubmVyL2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBZ0ZBOztHQUVHO0FBQ0gsTUFBYSxXQUFXO0lBQXhCO1FBS0UsV0FBVztRQUNILGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDbkMsV0FBVztRQUNILFVBQUssR0FBWSxLQUFLLENBQUM7UUFDL0IsYUFBYTtRQUNMLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDbEMsV0FBVztRQUNILGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBVTFCLENBQUM7UUFrRkosV0FBVztRQUNILG9CQUFlLEdBQW1CLEVBQUUsQ0FBQztRQWtFN0MsV0FBVztRQUNILFNBQUksR0FBb0I7WUFDOUIsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFO1lBQ2hCLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRTtZQUNqQixNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUU7U0FDbEIsQ0FBQztRQUVGLE9BQU87UUFDQyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUUzQixTQUFTO1FBQ0QsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUV6QixLQUFLO1FBQ0csVUFBSyxHQUFHO1lBQ2QsV0FBVztZQUNYLFVBQVUsRUFBRSxDQUFDO1NBQ2QsQ0FBQztRQUVGLE9BQU87UUFDQyxpQkFBWSxHQUFpQjtZQUNuQyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFLRixTQUFTO1FBQ0QsV0FBTSxHQUFHLEtBQUssQ0FBQztJQTRJekIsQ0FBQztJQTNUQzs7O09BR0c7SUFDSCxhQUFhLENBQUMsVUFBZTtRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsYUFBYTtR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