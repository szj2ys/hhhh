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
exports.PluginVoiceSocketIoController = void 0;
const core_1 = require("@midwayjs/core");
const token_1 = require("./middleware/token");
const index_1 = require("../index");
/**
 * 声音 Socket 连接
 */
let PluginVoiceSocketIoController = class PluginVoiceSocketIoController {
    // 客户端连接
    async onConnectionMethod() {
        const { key, params } = this.ctx.handshake.query;
        await this.pluginVoiceService.createInstance(key, this.ctx, params);
        this.ctx.emit('sys', '连接成功');
    }
    // 客户端断开
    async onDisConnectionMethod() {
        const { key } = this.ctx.handshake.query;
        await this.pluginVoiceService.destroyInstance(this.ctx, key);
        this.ctx.emit('sys', '断开连接');
    }
    // 发送消息
    async send(params) {
        const { key } = this.ctx.handshake.query;
        await this.pluginVoiceService.useInstance(this.ctx, key, params);
    }
    // 结束
    async end() {
        const { key } = this.ctx.handshake.query;
        await this.pluginVoiceService.endInstance(this.ctx, key);
    }
    // 停止
    async stop() {
        const { key } = this.ctx.handshake.query;
        await this.pluginVoiceService.stopInstance(this.ctx, key);
    }
};
exports.PluginVoiceSocketIoController = PluginVoiceSocketIoController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], PluginVoiceSocketIoController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", index_1.PluginVoiceService)
], PluginVoiceSocketIoController.prototype, "pluginVoiceService", void 0);
__decorate([
    (0, core_1.OnWSConnection)({ middleware: [token_1.PluginSocketTokenMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PluginVoiceSocketIoController.prototype, "onConnectionMethod", null);
__decorate([
    (0, core_1.OnWSDisConnection)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PluginVoiceSocketIoController.prototype, "onDisConnectionMethod", null);
__decorate([
    (0, core_1.OnWSMessage)('send', { middleware: [token_1.PluginSocketTokenMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PluginVoiceSocketIoController.prototype, "send", null);
__decorate([
    (0, core_1.OnWSMessage)('end', { middleware: [token_1.PluginSocketTokenMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PluginVoiceSocketIoController.prototype, "end", null);
__decorate([
    (0, core_1.OnWSMessage)('stop', { middleware: [token_1.PluginSocketTokenMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PluginVoiceSocketIoController.prototype, "stop", null);
exports.PluginVoiceSocketIoController = PluginVoiceSocketIoController = __decorate([
    (0, core_1.WSController)('/voice')
], PluginVoiceSocketIoController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wbHVnaW4vdm9pY2Uvc29ja2V0L2lvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQU13QjtBQUN4Qiw4Q0FBaUU7QUFFakUsb0NBQThDO0FBRTlDOztHQUVHO0FBRUksSUFBTSw2QkFBNkIsR0FBbkMsTUFBTSw2QkFBNkI7SUFPeEMsUUFBUTtJQUVGLEFBQU4sS0FBSyxDQUFDLGtCQUFrQjtRQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNqRCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRO0lBRUYsQUFBTixLQUFLLENBQUMscUJBQXFCO1FBQ3pCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDekMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxPQUFPO0lBRUQsQUFBTixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQVc7UUFDcEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN6QyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELEtBQUs7SUFFQyxBQUFOLEtBQUssQ0FBQyxHQUFHO1FBQ1AsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN6QyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsS0FBSztJQUVDLEFBQU4sS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3pDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDRixDQUFBO0FBM0NZLHNFQUE2QjtBQUV4QztJQURDLElBQUEsYUFBTSxHQUFFOzswREFDVTtBQUduQjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNXLDBCQUFrQjt5RUFBQztBQUlqQztJQURMLElBQUEscUJBQWMsRUFBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLG1DQUEyQixDQUFDLEVBQUUsQ0FBQzs7Ozt1RUFLN0Q7QUFJSztJQURMLElBQUEsd0JBQWlCLEdBQUU7Ozs7MEVBS25CO0FBSUs7SUFETCxJQUFBLGtCQUFXLEVBQUMsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsbUNBQTJCLENBQUMsRUFBRSxDQUFDOzs7O3lEQUlsRTtBQUlLO0lBREwsSUFBQSxrQkFBVyxFQUFDLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLG1DQUEyQixDQUFDLEVBQUUsQ0FBQzs7Ozt3REFJakU7QUFJSztJQURMLElBQUEsa0JBQVcsRUFBQyxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxtQ0FBMkIsQ0FBQyxFQUFFLENBQUM7Ozs7eURBSWxFO3dDQTFDVSw2QkFBNkI7SUFEekMsSUFBQSxtQkFBWSxFQUFDLFFBQVEsQ0FBQztHQUNWLDZCQUE2QixDQTJDekMifQ==