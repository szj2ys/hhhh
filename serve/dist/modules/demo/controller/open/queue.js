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
exports.OpenDemoQueueController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const comm_1 = require("../../queue/comm");
const getter_1 = require("../../queue/getter");
/**
 * 队列
 */
let OpenDemoQueueController = class OpenDemoQueueController extends core_2.BaseController {
    /**
     * 发送数据到队列
     */
    async queue() {
        this.demoCommQueue.add({ a: 2 });
        return this.ok();
    }
    async addGetter() {
        await this.demoGetterQueue.add({ a: new Date() });
        return this.ok();
    }
    /**
     * 获得队列中的数据，只有当队列类型为getter时有效
     */
    async getter() {
        var _a, _b;
        const job = await this.demoGetterQueue.getters.getJobs(['wait'], 0, 0, true);
        // 获得完将数据从队列移除
        await ((_a = job[0]) === null || _a === void 0 ? void 0 : _a.remove());
        return this.ok((_b = job[0]) === null || _b === void 0 ? void 0 : _b.data);
    }
};
exports.OpenDemoQueueController = OpenDemoQueueController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", comm_1.DemoCommQueue)
], OpenDemoQueueController.prototype, "demoCommQueue", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", getter_1.DemoGetterQueue)
], OpenDemoQueueController.prototype, "demoGetterQueue", void 0);
__decorate([
    (0, core_1.Post)('/add', { summary: '发送队列数据' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoQueueController.prototype, "queue", null);
__decorate([
    (0, core_1.Post)('/addGetter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoQueueController.prototype, "addGetter", null);
__decorate([
    (0, core_1.Get)('/getter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoQueueController.prototype, "getter", null);
exports.OpenDemoQueueController = OpenDemoQueueController = __decorate([
    (0, core_2.CoolController)()
], OpenDemoQueueController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvb3Blbi9xdWV1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNEQ7QUFDNUQsNENBQW1FO0FBQ25FLDJDQUFpRDtBQUNqRCwrQ0FBcUQ7QUFFckQ7O0dBRUc7QUFFSSxJQUFNLHVCQUF1QixHQUE3QixNQUFNLHVCQUF3QixTQUFRLHFCQUFjO0lBU3pEOztPQUVHO0lBRUcsQUFBTixLQUFLLENBQUMsS0FBSztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLFNBQVM7UUFDYixNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7T0FFRztJQUVHLEFBQU4sS0FBSyxDQUFDLE1BQU07O1FBQ1YsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ3BELENBQUMsTUFBTSxDQUFDLEVBQ1IsQ0FBQyxFQUNELENBQUMsRUFDRCxJQUFJLENBQ0wsQ0FBQztRQUNGLGNBQWM7UUFDZCxNQUFNLENBQUEsTUFBQSxHQUFHLENBQUMsQ0FBQyxDQUFDLDBDQUFFLE1BQU0sRUFBRSxDQUFBLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQUEsR0FBRyxDQUFDLENBQUMsQ0FBQywwQ0FBRSxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0YsQ0FBQTtBQXZDWSwwREFBdUI7QUFHbEM7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTSxvQkFBYTs4REFBQztBQUk3QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNRLHdCQUFlO2dFQUFDO0FBTTNCO0lBREwsSUFBQSxXQUFJLEVBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDOzs7O29EQUluQztBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsWUFBWSxDQUFDOzs7O3dEQUlsQjtBQU1LO0lBREwsSUFBQSxVQUFHLEVBQUMsU0FBUyxDQUFDOzs7O3FEQVdkO2tDQXRDVSx1QkFBdUI7SUFEbkMsSUFBQSxxQkFBYyxHQUFFO0dBQ0osdUJBQXVCLENBdUNuQyJ9