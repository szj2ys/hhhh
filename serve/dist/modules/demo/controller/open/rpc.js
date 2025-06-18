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
exports.OpenDemoRpcController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const rpc_1 = require("../../service/rpc");
/**
 * 远程RPC调用
 */
let OpenDemoRpcController = class OpenDemoRpcController extends core_2.BaseController {
    async call() {
        return this.ok(await this.demoRpcService.call());
    }
    async event() {
        await this.demoRpcService.event();
        return this.ok();
    }
    async transaction() {
        await this.demoRpcService.transaction({ a: 1 });
        return this.ok();
    }
};
exports.OpenDemoRpcController = OpenDemoRpcController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", rpc_1.DemoRpcService)
], OpenDemoRpcController.prototype, "demoRpcService", void 0);
__decorate([
    (0, core_1.Get)('/call', { summary: '远程调用' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoRpcController.prototype, "call", null);
__decorate([
    (0, core_1.Get)('/event', { summary: '集群事件' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoRpcController.prototype, "event", null);
__decorate([
    (0, core_1.Get)('/transaction', { summary: '分布式事务' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoRpcController.prototype, "transaction", null);
exports.OpenDemoRpcController = OpenDemoRpcController = __decorate([
    (0, core_2.CoolController)()
], OpenDemoRpcController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZGVtby9jb250cm9sbGVyL29wZW4vcnBjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsMkNBQW1EO0FBRW5EOztHQUVHO0FBRUksSUFBTSxxQkFBcUIsR0FBM0IsTUFBTSxxQkFBc0IsU0FBUSxxQkFBYztJQUtqRCxBQUFOLEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxXQUFXO1FBQ2YsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FDRixDQUFBO0FBcEJZLHNEQUFxQjtBQUVoQztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNPLG9CQUFjOzZEQUFDO0FBR3pCO0lBREwsSUFBQSxVQUFHLEVBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs7O2lEQUdqQztBQUdLO0lBREwsSUFBQSxVQUFHLEVBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs7O2tEQUlsQztBQUdLO0lBREwsSUFBQSxVQUFHLEVBQUMsY0FBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDOzs7O3dEQUl6QztnQ0FuQlUscUJBQXFCO0lBRGpDLElBQUEscUJBQWMsR0FBRTtHQUNKLHFCQUFxQixDQW9CakMifQ==