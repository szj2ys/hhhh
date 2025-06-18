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
exports.PluginAppEvent = void 0;
const core_1 = require("@cool-midway/core");
const cache_manager_1 = require("@midwayjs/cache-manager");
const core_2 = require("@midwayjs/core");
const center_1 = require("../service/center");
const types_1 = require("../service/types");
/**
 * 插件事件
 */
let PluginAppEvent = class PluginAppEvent {
    async onServerReady() {
        await this.midwayCache.set(center_1.PLUGIN_CACHE_KEY, []);
        this.pluginCenterService.init();
        // this.pluginTypesService.reGenerate();
    }
};
exports.PluginAppEvent = PluginAppEvent;
__decorate([
    (0, core_2.Logger)(),
    __metadata("design:type", Object)
], PluginAppEvent.prototype, "coreLogger", void 0);
__decorate([
    (0, core_2.Config)('module'),
    __metadata("design:type", Object)
], PluginAppEvent.prototype, "config", void 0);
__decorate([
    (0, core_2.App)(),
    __metadata("design:type", Object)
], PluginAppEvent.prototype, "app", void 0);
__decorate([
    (0, core_2.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], PluginAppEvent.prototype, "midwayCache", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", center_1.PluginCenterService)
], PluginAppEvent.prototype, "pluginCenterService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", types_1.PluginTypesService)
], PluginAppEvent.prototype, "pluginTypesService", void 0);
__decorate([
    (0, core_1.Event)('onServerReady'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PluginAppEvent.prototype, "onServerReady", null);
exports.PluginAppEvent = PluginAppEvent = __decorate([
    (0, core_1.CoolEvent)()
], PluginAppEvent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcGx1Z2luL2V2ZW50L2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBcUQ7QUFDckQsMkRBQXNFO0FBQ3RFLHlDQU93QjtBQUV4Qiw4Q0FBMEU7QUFDMUUsNENBQXNEO0FBRXREOztHQUVHO0FBRUksSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBYztJQW9CbkIsQUFBTixLQUFLLENBQUMsYUFBYTtRQUNqQixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHlCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyx3Q0FBd0M7SUFDMUMsQ0FBQztDQUNGLENBQUE7QUF6Qlksd0NBQWM7QUFFekI7SUFEQyxJQUFBLGFBQU0sR0FBRTs7a0RBQ1c7QUFHcEI7SUFEQyxJQUFBLGFBQU0sRUFBQyxRQUFRLENBQUM7OzhDQUNWO0FBR1A7SUFEQyxJQUFBLFVBQUcsR0FBRTs7MkNBQ3FCO0FBRzNCO0lBREMsSUFBQSxtQkFBWSxFQUFDLDhCQUFjLEVBQUUsU0FBUyxDQUFDOzttREFDZjtBQUd6QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNZLDRCQUFtQjsyREFBQztBQUd6QztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNXLDBCQUFrQjswREFBQztBQUdqQztJQURMLElBQUEsWUFBSyxFQUFDLGVBQWUsQ0FBQzs7OzttREFLdEI7eUJBeEJVLGNBQWM7SUFEMUIsSUFBQSxnQkFBUyxHQUFFO0dBQ0MsY0FBYyxDQXlCMUIifQ==