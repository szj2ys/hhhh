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
exports.DemoTransactionService = void 0;
const goods_1 = require("./../entity/goods");
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
/**
 * 操作事务
 */
let DemoTransactionService = class DemoTransactionService extends core_2.BaseService {
    /**
     * 事务操作
     */
    async add(param, queryRunner) {
        await queryRunner.manager.insert(goods_1.DemoGoodsEntity, param);
        return {
            id: param.id,
        };
    }
};
exports.DemoTransactionService = DemoTransactionService;
__decorate([
    (0, core_2.CoolTransaction)({
        connectionName: 'default',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DemoTransactionService.prototype, "add", null);
exports.DemoTransactionService = DemoTransactionService = __decorate([
    (0, core_1.Provide)()
], DemoTransactionService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL3NlcnZpY2UvdHJhbnNhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW9EO0FBQ3BELHlDQUF5QztBQUN6Qyw0Q0FBaUU7QUFHakU7O0dBRUc7QUFFSSxJQUFNLHNCQUFzQixHQUE1QixNQUFNLHNCQUF1QixTQUFRLGtCQUFXO0lBQ3JEOztPQUVHO0lBSUcsQUFBTixLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxXQUF5QjtRQUN4QyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFrQix1QkFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFFLE9BQU87WUFDTCxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7U0FDYixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFiWSx3REFBc0I7QUFPM0I7SUFITCxJQUFBLHNCQUFlLEVBQUM7UUFDZixjQUFjLEVBQUUsU0FBUztLQUMxQixDQUFDOzs7O2lEQU1EO2lDQVpVLHNCQUFzQjtJQURsQyxJQUFBLGNBQU8sR0FBRTtHQUNHLHNCQUFzQixDQWFsQyJ9