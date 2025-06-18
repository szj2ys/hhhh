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
exports.AdminFlowRunController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const stream_1 = require("stream");
const run_1 = require("../../service/run");
const context_1 = require("../../runner/context");
const uuid_1 = require("uuid");
/**
 * 流程运行
 */
let AdminFlowRunController = class AdminFlowRunController extends core_1.BaseController {
    async debug(params, label, requestId, sessionId, nodeId, 
    // 是否流式调用
    stream = false) {
        // 设置响应头
        this.ctx.set('Content-Type', 'text/event-stream');
        this.ctx.set('Cache-Control', 'no-cache');
        this.ctx.set('Connection', 'keep-alive');
        const resStream = new stream_1.PassThrough();
        // 上下文
        const context = new context_1.FlowContext();
        context.setRequestId(requestId || (0, uuid_1.v4)());
        // 如果需要关联上下文，则设置会话ID
        context.setSessionId(sessionId || params.objectId);
        // 发送数据
        const send = (data) => {
            resStream.write(`data:${JSON.stringify(data)}\n\n`);
        };
        // 工具输出
        context.toolOutput = (name, type, nodeId) => {
            send({
                msgType: 'tool',
                data: {
                    name: name,
                    type: type,
                    nodeId: nodeId,
                },
            });
        };
        // 流式输出
        context.streamOutput = (data) => {
            send({
                msgType: 'llmStream',
                data,
            });
        };
        // 监听响应结束
        this.ctx.res.on('close', () => {
            context.setCancelled(true);
            resStream.end();
        });
        this.flowRunService
            .debug(params, label, stream, context, nodeId, res => {
            send(res);
        })
            .then(() => {
            this.ctx.res.end();
        })
            .catch(e => {
            this.logger.error(e);
            this.ctx.res.end();
        });
        this.ctx.status = 200;
        this.ctx.body = resStream;
    }
    async invoke(params, label, requestId, sessionId, 
    // 是否流式调用
    stream = false) {
        // 上下文
        const context = new context_1.FlowContext();
        context.setRequestId(requestId || (0, uuid_1.v4)());
        context.setSessionId(sessionId || params.objectId);
        if (stream) {
            // 设置响应头
            this.ctx.set('Content-Type', 'text/event-stream');
            this.ctx.set('Cache-Control', 'no-cache');
            this.ctx.set('Connection', 'keep-alive');
            const resStream = new stream_1.PassThrough();
            // 发送数据
            const send = (data) => {
                resStream.write(`data:${JSON.stringify(data)}\n\n`);
            };
            // 工具输出
            context.toolOutput = (name, type, nodeId) => {
                send({
                    msgType: 'tool',
                    data: {
                        name: name,
                        type: type,
                        nodeId: nodeId,
                    },
                });
            };
            // 流式输出
            context.streamOutput = (data) => {
                send({
                    msgType: 'llmStream',
                    data,
                });
            };
            // 监听响应结束
            this.ctx.res.on('close', () => {
                context.setCancelled(true);
                resStream.end();
            });
            this.flowRunService
                .invoke(params, label, stream, context, res => {
                send(res);
            })
                .then(() => {
                this.ctx.res.end();
            })
                .catch(e => {
                this.logger.error(e);
                this.ctx.res.end();
            });
            this.ctx.status = 200;
            this.ctx.body = resStream;
        }
        else {
            return this.ok(await this.flowRunService.invoke(params, label, stream, context));
        }
    }
};
exports.AdminFlowRunController = AdminFlowRunController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", run_1.FlowRunService)
], AdminFlowRunController.prototype, "flowRunService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], AdminFlowRunController.prototype, "ctx", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], AdminFlowRunController.prototype, "logger", void 0);
__decorate([
    (0, core_2.Post)('/debug', { summary: '调试' }),
    __param(0, (0, core_2.Body)('params')),
    __param(1, (0, core_2.Body)('label')),
    __param(2, (0, core_2.Body)('requestId')),
    __param(3, (0, core_2.Body)('sessionId')),
    __param(4, (0, core_2.Body)('nodeId')),
    __param(5, (0, core_2.Body)('stream')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminFlowRunController.prototype, "debug", null);
__decorate([
    (0, core_2.Post)('/invoke', { summary: '调用' }),
    __param(0, (0, core_2.Body)('params')),
    __param(1, (0, core_2.Body)('label')),
    __param(2, (0, core_2.Body)('requestId')),
    __param(3, (0, core_2.Body)('sessionId')),
    __param(4, (0, core_2.Body)('stream')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminFlowRunController.prototype, "invoke", null);
exports.AdminFlowRunController = AdminFlowRunController = __decorate([
    (0, core_1.CoolController)()
], AdminFlowRunController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9jb250cm9sbGVyL2FkbWluL3J1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUseUNBQTZEO0FBQzdELG1DQUFxQztBQUNyQywyQ0FBbUQ7QUFFbkQsa0RBQW1EO0FBQ25ELCtCQUFvQztBQUVwQzs7R0FFRztBQUVJLElBQU0sc0JBQXNCLEdBQTVCLE1BQU0sc0JBQXVCLFNBQVEscUJBQWM7SUFXbEQsQUFBTixLQUFLLENBQUMsS0FBSyxDQUVPLE1BQVcsRUFFWixLQUFhLEVBRVQsU0FBaUIsRUFFakIsU0FBaUIsRUFFcEIsTUFBYztJQUM5QixTQUFTO0lBQ08sU0FBUyxLQUFLO1FBRTlCLFFBQVE7UUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXpDLE1BQU0sU0FBUyxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1FBQ3BDLE1BQU07UUFDTixNQUFNLE9BQU8sR0FBRyxJQUFJLHFCQUFXLEVBQUUsQ0FBQztRQUNsQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFBLFNBQU0sR0FBRSxDQUFDLENBQUM7UUFDNUMsb0JBQW9CO1FBQ3BCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxPQUFPO1FBQ1AsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUN6QixTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEs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