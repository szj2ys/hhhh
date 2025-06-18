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
exports.TaskMiddleware = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const task_1 = require("../queue/task");
const info_1 = require("../service/info");
/**
 * 任务中间件
 */
let TaskMiddleware = class TaskMiddleware {
    resolve() {
        return async (ctx, next) => {
            const urls = ctx.url.split('/');
            const type = await this.taskInfoService.initType();
            if (['add', 'update', 'once', 'stop', 'start'].includes(urls[urls.length - 1]) &&
                type == 'bull') {
                if (!this.taskInfoQueue.metaQueue) {
                    throw new core_1.CoolCommException('task插件未启用或redis配置错误或redis版本过低(>=6.x)');
                }
            }
            await next();
        };
    }
};
exports.TaskMiddleware = TaskMiddleware;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", task_1.TaskInfoQueue)
], TaskMiddleware.prototype, "taskInfoQueue", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_1.TaskInfoService)
], TaskMiddleware.prototype, "taskInfoService", void 0);
exports.TaskMiddleware = TaskMiddleware = __decorate([
    (0, core_2.Middleware)()
], TaskMiddleware);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Rhc2svbWlkZGxld2FyZS90YXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFzRDtBQUN0RCx5Q0FBb0Q7QUFHcEQsd0NBQThDO0FBQzlDLDBDQUFrRDtBQUVsRDs7R0FFRztBQUVJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFPekIsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25ELElBQ0UsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FDdEI7Z0JBQ0QsSUFBSSxJQUFJLE1BQU0sRUFDZCxDQUFDO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNsQyxNQUFNLElBQUksd0JBQWlCLENBQ3pCLHNDQUFzQyxDQUN2QyxDQUFDO2dCQUNKLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBMUJZLHdDQUFjO0FBRXpCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ00sb0JBQWE7cURBQUM7QUFHN0I7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDUSxzQkFBZTt1REFBQzt5QkFMdEIsY0FBYztJQUQxQixJQUFBLGlCQUFVLEdBQUU7R0FDQSxjQUFjLENBMEIxQiJ9