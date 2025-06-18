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
exports.BaseSysLogController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const log_1 = require("../../../entity/sys/log");
const user_1 = require("../../../entity/sys/user");
const conf_1 = require("../../../service/sys/conf");
const log_2 = require("../../../service/sys/log");
/**
 * 系统日志
 */
let BaseSysLogController = class BaseSysLogController extends core_2.BaseController {
    /**
     * 清空日志
     */
    async clear() {
        await this.baseSysLogService.clear(true);
        return this.ok();
    }
    /**
     * 设置日志保存时间
     */
    async setKeep(value) {
        await this.baseSysConfService.updateVaule('logKeep', value);
        return this.ok();
    }
    /**
     * 获得日志保存时间
     */
    async getKeep() {
        return this.ok(await this.baseSysConfService.getValue('logKeep'));
    }
};
exports.BaseSysLogController = BaseSysLogController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", log_2.BaseSysLogService)
], BaseSysLogController.prototype, "baseSysLogService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", conf_1.BaseSysConfService)
], BaseSysLogController.prototype, "baseSysConfService", void 0);
__decorate([
    (0, core_1.Post)('/clear', { summary: '清理' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "clear", null);
__decorate([
    (0, core_1.Post)('/setKeep', { summary: '日志保存时间' }),
    __param(0, (0, core_1.Body)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "setKeep", null);
__decorate([
    (0, core_1.Get)('/getKeep', { summary: '获得日志保存时间' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "getKeep", null);
exports.BaseSysLogController = BaseSysLogController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({
        api: ['page'],
        entity: log_1.BaseSysLogEntity,
        urlTag: {
            name: 'a',
            url: ['add'],
        },
        pageQueryOp: {
            keyWordLikeFields: ['b.name', 'a.action', 'a.ip'],
            select: ['a.*', 'b.name'],
            join: [
                {
                    entity: user_1.BaseSysUserEntity,
                    alias: 'b',
                    condition: 'a.userId = b.id',
                    type: 'leftJoin',
                },
            ],
        },
    })
], BaseSysLogController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL3N5cy9sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWtFO0FBQ2xFLDRDQUFtRTtBQUNuRSxpREFBMkQ7QUFDM0QsbURBQTZEO0FBQzdELG9EQUErRDtBQUMvRCxrREFBNkQ7QUFFN0Q7O0dBRUc7QUFzQkksSUFBTSxvQkFBb0IsR0FBMUIsTUFBTSxvQkFBcUIsU0FBUSxxQkFBYztJQU90RDs7T0FFRztJQUVVLEFBQU4sS0FBSyxDQUFDLEtBQUs7UUFDaEIsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7T0FFRztJQUVVLEFBQU4sS0FBSyxDQUFDLE9BQU8sQ0FBZ0IsS0FBYTtRQUMvQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7T0FFRztJQUVVLEFBQU4sS0FBSyxDQUFDLE9BQU87UUFDbEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FDRixDQUFBO0FBaENZLG9EQUFvQjtBQUUvQjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNVLHVCQUFpQjsrREFBQztBQUdyQztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNXLHlCQUFrQjtnRUFBQztBQU0xQjtJQURaLElBQUEsV0FBSSxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OztpREFJakM7QUFNWTtJQURaLElBQUEsV0FBSSxFQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUNsQixXQUFBLElBQUEsV0FBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBOzs7O21EQUdsQztBQU1ZO0lBRFosSUFBQSxVQUFHLEVBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDOzs7O21EQUd4QzsrQkEvQlUsb0JBQW9CO0lBckJoQyxJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNiLE1BQU0sRUFBRSxzQkFBZ0I7UUFDeEIsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLEdBQUc7WUFDVCxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDYjtRQUNELFdBQVcsRUFBRTtZQUNYLGlCQUFpQixFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUM7WUFDakQsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQztZQUN6QixJQUFJLEVBQUU7Z0JBQ0o7b0JBQ0UsTUFBTSxFQUFFLHdCQUFpQjtvQkFDekIsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsU0FBUyxFQUFFLGlCQUFpQjtvQkFDNUIsSUFBSSxFQUFFLFVBQVU7aUJBQ2pCO2FBQ0Y7U0FDRjtLQUNGLENBQUM7R0FDVyxvQkFBb0IsQ0FnQ2hDIn0=