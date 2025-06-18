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
exports.NodeParse = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
const config_1 = require("../../service/config");
const model_1 = require("../llm/model");
const prompts_1 = require("@langchain/core/prompts");
/**
 * 解析器
 */
let NodeParse = class NodeParse extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     */
    async run(context) {
        var _a;
        const { outputParams } = this.config;
        const { model } = this.config.options;
        // 获得输入参数
        const params = this.inputParams;
        // 获取流程配置
        const config = await this.flowConfigService.getOptions(model.configId);
        // 获取模型
        const llm = await this.getModel(model.supplier, {
            ...model.params,
            ...config.comm,
        });
        // 获得提示配置
        const prompt = await this.getPrompt();
        const chain = prompt.pipe(llm);
        // 获得提示格式
        const format = await this.getFormat(outputParams);
        const res = await chain.invoke({
            content: `input: ${params.text} format: '{${format}}'`,
        });
        // 获取执行结果
        const extractResult = this.extractJSON(res.content);
        for (const param of outputParams) {
            if (param.field == 'result') {
                context.set(`${this.getPrefix()}.${param.field}`, extractResult, 'output');
            }
            else {
                context.set(`${this.getPrefix()}.${param.field}`, extractResult[param.field], 'output');
            }
        }
        // 更新计数器
        context.updateCount('tokenUsage', ((_a = res.response_metadata.tokenUsage) === null || _a === void 0 ? void 0 : _a.totalTokens) || 0);
        return {
            success: true,
            result: {
                ...extractResult,
                result: extractResult,
            },
        };
    }
    /**
     * 获得提示模板
     * @returns
     */
    async getPrompt() {
        // 转换格式
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            [
                'system',
                `You are now acting as an information extraction tool. When you receive any input, you need to extract the relevant information from it and output the extracted information in the requested JSON format, without replying with any other irrelevant content.`,
            ],
            ['human', '{content}'],
        ]);
        return prompt;
    }
    /**
     * 获得提示格式
     * @param outputParams // 输出参数
     * @returns
     */
    async getFormat(outputParams) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = outputParams === null || outputParams === void 0 ? void 0 : outputParams.filter(param => param.field != 'result')) === null || _a === void 0 ? void 0 : _a.map(param => `"${param.field}": "${param.type}"`)) === null || _b === void 0 ? void 0 : _b.join(',')) !== null && _c !== void 0 ? _c : '');
    }
    /**
     * 从文本中提取JSON字符串，并尝试解析为对象
     * @param str 待提取的文本
     * @returns 对象
     */
    extractJSON(str) {
        // 使用正则表达式匹配JSON字符串
        const jsonRegex = /\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g;
        const jsonStrings = str.match(jsonRegex);
        const result = jsonStrings ? jsonStrings : null;
        return JSON.parse(result);
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
};
exports.NodeParse = NodeParse;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", model_1.NodeLLMModel)
], NodeParse.prototype, "nodeLLMModel", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", config_1.FlowConfigService)
], NodeParse.prototype, "flowConfigService", void 0);
exports.NodeParse = NodeParse = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeParse);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL3BhcnNlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtRTtBQUNuRSw0Q0FBNkM7QUFHN0MsaURBQXlEO0FBQ3pELHdDQUE0QztBQUU1QyxxREFBNkQ7QUFFN0Q7O0dBRUc7QUFHSSxJQUFNLFNBQVMsR0FBZixNQUFNLFNBQVUsU0FBUSxlQUFRO0lBT3JDOzs7T0FHRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBb0I7O1FBQzVCLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUV0QyxTQUFTO1FBQ1QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVoQyxTQUFTO1FBQ1QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2RSxPQUFPO1FBQ1AsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDOUMsR0FBRyxLQUFLLENBQUMsTUFBTTtZQUNmLEdBQUcsTUFBTSxDQUFDLElBQUk7U0FDZixDQUFDLENBQUM7UUFFSCxTQUFTO1FBQ1QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQixTQUFTO1FBQ1QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xE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