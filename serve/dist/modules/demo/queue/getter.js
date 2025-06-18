"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoGetterQueue = void 0;
const task_1 = require("@cool-midway/task");
/**
 * 主动消费队列
 */
let DemoGetterQueue = class DemoGetterQueue extends task_1.BaseCoolQueue {
};
exports.DemoGetterQueue = DemoGetterQueue;
exports.DemoGetterQueue = DemoGetterQueue = __decorate([
    (0, task_1.CoolQueue)({ type: 'getter' })
], DemoGetterQueue);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZGVtby9xdWV1ZS9nZXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsNENBQTZEO0FBRTdEOztHQUVHO0FBRUksSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZ0IsU0FBUSxvQkFBYTtDQUFHLENBQUE7QUFBeEMsMENBQWU7MEJBQWYsZUFBZTtJQUQzQixJQUFBLGdCQUFTLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7R0FDakIsZUFBZSxDQUF5QiJ9