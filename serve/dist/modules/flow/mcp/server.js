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
exports.FlowMcpServer = void 0;
const core_1 = require("@midwayjs/core");
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const sse_js_1 = require("@modelcontextprotocol/sdk/server/sse.js");
const info_1 = require("../service/info");
const core_2 = require("@cool-midway/core");
const zod_1 = require("zod");
const run_1 = require("../service/run");
const context_1 = require("../runner/context");
/**
 * MCP服务
 */
let FlowMcpServer = class FlowMcpServer {
    constructor() {
        this.mcps = new Map();
    }
    /**
     * 获取MCP
     * @param label 标签
     * @param sessionId 会话ID
     * @param res 响应
     * @returns
     */
    async get(label, sessionId, res) {
        const check = this.mcps.get(sessionId);
        if (!check) {
            const info = await this.flowInfoService.getByLabel(label);
            if (!info) {
                throw new core_2.CoolCommException('Flow not found');
            }
            const transport = new sse_js_1.SSEServerTransport(`/mcp/messages/${label}/${sessionId}`, res);
            const server = new mcp_js_1.McpServer({
                name: info.name,
                version: `v_${info.version}`,
            });
            const tool = await this.getTool(label);
            server.tool(tool.info.label, tool.info.description, tool.schema, async (params) => {
                const context = new context_1.FlowContext();
                context.setRequestId(sessionId);
                const result = await this.flowRunService.invoke(params, label, false, context);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result),
                        },
                    ],
                };
            });
            this.mcps.set(sessionId, { transport, server });
            return { transport, server };
        }
        return check;
    }
    /**
     * 移除MCP
     * @param sessionId 会话ID
     */
    async remove(sessionId) {
        const check = this.mcps.get(sessionId);
        if (check) {
            check.transport = null;
            check.server = null;
            this.mcps.delete(sessionId);
        }
    }
    /**
     * 处理POST消息
     * @param ctx 上下文
     * @param data 数据
     */
    async handlePostMessage(ctx, data) {
        const check = this.mcps.get(data.sessionId);
        if (check) {
            check.transport.handlePostMessage(ctx.req, ctx.res, data.body);
        }
    }
    /**
     * 获取工具
     * @param label 标签
     * @returns
     */
    async getTool(label) {
        const info = await this.flowInfoService.getByLabel(label);
        if (!info || !info.data) {
            throw new core_2.CoolCommException('流程不存在或未发布');
        }
        const graph = info.data;
        const startNode = graph.nodes.find(node => node.type === 'start');
        const inputParams = startNode.data.inputParams;
        // 转换inputParams为zod验证模式
        const zodSchema = inputParams.reduce((acc, param) => {
            // 根据类型创建相应的zod验证器
            let validator;
            switch (param.type.toLowerCase()) {
                case 'text':
                    validator = zod_1.z.string().describe(param.label);
                    break;
                case 'number':
                    validator = zod_1.z.number().describe(param.label);
                    break;
                case 'image':
                    validator = zod_1.z.string().describe(param.label);
                    break;
                default:
                    validator = zod_1.z.any().describe(param.label);
            }
            // 处理是否必填
            if (!param.required) {
                validator = validator.optional();
            }
            // 添加到验证模式对象
            acc[param.field] = validator;
            return acc;
        }, {});
        // 返回工具配置
        return {
            schema: zodSchema,
            info: {
                name: info.name,
                label: info.label,
                version: info.version,
                description: info.description || '',
            },
        };
    }
};
exports.FlowMcpServer = FlowMcpServer;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.FlowInfoService)
], FlowMcpServer.prototype, "flowInfoService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", run_1.FlowRunService)
], FlowMcpServer.prototype, "flowRunService", void 0);
exports.FlowMcpServer = FlowMcpServer = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton, { allowDowngrade: true })
], FlowMcpServer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9tY3Avc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtRTtBQUNuRSxvRUFBb0U7QUFDcEUsb0VBQTZFO0FBQzdFLDBDQUFrRDtBQUNsRCw0Q0FBc0Q7QUFDdEQsNkJBQXdCO0FBQ3hCLHdDQUFnRDtBQUNoRCwrQ0FBZ0Q7QUFFaEQ7O0dBRUc7QUFHSSxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBQW5CO1FBQ0csU0FBSSxHQUFHLElBQUksR0FBRyxFQU1uQixDQUFDO0lBeUpOLENBQUM7SUFqSkM7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FDUCxLQUFhLEVBQ2IsU0FBaUIsRUFDakIsR0FBUTtRQUtSLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNWLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLDJCQUFrQixDQUN0QyxpQkFBaUIsS0FBSyxJQUFJLFNBQVMsRUFBRSxFQUNyQyxHQUFHLENBQ0osQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQVMsQ0FBQztnQkFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7YUFDN0IsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJ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