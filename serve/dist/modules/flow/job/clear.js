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
exports.FlowCleartJob = void 0;
const cron_1 = require("@midwayjs/cron");
const core_1 = require("@midwayjs/core");
const result_1 = require("../service/result");
const log_1 = require("../service/log");
/**
 * 流程结果定时任务
 */
let FlowCleartJob = class FlowCleartJob {
    async onTick() {
        this.logger.info('清除流程定时任务开始执行');
        const startTime = Date.now();
        this.flowResultService.clear();
        this.flowLogService.clear();
        this.logger.info(`清除流程定时任务结束，耗时:${Date.now() - startTime}ms`);
    }
};
exports.FlowCleartJob = FlowCleartJob;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], FlowCleartJob.prototype, "logger", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", result_1.FlowResultService)
], FlowCleartJob.prototype, "flowResultService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", log_1.FlowLogService)
], FlowCleartJob.prototype, "flowLogService", void 0);
exports.FlowCleartJob = FlowCleartJob = __decorate([
    (0, cron_1.Job)({
        cronTime: core_1.FORMAT.CRONTAB.EVERY_DAY,
        start: true,
    })
], FlowCleartJob);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L2pvYi9jbGVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBMkM7QUFDM0MseUNBQXlEO0FBQ3pELDhDQUFzRDtBQUN0RCx3Q0FBZ0Q7QUFFaEQ7O0dBRUc7QUFLSSxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBVXhCLEtBQUssQ0FBQyxNQUFNO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0YsQ0FBQTtBQWpCWSxzQ0FBYTtBQUV4QjtJQURDLElBQUEsYUFBTSxHQUFFOzs2Q0FDTztBQUdoQjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNVLDBCQUFpQjt3REFBQztBQUdyQztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNPLG9CQUFjO3FEQUFDO3dCQVJwQixhQUFhO0lBSnpCLElBQUEsVUFBRyxFQUFDO1FBQ0gsUUFBUSxFQUFFLGFBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUztRQUNsQyxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7R0FDVyxhQUFhLENBaUJ6QiJ9