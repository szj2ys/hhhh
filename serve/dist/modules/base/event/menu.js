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
exports.BaseMenuEvent = void 0;
const core_1 = require("@cool-midway/core");
const menu_1 = require("../service/sys/menu");
const core_2 = require("@midwayjs/core");
const translate_1 = require("../service/translate");
/**
 * 导入菜单
 */
let BaseMenuEvent = class BaseMenuEvent {
    async onMenuImport(datas) {
        for (const module in datas) {
            await this.baseSysMenuService.import(datas[module]);
            this.coreLogger.info('\x1B[36m [cool:module:base] midwayjs cool module base import [' +
                module +
                '] module menu success \x1B[0m');
        }
        this.coolEventManager.emit('onMenuInit', {});
        this.baseTranslateService.check();
    }
    async onServerReady() {
        this.baseTranslateService.loadTranslations();
    }
};
exports.BaseMenuEvent = BaseMenuEvent;
__decorate([
    (0, core_2.Logger)(),
    __metadata("design:type", Object)
], BaseMenuEvent.prototype, "coreLogger", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseMenuEvent.prototype, "baseSysMenuService", void 0);
__decorate([
    (0, core_2.App)(),
    __metadata("design:type", Object)
], BaseMenuEvent.prototype, "app", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", core_1.CoolEventManager)
], BaseMenuEvent.prototype, "coolEventManager", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", translate_1.BaseTranslateService)
], BaseMenuEvent.prototype, "baseTranslateService", void 0);
__decorate([
    (0, core_1.Event)('onMenuImport'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMenuEvent.prototype, "onMenuImport", null);
__decorate([
    (0, core_1.Event)('onServerReady'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseMenuEvent.prototype, "onServerReady", null);
exports.BaseMenuEvent = BaseMenuEvent = __decorate([
    (0, core_1.CoolEvent)()
], BaseMenuEvent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvZXZlbnQvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBdUU7QUFDdkUsOENBQXlEO0FBQ3pELHlDQU13QjtBQUN4QixvREFBNEQ7QUFFNUQ7O0dBRUc7QUFFSSxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBaUJsQixBQUFOLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSztRQUN0QixLQUFLLE1BQU0sTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQzNCLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDbEIsZ0VBQWdFO2dCQUM5RCxNQUFNO2dCQUNOLCtCQUErQixDQUNsQyxDQUFDO1FBQ0osQ0FBQztRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsYUFBYTtRQUNqQixJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0NBQ0YsQ0FBQTtBQWxDWSxzQ0FBYTtBQUV4QjtJQURDLElBQUEsYUFBTSxHQUFFOztpREFDVztBQUdwQjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNXLHlCQUFrQjt5REFBQztBQUd2QztJQURDLElBQUEsVUFBRyxHQUFFOzswQ0FDa0I7QUFHeEI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDUyx1QkFBZ0I7dURBQUM7QUFHbkM7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDYSxnQ0FBb0I7MkRBQUM7QUFHckM7SUFETCxJQUFBLFlBQUssRUFBQyxjQUFjLENBQUM7Ozs7aURBWXJCO0FBR0s7SUFETCxJQUFBLFlBQUssRUFBQyxlQUFlLENBQUM7Ozs7a0RBR3RCO3dCQWpDVSxhQUFhO0lBRHpCLElBQUEsZ0JBQVMsR0FBRTtHQUNDLGFBQWEsQ0FrQ3pCIn0=