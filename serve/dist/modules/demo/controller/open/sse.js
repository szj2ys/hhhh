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
exports.OpenDemoSSEController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const info_1 = require("../../../plugin/service/info");
const stream_1 = require("stream");
/**
 * 事件流 服务端主动推送
 */
let OpenDemoSSEController = class OpenDemoSSEController extends core_1.BaseController {
    async call() {
        // 设置响应头
        this.ctx.set('Content-Type', 'text/event-stream');
        this.ctx.set('Cache-Control', 'no-cache');
        this.ctx.set('Connection', 'keep-alive');
        const stream = new stream_1.PassThrough();
        // 发送数据
        const send = (data) => {
            stream.write(`data: ${JSON.stringify(data)}\n\n`);
        };
        // 获取插件实例
        const instance = await this.pluginService.getInstance('ollama');
        // 调用chat
        const messages = [
            { role: 'system', content: '你叫小酷，是个编程助手' },
            { role: 'user', content: '用js写个Hello World' },
        ];
        instance.chat(messages, { stream: true }, res => {
            send(res);
            if (res.isEnd) {
                this.ctx.res.end();
            }
        });
        this.ctx.status = 200;
        this.ctx.body = stream;
    }
};
exports.OpenDemoSSEController = OpenDemoSSEController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], OpenDemoSSEController.prototype, "ctx", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_1.PluginService)
], OpenDemoSSEController.prototype, "pluginService", void 0);
__decorate([
    (0, core_2.Get)('/call', { summary: '事件流 服务端主动推送' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoSSEController.prototype, "call", null);
exports.OpenDemoSSEController = OpenDemoSSEController = __decorate([
    (0, core_1.CoolController)()
], OpenDemoSSEController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZGVtby9jb250cm9sbGVyL29wZW4vc3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFtRTtBQUNuRSx5Q0FBNkM7QUFDN0MsdURBQTZEO0FBQzdELG1DQUFxQztBQUdyQzs7R0FFRztBQUVJLElBQU0scUJBQXFCLEdBQTNCLE1BQU0scUJBQXNCLFNBQVEscUJBQWM7SUFRakQsQUFBTixLQUFLLENBQUMsSUFBSTtRQUNSLFFBQVE7UUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXpDLE1BQU0sTUFBTSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1FBRWpDLE9BQU87UUFDUCxNQUFNLElBQUksR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUM7UUFFRixTQUFTO1FBQ1QsTUFBTSxRQUFRLEdBQVEsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxTQUFTO1FBQ1QsTUFBTSxRQUFRLEdBQUc7WUFDZixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRTtZQUMxQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFO1NBQzlDLENBQUM7UUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDVixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNyQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7Q0FDRixDQUFBO0FBdENZLHNEQUFxQjtBQUVoQztJQURDLElBQUEsYUFBTSxHQUFFOztrREFDYztBQUd2QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNNLG9CQUFhOzREQUFDO0FBR3ZCO0lBREwsSUFBQSxVQUFHLEVBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDOzs7O2lEQThCeEM7Z0NBckNVLHFCQUFxQjtJQURqQyxJQUFBLHFCQUFjLEdBQUU7R0FDSixxQkFBcUIsQ0FzQ2pDIn0=