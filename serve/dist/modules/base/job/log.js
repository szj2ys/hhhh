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
exports.BaseLogJob = void 0;
const cron_1 = require("@midwayjs/cron");
const core_1 = require("@midwayjs/core");
const log_1 = require("../service/sys/log");
/**
 * 日志定时任务
 */
let BaseLogJob = class BaseLogJob {
    async onTick() {
        this.logger.info('清除日志定时任务开始执行');
        const startTime = Date.now();
        await this.baseSysLogService.clear();
        this.logger.info(`清除日志定时任务结束，耗时:${Date.now() - startTime}ms`);
    }
};
exports.BaseLogJob = BaseLogJob;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", log_1.BaseSysLogService)
], BaseLogJob.prototype, "baseSysLogService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseLogJob.prototype, "logger", void 0);
exports.BaseLogJob = BaseLogJob = __decorate([
    (0, cron_1.Job)({
        cronTime: core_1.FORMAT.CRONTAB.EVERY_DAY,
        start: true,
    })
], BaseLogJob);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9qb2IvbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUEyQztBQUMzQyx5Q0FBeUQ7QUFDekQsNENBQXVEO0FBRXZEOztHQUVHO0FBS0ksSUFBTSxVQUFVLEdBQWhCLE1BQU0sVUFBVTtJQU9yQixLQUFLLENBQUMsTUFBTTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNGLENBQUE7QUFiWSxnQ0FBVTtBQUVyQjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNVLHVCQUFpQjtxREFBQztBQUdyQztJQURDLElBQUEsYUFBTSxHQUFFOzswQ0FDTztxQkFMTCxVQUFVO0lBSnRCLElBQUEsVUFBRyxFQUFDO1FBQ0gsUUFBUSxFQUFFLGFBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUztRQUNsQyxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7R0FDVyxVQUFVLENBYXRCIn0=