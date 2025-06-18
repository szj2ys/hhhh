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
exports.FlowMcpEvent = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const server_1 = require("../mcp/server");
const client_1 = require("../mcp/client");
/**
 * 接收事件
 */
let FlowMcpEvent = class FlowMcpEvent {
    async messages(ctx, data) {
        this.flowMcpServer.handlePostMessage(ctx, data);
    }
    async removeTool(sessionId) {
        this.flowMcpServer.remove(sessionId);
    }
    async onServerReady() {
        this.flowMcpClient.initAll();
    }
    async mcpClientInitAll() {
        this.flowMcpClient.initAll();
    }
    async mcpClientInitOne(config) {
        this.flowMcpClient.initOne(config);
    }
    async mcpClientRemove(name) {
        this.flowMcpClient.remove(name);
    }
};
exports.FlowMcpEvent = FlowMcpEvent;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", server_1.FlowMcpServer)
], FlowMcpEvent.prototype, "flowMcpServer", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", client_1.FlowMcpClient)
], FlowMcpEvent.prototype, "flowMcpClient", void 0);
__decorate([
    (0, core_1.Event)('mcp.messages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FlowMcpEvent.prototype, "messages", null);
__decorate([
    (0, core_1.Event)('mcp.remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlowMcpEvent.prototype, "removeTool", null);
__decorate([
    (0, core_1.Event)('onServerReady'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlowMcpEvent.prototype, "onServerReady", null);
__decorate([
    (0, core_1.Event)('mcp.client.initAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlowMcpEvent.prototype, "mcpClientInitAll", null);
__decorate([
    (0, core_1.Event)('mcp.client.initOne'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FlowMcpEvent.prototype, "mcpClientInitOne", null);
__decorate([
    (0, core_1.Event)('mcp.client.remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlowMcpEvent.prototype, "mcpClientRemove", null);
exports.FlowMcpEvent = FlowMcpEvent = __decorate([
    (0, core_1.CoolEvent)()
], FlowMcpEvent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9ldmVudC9tY3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXFEO0FBQ3JELHlDQUF3QztBQUN4QywwQ0FBOEM7QUFDOUMsMENBQThDO0FBRTlDOztHQUVHO0FBRUksSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtJQVFqQixBQUFOLEtBQUssQ0FBQyxRQUFRLENBQ1osR0FBUSxFQUNSLElBQXFEO1FBRXJELElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBaUI7UUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLGFBQWE7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsZ0JBQWdCO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQVc7UUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFZO1FBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRixDQUFBO0FBdkNZLG9DQUFZO0FBRXZCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ00sc0JBQWE7bURBQUM7QUFHN0I7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTSxzQkFBYTttREFBQztBQUd2QjtJQURMLElBQUEsWUFBSyxFQUFDLGNBQWMsQ0FBQzs7Ozs0Q0FNckI7QUFHSztJQURMLElBQUEsWUFBSyxFQUFDLFlBQVksQ0FBQzs7Ozs4Q0FHbkI7QUFHSztJQURMLElBQUEsWUFBSyxFQUFDLGVBQWUsQ0FBQzs7OztpREFHdEI7QUFHSztJQURMLElBQUEsWUFBSyxFQUFDLG9CQUFvQixDQUFDOzs7O29EQUczQjtBQUdLO0lBREwsSUFBQSxZQUFLLEVBQUMsb0JBQW9CLENBQUM7Ozs7b0RBRzNCO0FBR0s7SUFETCxJQUFBLFlBQUssRUFBQyxtQkFBbUIsQ0FBQzs7OzttREFHMUI7dUJBdENVLFlBQVk7SUFEeEIsSUFBQSxnQkFBUyxHQUFFO0dBQ0MsWUFBWSxDQXVDeEIifQ==