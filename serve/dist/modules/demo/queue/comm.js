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
exports.DemoCommQueue = void 0;
const task_1 = require("@cool-midway/task");
const core_1 = require("@midwayjs/core");
/**
 * 普通队列
 */
let DemoCommQueue = class DemoCommQueue extends task_1.BaseCoolQueue {
    async data(job, done) {
        // 这边可以执行定时任务具体的业务或队列的业务
        console.log('数据', job.data);
        // 抛出错误 可以让队列重试，默认重试5次
        //throw new Error('错误');
        done();
    }
};
exports.DemoCommQueue = DemoCommQueue;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], DemoCommQueue.prototype, "app", void 0);
exports.DemoCommQueue = DemoCommQueue = __decorate([
    (0, task_1.CoolQueue)()
], DemoCommQueue);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RlbW8vcXVldWUvY29tbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBNkQ7QUFFN0QseUNBQXFDO0FBRXJDOztHQUVHO0FBRUksSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYyxTQUFRLG9CQUFhO0lBSTlDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBUSxFQUFFLElBQVM7UUFDNUIsd0JBQXdCO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztDQUNGLENBQUE7QUFYWSxzQ0FBYTtBQUV4QjtJQURDLElBQUEsVUFBRyxHQUFFOzswQ0FDa0I7d0JBRmIsYUFBYTtJQUR6QixJQUFBLGdCQUFTLEdBQUU7R0FDQyxhQUFhLENBV3pCIn0=