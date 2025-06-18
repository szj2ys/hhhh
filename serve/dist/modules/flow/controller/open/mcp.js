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
exports.OpenFlowMcpControllerController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const stream_1 = require("stream");
const uuid_1 = require("uuid");
const server_1 = require("../../mcp/server");
/**
 * MCP服务
 */
let OpenFlowMcpControllerController = class OpenFlowMcpControllerController extends core_1.BaseController {
    async sse(label) {
        // 设置响应头
        this.ctx.set('Content-Type', 'text/event-stream');
        this.ctx.set('Cache-Control', 'no-cache');
        this.ctx.set('Connection', 'keep-alive');
        const resStream = new stream_1.PassThrough();
        // 发送数据
        const write = (content) => {
            resStream.write(content);
        };
        const sessionId = (0, uuid_1.v4)();
        const { transport, server } = await this.flowMcpServer.get(label, sessionId, {
            write,
            writeHead: (code, headers) => {
                this.ctx.res.writeHead(code, headers);
            },
            on: this.ctx.res.on,
        });
        await server.connect(transport);
        // 保持连接
        const hb = setInterval(() => {
            write(`event: heartbeat\ndata: ${Date.now()}\n\n`);
        }, 10000);
        this.ctx.req.on('close', () => {
            clearInterval(hb);
            this.coolEventManager.emit('mcp.remove', sessionId);
        });
        this.ctx.status = 200;
        this.ctx.body = resStream;
    }
    async message(sessionId, label, body) {
        await this.coolEventManager.emit('mcp.messages', this.ctx, {
            sessionId,
            label,
            body,
        });
    }
};
exports.OpenFlowMcpControllerController = OpenFlowMcpControllerController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], OpenFlowMcpControllerController.prototype, "ctx", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", server_1.FlowMcpServer)
], OpenFlowMcpControllerController.prototype, "flowMcpServer", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", core_1.CoolEventManager)
], OpenFlowMcpControllerController.prototype, "coolEventManager", void 0);
__decorate([
    (0, core_2.Get)('/sse/:label', { summary: 'SSE连接' }),
    __param(0, (0, core_2.Param)('label')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OpenFlowMcpControllerController.prototype, "sse", null);
__decorate([
    (0, core_2.Post)('/messages/:label/:sessionId', { summary: '处理消息' }),
    __param(0, (0, core_2.Param)('sessionId')),
    __param(1, (0, core_2.Param)('label')),
    __param(2, (0, core_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OpenFlowMcpControllerController.prototype, "message", null);
exports.OpenFlowMcpControllerController = OpenFlowMcpControllerController = __decorate([
    (0, core_2.Controller)('/mcp')
], OpenFlowMcpControllerController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9jb250cm9sbGVyL29wZW4vbWNwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFxRTtBQUNyRSx5Q0FBNEU7QUFFNUUsbUNBQXFDO0FBQ3JDLCtCQUFvQztBQUNwQyw2Q0FBaUQ7QUFFakQ7O0dBRUc7QUFFSSxJQUFNLCtCQUErQixHQUFyQyxNQUFNLCtCQUFnQyxTQUFRLHFCQUFjO0lBVzNELEFBQU4sS0FBSyxDQUFDLEdBQUcsQ0FBaUIsS0FBYTtRQUNyQyxRQUFRO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztRQUVwQyxPQUFPO1FBQ1AsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtZQUNoQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUNGLE1BQU0sU0FBUyxHQUFHLElBQUEsU0FBTSxHQUFFLENBQUM7UUFDM0IsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUN4RCxLQUFLLEVBQ0wsU0FBUyxFQUNUO1lBQ0UsS0FBSztZQUNMLFNBQVMsRUFBRSxDQUFDLElBQVksRUFBRSxPQUErQixFQUFFLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUNELEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1NBQ3BCLENBQ0YsQ0FBQztRQUNGLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxPQUFPO1FBQ1AsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUMxQixLQUFLLENBQUMsMkJBQTJCLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDNUIsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsT0FBTyxDQUNTLFNBQWlCLEVBQ3JCLEtBQWEsRUFDckIsSUFBUztRQUVqQixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDekQsU0FBUztZQUNULEtBQUs7WUFDTCxJQUFJO1NBQ0wsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUE3RFksMEVBQStCO0FBRTFDO0lBREMsSUFBQSxhQUFNLEdBQUU7OzREQUNJO0FBR2I7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTSxzQkFBYTtzRUFBQztBQUc3QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNTLHVCQUFnQjt5RUFBQztBQUc3QjtJQURMLElBQUEsVUFBRyxFQUFDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUM5QixXQUFBLElBQUEsWUFBSyxFQUFDLE9BQU8sQ0FBQyxDQUFBOzs7OzBEQW9DeEI7QUFHSztJQURMLElBQUEsV0FBSSxFQUFDLDZCQUE2QixFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBRXRELFdBQUEsSUFBQSxZQUFLLEVBQUMsV0FBVyxDQUFDLENBQUE7SUFDbEIsV0FBQSxJQUFBLFlBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxXQUFJLEdBQUUsQ0FBQTs7Ozs4REFPUjswQ0E1RFUsK0JBQStCO0lBRDNDLElBQUEsaUJBQVUsRUFBQyxNQUFNLENBQUM7R0FDTiwrQkFBK0IsQ0E2RDNDIn0=