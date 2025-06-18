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
exports.TaskCommEvent = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const info_1 = require("../service/info");
const local_1 = require("../service/local");
/**
 * 应用事件
 */
let TaskCommEvent = class TaskCommEvent {
    async onServerReady() {
        this.taskInfoService.initTask();
    }
    async onLocalTaskStop(jobId) {
        this.taskLocalService.stopByJobId(jobId);
    }
};
exports.TaskCommEvent = TaskCommEvent;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.TaskInfoService)
], TaskCommEvent.prototype, "taskInfoService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", local_1.TaskLocalService)
], TaskCommEvent.prototype, "taskLocalService", void 0);
__decorate([
    (0, core_2.Event)('onServerReady'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskCommEvent.prototype, "onServerReady", null);
__decorate([
    (0, core_2.Event)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskCommEvent.prototype, "onLocalTaskStop", null);
exports.TaskCommEvent = TaskCommEvent = __decorate([
    (0, core_2.CoolEvent)()
], TaskCommEvent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Rhc2svZXZlbnQvY29tbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFDeEMsNENBQXFEO0FBQ3JELDBDQUFrRDtBQUNsRCw0Q0FBb0Q7QUFFcEQ7O0dBRUc7QUFFSSxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBUWxCLEFBQU4sS0FBSyxDQUFDLGFBQWE7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUs7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0YsQ0FBQTtBQWhCWSxzQ0FBYTtBQUV4QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNRLHNCQUFlO3NEQUFDO0FBR2pDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1Msd0JBQWdCO3VEQUFDO0FBRzdCO0lBREwsSUFBQSxZQUFLLEVBQUMsZUFBZSxDQUFDOzs7O2tEQUd0QjtBQUdLO0lBREwsSUFBQSxZQUFLLEdBQUU7Ozs7b0RBR1A7d0JBZlUsYUFBYTtJQUR6QixJQUFBLGdCQUFTLEdBQUU7R0FDQyxhQUFhLENBZ0J6QiJ9