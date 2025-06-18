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
exports.BaseRecycleSchedule = void 0;
const core_1 = require("@midwayjs/core");
const data_1 = require("../service/data");
/**
 * 数据定时清除定时任务
 */
let BaseRecycleSchedule = class BaseRecycleSchedule {
    // 定时执行的具体任务
    async exec() {
        this.logger.info('清除回收站数据定时任务开始执行');
        const startTime = Date.now();
        await this.recycleDataService.clear();
        this.logger.info(`清除回收站数据定时任务结束，耗时:${Date.now() - startTime}ms`);
    }
};
exports.BaseRecycleSchedule = BaseRecycleSchedule;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", data_1.RecycleDataService)
], BaseRecycleSchedule.prototype, "recycleDataService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseRecycleSchedule.prototype, "logger", void 0);
__decorate([
    (0, core_1.TaskLocal)(core_1.FORMAT.CRONTAB.EVERY_DAY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseRecycleSchedule.prototype, "exec", null);
exports.BaseRecycleSchedule = BaseRecycleSchedule = __decorate([
    (0, core_1.Provide)()
], BaseRecycleSchedule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JlY3ljbGUvc2NoZWR1bGUvZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FNd0I7QUFFeEIsMENBQXFEO0FBRXJEOztHQUVHO0FBRUksSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBbUI7SUFPOUIsWUFBWTtJQUVOLEFBQU4sS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCxvQkFBb0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsSUFBSSxDQUMvQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFqQlksa0RBQW1CO0FBRTlCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1cseUJBQWtCOytEQUFDO0FBR3ZDO0lBREMsSUFBQSxhQUFNLEdBQUU7O21EQUNPO0FBSVY7SUFETCxJQUFBLGdCQUFTLEVBQUMsYUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7Ozs7K0NBUW5DOzhCQWhCVSxtQkFBbUI7SUFEL0IsSUFBQSxjQUFPLEdBQUU7R0FDRyxtQkFBbUIsQ0FpQi9CIn0=