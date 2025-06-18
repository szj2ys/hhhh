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
exports.TaskDemoService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
/**
 * 描述
 */
let TaskDemoService = class TaskDemoService extends core_2.BaseService {
    /**
     * 描述
     */
    async test(a, b) {
        this.logger.info('我被调用了', a, b);
        return '任务执行成功';
    }
};
exports.TaskDemoService = TaskDemoService;
__decorate([
    (0, core_1.Logger)(),
    __metadata("design:type", Object)
], TaskDemoService.prototype, "logger", void 0);
exports.TaskDemoService = TaskDemoService = __decorate([
    (0, core_1.Provide)()
], TaskDemoService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Rhc2svc2VydmljZS9kZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFpRDtBQUNqRCw0Q0FBZ0Q7QUFHaEQ7O0dBRUc7QUFFSSxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFnQixTQUFRLGtCQUFXO0lBRzlDOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGLENBQUE7QUFWWSwwQ0FBZTtBQUUxQjtJQURDLElBQUEsYUFBTSxHQUFFOzsrQ0FDTzswQkFGTCxlQUFlO0lBRDNCLElBQUEsY0FBTyxHQUFFO0dBQ0csZUFBZSxDQVUzQiJ9