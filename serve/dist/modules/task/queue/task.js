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
exports.TaskInfoQueue = void 0;
const core_1 = require("@midwayjs/core");
const task_1 = require("@cool-midway/task");
const bull_1 = require("../service/bull");
/**
 * 任务
 */
let TaskInfoQueue = class TaskInfoQueue extends task_1.BaseCoolQueue {
    async data(job, done) {
        try {
            const result = await this.taskBullService.invokeService(job.data.service);
            this.taskBullService.record(job.data, 1, JSON.stringify(result));
        }
        catch (error) {
            this.taskBullService.record(job.data, 0, error.message);
        }
        if (!job.data.isOnce) {
            this.taskBullService.updateNextRunTime(job.data.jobId);
            this.taskBullService.updateStatus(job.data.id);
        }
        done();
    }
};
exports.TaskInfoQueue = TaskInfoQueue;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], TaskInfoQueue.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", bull_1.TaskBullService)
], TaskInfoQueue.prototype, "taskBullService", void 0);
exports.TaskInfoQueue = TaskInfoQueue = __decorate([
    (0, task_1.CoolQueue)()
], TaskInfoQueue);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Rhc2svcXVldWUvdGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkM7QUFDN0MsNENBQTZEO0FBQzdELDBDQUFrRDtBQUdsRDs7R0FFRztBQUVJLElBQWUsYUFBYSxHQUE1QixNQUFlLGFBQWMsU0FBUSxvQkFBYTtJQU92RCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFTO1FBQ3ZCLElBQUksQ0FBQztZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUM7Q0FDRixDQUFBO0FBcEJxQixzQ0FBYTtBQUVqQztJQURDLElBQUEsVUFBRyxHQUFFOzswQ0FDa0I7QUFHeEI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDUSxzQkFBZTtzREFBQzt3QkFMYixhQUFhO0lBRGxDLElBQUEsZ0JBQVMsR0FBRTtHQUNVLGFBQWEsQ0FvQmxDIn0=