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
exports.BaseSysParamController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const param_1 = require("../../../entity/sys/param");
const param_2 = require("../../../service/sys/param");
/**
 * 参数配置
 */
let BaseSysParamController = class BaseSysParamController extends core_2.BaseController {
    /**
     * 根据配置参数key获得网页内容(富文本)
     */
    async htmlByKey(key) {
        this.ctx.body = await this.baseSysParamService.htmlByKey(key);
    }
};
exports.BaseSysParamController = BaseSysParamController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", param_2.BaseSysParamService)
], BaseSysParamController.prototype, "baseSysParamService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysParamController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Get)('/html', { summary: '获得网页内容的参数值' }),
    __param(0, (0, core_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseSysParamController.prototype, "htmlByKey", null);
exports.BaseSysParamController = BaseSysParamController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'page'],
        entity: param_1.BaseSysParamEntity,
        service: param_2.BaseSysParamService,
        pageQueryOp: {
            keyWordLikeFields: ['name', 'keyName'],
            fieldEq: ['dataType'],
        },
    })
], BaseSysParamController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iYXNlL2NvbnRyb2xsZXIvYWRtaW4vc3lzL3BhcmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUE2RDtBQUM3RCw0Q0FBbUU7QUFDbkUscURBQStEO0FBQy9ELHNEQUFpRTtBQUdqRTs7R0FFRztBQVdJLElBQU0sc0JBQXNCLEdBQTVCLE1BQU0sc0JBQXVCLFNBQVEscUJBQWM7SUFPeEQ7O09BRUc7SUFFRyxBQUFOLEtBQUssQ0FBQyxTQUFTLENBQWUsR0FBVztRQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNGLENBQUE7QUFkWSx3REFBc0I7QUFFakM7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDWSwyQkFBbUI7bUVBQUM7QUFHekM7SUFEQyxJQUFBLGFBQU0sR0FBRTs7bURBQ0k7QUFNUDtJQURMLElBQUEsVUFBRyxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQztJQUN2QixXQUFBLElBQUEsWUFBSyxFQUFDLEtBQUssQ0FBQyxDQUFBOzs7O3VEQUU1QjtpQ0FiVSxzQkFBc0I7SUFWbEMsSUFBQSxjQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ2hELE1BQU0sRUFBRSwwQkFBa0I7UUFDMUIsT0FBTyxFQUFFLDJCQUFtQjtRQUM1QixXQUFXLEVBQUU7WUFDWCxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDdEMsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3RCO0tBQ0YsQ0FBQztHQUNXLHNCQUFzQixDQWNsQyJ9