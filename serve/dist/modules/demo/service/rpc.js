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
exports.DemoRpcService = void 0;
const core_1 = require("@midwayjs/core");
const goods_1 = require("../entity/goods");
const core_2 = require("@midwayjs/core");
const rpc_1 = require("@cool-midway/rpc");
let DemoRpcService = class DemoRpcService extends rpc_1.BaseRpcService {
    /**
     * 远程调用
     * @returns
     */
    async call() {
        return await this.rpc.call('goods', 'demoGoodsService', 'test', {
            a: 1,
        });
    }
    /**
     * 集群事件
     */
    async event() {
        this.rpc.event('test', { a: 1 });
    }
    async info(params) {
        return params;
    }
    async getUser() {
        return {
            uid: '123',
            username: 'mockedName',
            phone: '12345678901',
            email: 'xxx.xxx@xxx.com',
        };
    }
    async transaction(params, rpcTransactionId, queryRunner) {
        console.log('获得的参数', params);
        const data = {
            title: '商品标题',
            pic: 'https://xxx',
            price: 99.0,
            type: 1,
        };
        await queryRunner.manager.save(goods_1.DemoGoodsEntity, data);
        // 将事务id传给调用的远程服务方法
        await this.rpc.call('goods', 'demoGoodsService', 'transaction', {
            rpcTransactionId,
            ...params,
        });
    }
};
exports.DemoRpcService = DemoRpcService;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], DemoRpcService.prototype, "app", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", rpc_1.CoolRpc)
], DemoRpcService.prototype, "rpc", void 0);
__decorate([
    (0, rpc_1.CoolRpcTransaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DemoRpcService.prototype, "transaction", null);
exports.DemoRpcService = DemoRpcService = __decorate([
    (0, core_1.Provide)(),
    (0, rpc_1.CoolRpcService)({
        entity: goods_1.DemoGoodsEntity,
        method: ['info', 'add', 'page'],
    })
], DemoRpcService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZGVtby9zZXJ2aWNlL3JwYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBOEM7QUFDOUMsMkNBQWtEO0FBQ2xELHlDQUE0RDtBQUM1RCwwQ0FLMEI7QUFRbkIsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBZSxTQUFRLG9CQUFjO0lBT2hEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUU7WUFDOUQsQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsS0FBSztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU07UUFDZixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0QsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPO1lBQ0wsR0FBRyxFQUFFLEtBQUs7WUFDVixRQUFRLEVBQUUsWUFBWTtZQUN0QixLQUFLLEVBQUUsYUFBYTtZQUNwQixLQUFLLEVBQUUsaUJBQWlCO1NBQ3pCLENBQUM7SUFDSixDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxnQkFBaUIsRUFBRSxXQUF5QjtRQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QixNQUFNLElBQUksR0FBRztZQUNYLEtBQUssRUFBRSxNQUFNO1lBQ2IsR0FBRyxFQUFFLGFBQWE7WUFDbEIsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsQ0FBQztTQUNSLENBQUM7UUFDRixNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdEQsbUJBQW1CO1FBQ25CLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRTtZQUM5RCxnQkFBZ0I7WUFDaEIsR0FBRyxNQUFNO1NBQ1YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUFyRFksd0NBQWM7QUFFekI7SUFEQyxJQUFBLFVBQUcsR0FBRTs7MkNBQ2tCO0FBR3hCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ0osYUFBTzsyQ0FBQztBQWdDUDtJQURMLElBQUEsd0JBQWtCLEdBQUU7Ozs7aURBZ0JwQjt5QkFwRFUsY0FBYztJQUwxQixJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEsb0JBQWMsRUFBQztRQUNkLE1BQU0sRUFBRSx1QkFBZTtRQUN2QixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztLQUNoQyxDQUFDO0dBQ1csY0FBYyxDQXFEMUIifQ==