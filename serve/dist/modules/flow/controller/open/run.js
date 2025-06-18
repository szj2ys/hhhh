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
exports.OpenFlowRunController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const stream_1 = require("stream");
const run_1 = require("../../service/run");
const context_1 = require("../../runner/context");
const data_1 = require("../../service/data");
const uuid_1 = require("uuid");
/**
 * 流程运行
 */
let OpenFlowRunController = class OpenFlowRunController extends core_1.BaseController {
    async invoke(params, label, requestId, sessionId, 
    // 是否流式调用
    stream = false) {
        // 上下文
        const context = new context_1.FlowContext();
        context.setRequestId(requestId || (0, uuid_1.v4)());
        // 如果需要关联上下文，则设置会话ID
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
    async historyMsg(label, objectId) {
        const history = await this.flowDataService.getByLabel(label, objectId);
        return this.ok(history);
    }
};
exports.OpenFlowRunController = OpenFlowRunController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", run_1.FlowRunService)
], OpenFlowRunController.prototype, "flowRunService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", data_1.FlowDataService)
], OpenFlowRunController.prototype, "flowDataService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], OpenFlowRunController.prototype, "ctx", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], OpenFlowRunController.prototype, "logger", void 0);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/invoke', { summary: '调用' }),
    __param(0, (0, core_2.Body)('params')),
    __param(1, (0, core_2.Body)('label')),
    __param(2, (0, core_2.Body)('requestId')),
    __param(3, (0, core_2.Body)('sessionId')),
    __param(4, (0, core_2.Body)('stream')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], OpenFlowRunController.prototype, "invoke", null);
__decorate([
    (0, core_2.Post)('/historyMsg', { summary: '历史消息' }),
    __param(0, (0, core_2.Body)('label')),
    __param(1, (0, core_2.Body)('objectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OpenFlowRunController.prototype, "historyMsg", null);
exports.OpenFlowRunController = OpenFlowRunController = __decorate([
    (0, core_1.CoolUrlTag)(),
    (0, core_1.CoolController)()
], OpenFlowRunController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9jb250cm9sbGVyL29wZW4vcnVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQU0yQjtBQUMzQix5Q0FBNkQ7QUFDN0QsbUNBQXFDO0FBQ3JDLDJDQUFtRDtBQUVuRCxrREFBbUQ7QUFDbkQsNkNBQXFEO0FBQ3JELCtCQUFvQztBQUVwQzs7R0FFRztBQUdJLElBQU0scUJBQXFCLEdBQTNCLE1BQU0scUJBQXNCLFNBQVEscUJBQWM7SUFlakQsQUFBTixLQUFLLENBQUMsTUFBTSxDQUVNLE1BQVcsRUFFWixLQUFhLEVBRVQsU0FBaUIsRUFFakIsU0FBaUI7SUFDcEMsU0FBUztJQUNPLFNBQVMsS0FBSztRQUU5QixNQUFNO1FBQ04sTUFBTSxPQUFPLEdBQUcsSUFBSSxxQkFBVyxFQUFFLENBQUM7UUFDbEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBQSxTQUFNLEdBQUUsQ0FBQyxDQUFDO1FBQzVDLG9CQUFvQjtRQUNwQixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLFFBQVE7WUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRXpDLE1BQU0sU0FBUyxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1lBRXBDLE9BQU87WUFDUCxNQUFNLElBQUksR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUN6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