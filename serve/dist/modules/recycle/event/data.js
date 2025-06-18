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
exports.RecycleDataEvent = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const data_1 = require("../service/data");
/**
 * 接受数据事件
 */
let RecycleDataEvent = class RecycleDataEvent {
    /**
     * 数据被删除
     * @param params
     */
    async softDelete(params) {
        await this.recycleDataService.record(params);
    }
};
exports.RecycleDataEvent = RecycleDataEvent;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", data_1.RecycleDataService)
], RecycleDataEvent.prototype, "recycleDataService", void 0);
__decorate([
    (0, core_1.Event)(core_1.EVENT.SOFT_DELETE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecycleDataEvent.prototype, "softDelete", null);
exports.RecycleDataEvent = RecycleDataEvent = __decorate([
    (0, core_1.CoolEvent)()
], RecycleDataEvent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JlY3ljbGUvZXZlbnQvZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBNEQ7QUFDNUQseUNBQXdDO0FBQ3hDLDBDQUFxRDtBQUVyRDs7R0FFRztBQUVJLElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQWdCO0lBSTNCOzs7T0FHRztJQUVHLEFBQU4sS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNO1FBQ3JCLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0YsQ0FBQTtBQVpZLDRDQUFnQjtBQUUzQjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNXLHlCQUFrQjs0REFBQztBQU9qQztJQURMLElBQUEsWUFBSyxFQUFDLFlBQUssQ0FBQyxXQUFXLENBQUM7Ozs7a0RBR3hCOzJCQVhVLGdCQUFnQjtJQUQ1QixJQUFBLGdCQUFTLEdBQUU7R0FDQyxnQkFBZ0IsQ0FZNUIifQ==