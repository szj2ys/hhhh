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
exports.DemoSingleQueue = void 0;
const task_1 = require("@cool-midway/task");
const core_1 = require("@midwayjs/core");
/**
 * 单例队列，cluster 或 集群模式下 只会有一个实例消费数据
 */
let DemoSingleQueue = class DemoSingleQueue extends task_1.BaseCoolQueue {
    async data(job, done) {
        // 这边可以执行定时任务具体的业务或队列的业务
        console.log('数据', job.data);
        // 抛出错误 可以让队列重试，默认重试5次
        //throw new Error('错误');
        done();
    }
};
exports.DemoSingleQueue = DemoSingleQueue;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], DemoSingleQueue.prototype, "app", void 0);
exports.DemoSingleQueue = DemoSingleQueue = __decorate([
    (0, task_1.CoolQueue)({ type: 'single' })
], DemoSingleQueue);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZGVtby9xdWV1ZS9zaW5nbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTZEO0FBRTdELHlDQUFxQztBQUVyQzs7R0FFRztBQUVJLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWdCLFNBQVEsb0JBQWE7SUFJaEQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFRLEVBQUUsSUFBUztRQUM1Qix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDO0NBQ0YsQ0FBQTtBQVhZLDBDQUFlO0FBRTFCO0lBREMsSUFBQSxVQUFHLEdBQUU7OzRDQUNrQjswQkFGYixlQUFlO0lBRDNCLElBQUEsZ0JBQVMsRUFBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztHQUNqQixlQUFlLENBVzNCIn0=