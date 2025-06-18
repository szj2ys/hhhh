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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowGraphController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const graph_1 = require("../../../service/graph");
/**
 * 知识图谱
 */
let KnowGraphController = class KnowGraphController extends core_1.BaseController {
    async getGraph(typeId) {
        return this.ok(await this.knowGraphService.getGraph(typeId));
    }
};
exports.KnowGraphController = KnowGraphController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", graph_1.KnowGraphService)
], KnowGraphController.prototype, "knowGraphService", void 0);
__decorate([
    (0, core_2.Post)('/getGraph', { summary: '获取知识图谱' }),
    __param(0, (0, core_2.Body)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KnowGraphController.prototype, "getGraph", null);
exports.KnowGraphController = KnowGraphController = __decorate([
    (0, core_1.CoolController)()
], KnowGraphController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L2NvbnRyb2xsZXIvYWRtaW4vZ3JhcGgvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQW1FO0FBQ25FLHlDQUFvRDtBQUNwRCxrREFBMEQ7QUFFMUQ7O0dBRUc7QUFFSSxJQUFNLG1CQUFtQixHQUF6QixNQUFNLG1CQUFvQixTQUFRLHFCQUFjO0lBSy9DLEFBQU4sS0FBSyxDQUFDLFFBQVEsQ0FBaUIsTUFBYztRQUMzQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGLENBQUE7QUFSWSxrREFBbUI7QUFFOUI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDUyx3QkFBZ0I7NkRBQUM7QUFHN0I7SUFETCxJQUFBLFdBQUksRUFBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDekIsV0FBQSxJQUFBLFdBQUksRUFBQyxRQUFRLENBQUMsQ0FBQTs7OzttREFFN0I7OEJBUFUsbUJBQW1CO0lBRC9CLElBQUEscUJBQWMsR0FBRTtHQUNKLG1CQUFtQixDQVEvQiJ9