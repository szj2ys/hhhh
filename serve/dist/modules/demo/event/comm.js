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
exports.DemoCommEvent = void 0;
const core_1 = require("@cool-midway/core");
const center_1 = require("../../plugin/service/center");
/**
 * 普通事件
 */
let DemoCommEvent = class DemoCommEvent {
    /**
     * 根据事件名接收事件
     * @param msg
     * @param a
     */
    async demo(msg, a) {
        console.log(`comm当前进程的ID是: ${process.pid}`);
        console.log('comm收到消息', msg, a);
    }
    /**
     * 插件已就绪
     */
    async pluginReady() {
        // TODO 插件已就绪
    }
};
exports.DemoCommEvent = DemoCommEvent;
__decorate([
    (0, core_1.Event)('demo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DemoCommEvent.prototype, "demo", null);
__decorate([
    (0, core_1.Event)(center_1.EVENT_PLUGIN_READY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoCommEvent.prototype, "pluginReady", null);
exports.DemoCommEvent = DemoCommEvent = __decorate([
    (0, core_1.CoolEvent)()
], DemoCommEvent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RlbW8vZXZlbnQvY29tbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBcUQ7QUFDckQsd0RBQWlFO0FBRWpFOztHQUVHO0FBRUksSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYTtJQUN4Qjs7OztPQUlHO0lBRUcsQUFBTixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUVHLEFBQU4sS0FBSyxDQUFDLFdBQVc7UUFDZixhQUFhO0lBQ2YsQ0FBQztDQUNGLENBQUE7QUFuQlksc0NBQWE7QUFPbEI7SUFETCxJQUFBLFlBQUssRUFBQyxNQUFNLENBQUM7Ozs7eUNBSWI7QUFNSztJQURMLElBQUEsWUFBSyxFQUFDLDJCQUFrQixDQUFDOzs7O2dEQUd6Qjt3QkFsQlUsYUFBYTtJQUR6QixJQUFBLGdCQUFTLEdBQUU7R0FDQyxhQUFhLENBbUJ6QiJ9