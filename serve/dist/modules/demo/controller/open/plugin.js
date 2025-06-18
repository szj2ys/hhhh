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
exports.OpenDemoPluginController = void 0;
const core_1 = require("@cool-midway/core");
const info_1 = require("../../../plugin/service/info");
const core_2 = require("@midwayjs/core");
/**
 * 插件
 */
let OpenDemoPluginController = class OpenDemoPluginController extends core_1.BaseController {
    async invoke() {
        // 获取插件实例
        const instance = await this.pluginService.getInstance('ollama');
        // 调用chat
        const messages = [
            { role: 'system', content: '你叫小酷，是一个智能助理' },
            { role: 'user', content: '写一个1000字的关于春天的文章' },
        ];
        for (let i = 0; i < 3; i++) {
            instance.chat(messages, { stream: true }, res => {
                console.log(i, res.content);
            });
        }
        return this.ok();
    }
};
exports.OpenDemoPluginController = OpenDemoPluginController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_1.PluginService)
], OpenDemoPluginController.prototype, "pluginService", void 0);
__decorate([
    (0, core_2.Get)('/invoke', { summary: '调用插件' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoPluginController.prototype, "invoke", null);
exports.OpenDemoPluginController = OpenDemoPluginController = __decorate([
    (0, core_1.CoolController)()
], OpenDemoPluginController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZGVtby9jb250cm9sbGVyL29wZW4vcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFtRTtBQUNuRSx1REFBNkQ7QUFDN0QseUNBQTZDO0FBRTdDOztHQUVHO0FBRUksSUFBTSx3QkFBd0IsR0FBOUIsTUFBTSx3QkFBeUIsU0FBUSxxQkFBYztJQUtwRCxBQUFOLEtBQUssQ0FBQyxNQUFNO1FBQ1YsU0FBUztRQUNULE1BQU0sUUFBUSxHQUFRLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckUsU0FBUztRQUNULE1BQU0sUUFBUSxHQUFHO1lBQ2YsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUU7WUFDM0MsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRTtTQUM5QyxDQUFDO1FBQ0YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNGLENBQUE7QUFwQlksNERBQXdCO0FBRW5DO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ00sb0JBQWE7K0RBQUM7QUFHdkI7SUFETCxJQUFBLFVBQUcsRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Ozs7c0RBZW5DO21DQW5CVSx3QkFBd0I7SUFEcEMsSUFBQSxxQkFBYyxHQUFFO0dBQ0osd0JBQXdCLENBb0JwQyJ9