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
exports.NodeClassify = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
const prompts_1 = require("@langchain/core/prompts");
const config_1 = require("../../service/config");
const model_1 = require("../llm/model");
const core_2 = require("@cool-midway/core");
/**
 * 分类器
 */
let NodeClassify = class NodeClassify extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     * @returns
     */
    async run(context) {
        var _a;
        const { model, types } = this.config.options;
        const config = await this.flowConfigService.getOptions(model.configId);
        const params = this.inputParams;
        const llm = await this.getModel(model.supplier, {
            ...model.params,
            ...config.comm,
        });
        const prompt = await this.getPrompt(types);
        const chain = prompt.pipe(llm);
        const res = await chain.invoke({
            content: params.content,
            format: '{ "index": "数字类型，分类的序号，如：0" }',
        });
        const result = this.extractJSON(res.content);
        context.set(`${this.getPrefix()}.index`, result.index, 'output');
        context.set(`${this.getPrefix()}.content`, types[result.index], 'output');
        const nextNode = await this.nextNode(result.index, context.getFlowGraph());
        // 更新计数器
        context.updateCount('tokenUsage', ((_a = res.response_metadata.tokenUsage) === null || _a === void 0 ? void 0 : _a.totalTokens) || 0);
        return {
            success: true,
            result: {
                index: result.index,
                content: types[result.index],
            },
            next: nextNode,
        };
    }
    /**
     * 获得提示模板
     * @param content
     * @returns
     */
    async getPrompt(types) {
        // 转换格式
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            [
                'system',
                `根据用户的问题，从下面分类中选择一个，并按照JSON格式 {format} 返回给我。
        序号${types
                    .map((content, index) => `${index}. ${content}`)
                    .join('\n')}`,
            ],
            ['human', '{content}'],
        ]);
        return prompt;
    }
    /**
     * 获得模型
     * @param name 名称
     * @param options 配置
     * @returns
     */
    async getModel(name, options) {
        const LLM = await this.nodeLLMModel.getModel(name);
        // @ts-ignore
        return new LLM(options);
    }
    /**
     * 从文本中提取JSON字符串，并尝试解析为对象
     * @param str 待提取的文本
     * @returns 对象
     */
    extractJSON(str) {
        try {
            // 使用正则表达式匹配JSON字符串
            const jsonRegex = /\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g;
            const jsonStrings = str.match(jsonRegex);
            const result = jsonStrings ? jsonStrings : null;
            return JSON.parse(result);
        }
        catch (e) {
            throw new core_2.CoolCommException('JSON解析失败');
        }
    }
    /**
     * 下一个节点ID
     * @param index
     * @param flowGraph
     */
    async nextNode(index, flowGraph) {
        // 找到所有的线
        const edges = flowGraph.edges.filter(edge => edge.source == this.id);
        // 找到所有线中sourceHandle为index的线
        const edgesFilter = edges.filter(edge => edge.sourceHandle == `source-${index}`);
        const nexts = flowGraph.nodes.filter(node => edgesFilter.some(edge => edge.target == node.id));
        return nexts.map(e => ({
            id: e.id,
            type: e.type,
        }));
    }
};
exports.NodeClassify = NodeClassify;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", model_1.NodeLLMModel)
], NodeClassify.prototype, "nodeLLMModel", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", config_1.FlowConfigService)
], NodeClassify.prototype, "flowConfigService", void 0);
exports.NodeClassify = NodeClassify = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeClassify);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2NsYXNzaWZ5L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtRTtBQUNuRSw0Q0FBNkM7QUFHN0MscURBQTZEO0FBQzdELGlEQUF5RDtBQUN6RCx3Q0FBNEM7QUFFNUMsNENBQXNEO0FBRXREOztHQUVHO0FBR0ksSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBYSxTQUFRLGVBQVE7SUFPeEM7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBb0I7O1FBQzVCLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDN0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzlDLEdBQUcsS0FBSyxDQUFDLE1BQU07WUFDZixHQUFHLE1BQU0sQ0FBQyxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzdCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztZQUN2QixNQUFNLEVBQUUsK0JBQStCO1NBQ3hDLENBQUMsQ0FBQztRQUNILE1BQU0sTUFB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