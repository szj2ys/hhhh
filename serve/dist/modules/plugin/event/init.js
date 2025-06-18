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
exports.PluginInitEvent = exports.GLOBAL_EVENT_PLUGIN_REMOVE = exports.GLOBAL_EVENT_PLUGIN_INIT = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const center_1 = require("../service/center");
// 插件初始化全局事件
exports.GLOBAL_EVENT_PLUGIN_INIT = 'globalPluginInit';
// 插件移除全局事件
exports.GLOBAL_EVENT_PLUGIN_REMOVE = 'globalPluginRemove';
/**
 * 接收事件
 */
let PluginInitEvent = class PluginInitEvent {
    /**
     * 插件初始化事件，某个插件重新初始化
     * @param key
     */
    async globalPluginInit(key) {
        await this.pluginCenterService.initOne(key);
    }
    /**
     * 插件移除或者关闭事件
     * @param key
     * @param isHook
     */
    async globalPluginRemove(key, isHook) {
        await this.pluginCenterService.remove(key, isHook);
    }
};
exports.PluginInitEvent = PluginInitEvent;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", center_1.PluginCenterService)
], PluginInitEvent.prototype, "pluginCenterService", void 0);
__decorate([
    (0, core_1.Event)(exports.GLOBAL_EVENT_PLUGIN_INIT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PluginInitEvent.prototype, "globalPluginInit", null);
__decorate([
    (0, core_1.Event)(exports.GLOBAL_EVENT_PLUGIN_REMOVE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], PluginInitEvent.prototype, "globalPluginRemove", null);
exports.PluginInitEvent = PluginInitEvent = __decorate([
    (0, core_1.CoolEvent)()
], PluginInitEvent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3BsdWdpbi9ldmVudC9pbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFxRDtBQUNyRCx5Q0FBd0M7QUFDeEMsOENBQXdEO0FBRXhELFlBQVk7QUFDQyxRQUFBLHdCQUF3QixHQUFHLGtCQUFrQixDQUFDO0FBQzNELFdBQVc7QUFDRSxRQUFBLDBCQUEwQixHQUFHLG9CQUFvQixDQUFDO0FBRS9EOztHQUVHO0FBRUksSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQUkxQjs7O09BR0c7SUFFRyxBQUFOLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFXO1FBQ2hDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVHLEFBQU4sS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQVcsRUFBRSxNQUFlO1FBQ25ELE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNGLENBQUE7QUF0QlksMENBQWU7QUFFMUI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDWSw0QkFBbUI7NERBQUM7QUFPbkM7SUFETCxJQUFBLFlBQUssRUFBQyxnQ0FBd0IsQ0FBQzs7Ozt1REFHL0I7QUFRSztJQURMLElBQUEsWUFBSyxFQUFDLGtDQUEwQixDQUFDOzs7O3lEQUdqQzswQkFyQlUsZUFBZTtJQUQzQixJQUFBLGdCQUFTLEdBQUU7R0FDQyxlQUFlLENBc0IzQiJ9