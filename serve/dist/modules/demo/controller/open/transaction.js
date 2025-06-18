"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenDemoTransactionController = void 0;
const goods_1 = require("../../entity/goods");
const core_1 = require("@cool-midway/core");
const transaction_1 = require("../../service/transaction");
/**
 * 事务
 */
let OpenDemoTransactionController = class OpenDemoTransactionController extends core_1.BaseController {
};
exports.OpenDemoTransactionController = OpenDemoTransactionController;
exports.OpenDemoTransactionController = OpenDemoTransactionController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: goods_1.DemoGoodsEntity,
        service: transaction_1.DemoTransactionService,
    })
], OpenDemoTransactionController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvb3Blbi90cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw4Q0FBcUQ7QUFFckQsNENBQW1FO0FBQ25FLDJEQUFtRTtBQUVuRTs7R0FFRztBQU1JLElBQU0sNkJBQTZCLEdBQW5DLE1BQU0sNkJBQThCLFNBQVEscUJBQWM7Q0FBRyxDQUFBO0FBQXZELHNFQUE2Qjt3Q0FBN0IsNkJBQTZCO0lBTHpDLElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSx1QkFBZTtRQUN2QixPQUFPLEVBQUUsb0NBQXNCO0tBQ2hDLENBQUM7R0FDVyw2QkFBNkIsQ0FBMEIifQ==