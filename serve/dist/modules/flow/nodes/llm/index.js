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
exports.NodeLLM = void 0;
const core_1 = require("@cool-midway/core");
const messages_1 = require("@langchain/core/messages");
const prompts_1 = require("@langchain/core/prompts");
const core_2 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
const stream_1 = require("../../runner/stream");
const config_1 = require("../../service/config");
const data_1 = require("../../service/data");
const model_1 = require("./model");
const parse_1 = require("./parse");
const tools_1 = require("../tools");
const agents_1 = require("langchain/agents");
const _ = require("lodash");
const log_1 = require("../../service/log");
const mcp_1 = require("../mcp");
const multi_1 = require("../../../know/loader/multi");
const path = require("path");
const os = require("os");
prompts_1.DEFAULT_PARSER_MAPPING['f-string'] = parse_1.customParseFString;
prompts_1.DEFAULT_FORMATTER_MAPPING['f-string'] = parse_1.interpolateFString;
/**
 * LLM大模型节点
 */
let NodeLLM = class NodeLLM extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     */
    async run(context) {
        var _a, _b;
        let { model, messages, history, isOutput, toolConfig, mcpConfig } = this.config.options;
        const config = await this.flowConfigService.getOptions(model.configId);
        let llm = await this.getModel(model.supplier, {
            ...model.params,
            ...config.comm,
        });
        const params = this.inputParams;
        const prompt = await this.getPrompt(messages, context, params, history);
        let chain, isTool = false;
        if (llm['bindTools'] && ((toolConfig === null || toolConfig === void 0 ? void 0 : toolConfig.length) || (mcpConfig === null || mcpConfig === void 0 ? void 0 : mcpConfig.length))) {
            isTool = true;
            const tools = await this.getTools(toolConfig);
            const mcpTools = await this.getMcpTools(mcpConfig);
            tools.push(...mcpTools);
            const agent = (0, agents_1.createToolCallingAgent)({
                llm,
                tools,
                prompt,
                streamRunnable: true,
            });
            chain = new agents_1.AgentExecutor({
                agent,
                tools,
            });
        }
        else {
            chain = prompt.pipe(llm);
        }
        let stream = new stream_1.FlowStream();
        let res;
        let text = '';
        if (context.isStream()) {
            const _stream = await (isTool
                ? chain.streamEvents(params, { version: 'v2' })
                : chain.stream(params));
            const content = [];
            const save = async () => {
                var _a, _b, _c, _d;
                let toolNames = [];
                // 处理流式输出的通用函数
                const handleStreamOutput = (chunk) => {
                    var _a;
                    const text = chunk.content;
                    const thinking = (_a = chunk.additional_kwargs) === null || _a === void 0 ? void 0 : _a.reasoning_content;
                    if (thinking && isOutput) {
                        context.streamOutput({
                            isEnd: false,
                            content: thinking,
                            isThinking: true,
                            nodeId: this.id,
                        });
                    }
                    if (text) {
                        if (toolNames.length > 0) {
                            for (const toolName of toolNames) {
                                context.toolOutput &&
                                    context.toolOutput(toolName, 'end', this.id);
                            }
                            toolNames = [];
                        }
                        content.push(text);
                        stream.push(text);
                        if (isOutput) {
                            context.streamOutput({
                                isEnd: false,
                                content: text,
                                isThinking: false,
                                nodeId: this.id,
                            });
                        }
                    }
                };
                // 流式输出
                for await (const chunk of _stream) {
                    const { event, data } = chunk;
                    if ((_a = chunk.usage_metadata) === null || _a === void 0 ? void 0 : _a.total_tokens) {
                        context.updateCount('tokenUsage', ((_b = chunk.usage_metadata) === null || _b === void 0 ? void 0 : _b.total_tokens) || 0);
                    }
                    if (event == 'on_parser_end') {
                        context.updateCount('tokenUsage', ((_d = (_c = data === null || data === void 0 ? void 0 : data.input) === null || _c === void 0 ? void 0 : _c.usage_metadata) === null || _d === void 0 ? void 0 : _d.total_tokens) || 0);
                    }
                    if (isTool) {
                        // 工具调用开始
                        if (event == 'on_tool_start') {
                            if (!toolNames.includes(chunk.name)) {
                                toolNames.push(chunk.name);
                            }
                            context.toolOutput &&
                                context.toolOutput(chunk.name, 'start', this.id);
                        }
                        // 工具调用结束
                        if (event == 'on_tool_end') {
                            // 去除toolNames中的chunk.name
                            toolNames = toolNames.filter(item => item !== chunk.name);
                            context.toolOutput &&
                                context.toolOutput(chunk.name, 'end', this.id);
                        }
                        // LLM流式输出
                        if (event === 'on_chat_model_stream' && (data === null || data === void 0 ? void 0 : data.chunk)) {
                            handleStreamOutput(data.chunk);
                        }
                    }
                    else {
                        handleStreamOutput(chunk);
                    }
                }
                stream.push(null);
                // 保存历史
                text = content.join('');
                this.saveHistory(messages, context, history, text, prompt);
                context.streamOutput({
                    isEnd: true,
                    content: '',
                    isThinking: false,
                    nodeId: this.id,
                });
                context.set(`${this.getPrefix()}.text`, text, 'output');
            };
            await save();
        }
        else {
            res = await chain.invoke(params);
            // 保存历史
            this.saveHistory(messages, context, history, res === null || res === void 0 ? void 0 : res.content, prompt);
            text = isTool ? res === null || res === void 0 ? void 0 : res.output : res === null || res === void 0 ? void 0 : res.content;
        }
        context.set(`${this.getPrefix()}.text`, text, 'output');
        context.set(`${this.getPrefix()}.stream`, stream, 'output');
        context.updateCount('tokenUsage', ((_b = (_a = res === null || res === void 0 ? void 0 : res.response_metadata) === null || _a === void 0 ? void 0 : _a.tokenUsage) === null || _b === void 0 ? void 0 : _b.totalTokens) || 0);
        return {
            success: true,
            // stream,
            result: {
                text: text || (res === null || res === void 0 ? void 0 : res.content),
            },
        };
    }
    /**
     * 获得提示模板
     * @param messages
     * @returns
     */
    async getPrompt(messages, context, params, history = 0) {
        const type = {
            system: 'system',
            user: 'human',
            placeholder: 'placeholder',
            assistant: 'ai',
        };
        const imageMessage = await this.getImageMessage();
        const fileContent = await this.getFileContent();
        params['fileContent'] = fileContent;
        let prompt;
        if (history) {
            const objectId = context.getSessionId();
            if (!objectId) {
                throw new core_1.CoolCommException('需要保存历史信息，请求参数必须包含sessionId');
            }
            // 取出历史
            const historyMessages = (await this.flowDataService.get(this.flowId, objectId)) || [];
            prompt = prompts_1.ChatPromptTemplate.fromMessages([
                [type[messages[0].role], messages[0].content],
                ['placeholder', '{chat_history}'],
                // @ts-ignore
                ...messages
                    .filter(item => item.role != 'system')
                    .map(item => {
                    if (item.role == 'user' && !_.isEmpty(imageMessage)) {
                        return new messages_1.HumanMessage({
                            content: [
                                {
                                    type: 'text',
                                    text: item.content + '{fileContent}',
                                },
                                ...imageMessage,
                            ],
                        });
                    }
                    return [type[item.role], item.content + '{fileContent}'];
                }),
                // @ts-ignore
                ['placeholder', '{agent_scratchpad}'],
            ]);
            params['chat_history'] = historyMessages.map(item => {
                return item.role == 'user'
                    ? new messages_1.HumanMessage({ content: item.content })
                    : new messages_1.AIMessage({ content: item.content });
                // : new HumanMessage({
                //     content: [
                //       {
                //         type: 'text',
                //         text: item.content,
                //       },
                //       ...imageMessage,
                //     ],
                //   })
            });
        }
        else {
            const _messages = messages.map(item => {
                if (item.role == 'user' && !_.isEmpty(imageMessage)) {
                    return new messages_1.HumanMessage({
                        content: [
                            {
                                type: 'text',
                                text: item.content + '{fileContent}',
                            },
                            ...imageMessage,
                        ],
                    });
                }
                return [type[item.role], item.content + '{fileContent}'];
            });
            _messages.push(['placeholder', '{agent_scratchpad}']);
            prompt = prompts_1.ChatPromptTemplate.fromMessages(_messages);
        }
        return prompt;
    }
    /**
     * 获得文件消息
     * @returns
     */
    async getFileContent() {
        const fileParams = this.fileParams;
        if (_.isEmpty(fileParams))
            return '';
        const gets = [];
        const fileContent = async (url) => {
            const download = require('download');
            const fs = require('fs');
            const crypto = require('crypto');
            // 从URL中获取文件扩展名
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            const ext = path.extname(pathname) || '.txt';
            // 创建临时文件名
            const tempFileName = path.join(os.tmpdir(), `${crypto.randomBytes(6).toString('hex')}${ext}`);
            try {
                // 下载文件到临时目录
                const data = await download(encodeURI(url));
                fs.writeFileSync(tempFileName, data);
                // 加载文件内容
                const docs = await this.knowMultiLoader.load(tempFileName);
                return docs.map(item => item.pageContent)[0];
            }
            finally {
                // 删除临时文件
                if (fs.existsSync(tempFileName)) {
                    fs.unlinkSync(tempFileName);
                }
            }
        };
        Object.keys(fileParams).forEach(key => {
            for (const url of fileParams[key]) {
                gets.push(fileContent(url));
            }
        });
        const fileContents = await Promise.all(gets);
        return (`uploaded document content(ignore if empty or invalid): ` +
            fileContents.map((item, index) => `${index}. ${item}`).join(`\n\n`));
    }
    /**
     * 获得图片消息
     * @returns
     */
    async getImageMessage() {
        const imageParams = this.imageParams;
        if (_.isEmpty(imageParams))
            return [];
        const toBase64 = async (url) => {
            const download = require('download');
            const data = await download(url);
            return Buffer.from(data).toString('base64');
        };
        const gets = [];
        Object.keys(imageParams).forEach(async (key) => {
            for (const url of imageParams[key]) {
                gets.push(toBase64(url));
            }
        });
        const data = await Promise.all(gets);
        return data.map(item => {
            return {
                type: 'image_url',
                image_url: {
                    url: `data:image/png;base64,${item}`,
                },
            };
        });
    }
    /**
     * 保存历史
     * @param messages
     * @param context
     * @param objectId
     */
    async saveHistory(messages, context, history = 0, newContent, prompt) {
        const params = this.inputParams;
        const objectId = context.getSessionId();
        if (!objectId || !history)
            return;
        const historyMessages = (await this.flowDataService.get(this.flowId, objectId)) || [];
        const lastMessage = messages.filter(item => item.role === 'user').pop();
        const userContent = await prompts_1.PromptTemplate.fromTemplate(lastMessage.content).invoke(params);
        const userMessage = {
            role: 'user',
            content: userContent.value,
        };
        const newMessages = historyMessages
            .concat(userMessage)
            .concat({ role: 'assistant', content: newContent });
        const totalLength = newMessages.length;
        if (totalLength > history) {
            newMessages.splice(0, totalLength - history);
        }
        await this.flowDataService.set(this.flowId, objectId, newMessages);
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
     * 获得工具
     * @param toolConfig
     * @returns
     */
    async getTools(toolConfig) {
        const tools = [];
        for (const item of toolConfig) {
            const config = await this.flowConfigService.getOptions(item.id);
            const tool = await this.nodeTool.getTool(item.key);
            tools.push(tool({
                ...config,
                ...item.options,
            }));
        }
        return tools;
    }
    /**
     * 获得MCP工具
     * @param mcpConfig
     * @returns
     */
    async getMcpTools(mcpConfig) {
        const tools = [];
        if (!mcpConfig)
            return tools;
        for (const item of mcpConfig) {
            const config = await this.flowConfigService.getConfig(item.id);
            const client = await this.nodeMCP.getMCP(config.name);
            const _tools = client.getTools();
            tools.push(..._tools);
        }
        return tools;
    }
};
exports.NodeLLM = NodeLLM;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", model_1.NodeLLMModel)
], NodeLLM.prototype, "nodeLLMModel", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", tools_1.NodeTool)
], NodeLLM.prototype, "nodeTool", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", mcp_1.NodeMCP)
], NodeLLM.prototype, "nodeMCP", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", config_1.FlowConfigService)
], NodeLLM.prototype, "flowConfigService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", data_1.FlowDataService)
], NodeLLM.prototype, "flowDataService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", log_1.FlowLogService)
], NodeLLM.prototype, "flowLogService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", multi_1.KnowMultiLoader)
], NodeLLM.prototype, "knowMultiLoader", void 0);
exports.NodeLLM = NodeLLM = __decorate([
    (0, core_2.Provide)(),
    (0, core_2.Scope)(core_2.ScopeEnum.Prototype)
], NodeLLM);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2xsbS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBc0Q7QUFFdEQsdURBQW1FO0FBQ25FLHFEQUtpQztBQUVqQyx5Q0FBbUU7QUFFbkUsNENBQTZDO0FBQzdDLGdEQUFpRDtBQUNqRCxpREFBeUQ7QUFDekQsNkNBQXFEO0FBQ3JELG1DQUF1QztBQUN2QyxtQ0FBaUU7QUFDakUsb0NBQW9DO0FBQ3BDLDZDQUF5RTtBQUN6RSw0QkFBNEI7QUFDNUIsMkNBQW1EO0FBQ25ELGdDQUFpQztBQUVqQyxzREFBNkQ7QUFDN0QsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QixnQ0FBc0IsQ0FBQyxVQUFVLENBQUMsR0FBRywwQkFBa0IsQ0FBQztBQUN4RCxtQ0FBeUIsQ0FBQyxVQUFVLENBQUMsR0FBRywwQkFBa0IsQ0FBQztBQVUzRDs7R0FFRztBQUdJLElBQU0sT0FBTyxHQUFiLE1BQU0sT0FBUSxTQUFRLGVBQVE7SUFzQm5DOzs7T0FHRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBb0I7O1FBQzVCLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN0QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzVDLEdBQUcsS0FBSyxDQUFDLE1BQU07WUFDZixHQUFHLE1BQU0sQ0FBQyxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gs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