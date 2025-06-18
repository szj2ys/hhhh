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
exports.BaseSysUserController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const user_1 = require("../../../entity/sys/user");
const user_2 = require("../../../service/sys/user");
/**
 * 系统用户
 */
let BaseSysUserController = class BaseSysUserController extends core_2.BaseController {
    /**
     * 移动部门
     */
    async move(departmentId, userIds) {
        await this.baseSysUserService.move(departmentId, userIds);
        return this.ok();
    }
};
exports.BaseSysUserController = BaseSysUserController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", user_2.BaseSysUserService)
], BaseSysUserController.prototype, "baseSysUserService", void 0);
__decorate([
    (0, core_1.Post)('/move', { summary: '移动部门' }),
    __param(0, (0, core_1.Body)('departmentId')),
    __param(1, (0, core_1.Body)('userIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], BaseSysUserController.prototype, "move", null);
exports.BaseSysUserController = BaseSysUserController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: user_1.BaseSysUserEntity,
        service: user_2.BaseSysUserService,
        insertParam: ctx => {
            return {
                userId: ctx.admin.userId,
            };
        },
    })
], BaseSysUserController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hZG1pbi9zeXMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkQ7QUFDN0QsNENBQW1FO0FBQ25FLG1EQUE2RDtBQUM3RCxvREFBK0Q7QUFFL0Q7O0dBRUc7QUFZSSxJQUFNLHFCQUFxQixHQUEzQixNQUFNLHFCQUFzQixTQUFRLHFCQUFjO0lBSXZEOztPQUVHO0lBRUcsQUFBTixLQUFLLENBQUMsSUFBSSxDQUNjLFlBQW9CLEVBQ3pCLE9BQVc7UUFFNUIsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBQ0YsQ0FBQTtBQWZZLHNEQUFxQjtBQUVoQztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNXLHlCQUFrQjtpRUFBQztBQU1qQztJQURMLElBQUEsV0FBSSxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUVoQyxXQUFBLElBQUEsV0FBSSxFQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ3BCLFdBQUEsSUFBQSxXQUFJLEVBQUMsU0FBUyxDQUFDLENBQUE7Ozs7aURBSWpCO2dDQWRVLHFCQUFxQjtJQVhqQyxJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSx3QkFBaUI7UUFDekIsT0FBTyxFQUFFLHlCQUFrQjtRQUMzQixXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDakIsT0FBTztnQkFDTCxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO2FBQ3pCLENBQUM7UUFDSixDQUFDO0tBQ0YsQ0FBQztHQUNXLHFCQUFxQixDQWVqQyJ9