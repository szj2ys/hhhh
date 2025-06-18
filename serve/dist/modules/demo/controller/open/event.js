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
exports.OpenDemoEventController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
/**
 * 事件
 */
let OpenDemoEventController = class OpenDemoEventController extends core_2.BaseController {
    async comm() {
        await this.coolEventManager.emit('demo', { a: 2 }, 1);
        return this.ok();
    }
    async global() {
        await this.coolEventManager.globalEmit('demo', false, { a: 2 }, 1);
        return this.ok();
    }
};
exports.OpenDemoEventController = OpenDemoEventController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_2.CoolEventManager)
], OpenDemoEventController.prototype, "coolEventManager", void 0);
__decorate([
    (0, core_1.Post)('/comm', { summary: '普通事件，本进程生效' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoEventController.prototype, "comm", null);
__decorate([
    (0, core_1.Post)('/global', { summary: '全局事件，多进程都有效' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoEventController.prototype, "global", null);
exports.OpenDemoEventController = OpenDemoEventController = __decorate([
    (0, core_2.CoolController)()
], OpenDemoEventController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvb3Blbi9ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBOEM7QUFDOUMsNENBSTJCO0FBRTNCOztHQUVHO0FBRUksSUFBTSx1QkFBdUIsR0FBN0IsTUFBTSx1QkFBd0IsU0FBUSxxQkFBYztJQUtuRCxBQUFOLEtBQUssQ0FBQyxJQUFJO1FBQ1IsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsTUFBTTtRQUNWLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FDRixDQUFBO0FBZlksMERBQXVCO0FBRWxDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1MsdUJBQWdCO2lFQUFDO0FBRzdCO0lBREwsSUFBQSxXQUFJLEVBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDOzs7O21EQUl4QztBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDOzs7O3FEQUkzQztrQ0FkVSx1QkFBdUI7SUFEbkMsSUFBQSxxQkFBYyxHQUFFO0dBQ0osdUJBQXVCLENBZW5DIn0=