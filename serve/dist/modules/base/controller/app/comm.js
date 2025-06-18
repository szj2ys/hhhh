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
exports.BaseAppCommController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const param_1 = require("../../service/sys/param");
const info_1 = require("../../../plugin/service/info");
/**
 * 不需要登录的后台接口
 */
let BaseAppCommController = class BaseAppCommController extends core_2.BaseController {
    async param(key) {
        if (!this.allowKeys.includes(key)) {
            return this.fail('非法操作');
        }
        return this.ok(await this.baseSysParamService.dataByKey(key));
    }
    /**
     * 实体信息与路径
     * @returns
     */
    async getEps() {
        return this.ok(this.eps.app);
    }
    /**
     * 文件上传
     */
    async upload() {
        const file = await this.pluginService.getInstance('upload');
        return this.ok(await file.upload(this.ctx));
    }
    /**
     * 文件上传模式，本地或者云存储
     */
    async uploadMode() {
        const file = await this.pluginService.getInstance('upload');
        return this.ok(await file.getMode());
    }
};
exports.BaseAppCommController = BaseAppCommController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.PluginService)
], BaseAppCommController.prototype, "pluginService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseAppCommController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Config)('module.base.allowKeys'),
    __metadata("design:type", Array)
], BaseAppCommController.prototype, "allowKeys", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_2.CoolEps)
], BaseAppCommController.prototype, "eps", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", param_1.BaseSysParamService)
], BaseAppCommController.prototype, "baseSysParamService", void 0);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Get)('/param', { summary: '参数配置' }),
    __param(0, (0, core_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "param", null);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Get)('/eps', { summary: '实体信息与路径' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "getEps", null);
__decorate([
    (0, core_1.Post)('/upload', { summary: '文件上传' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "upload", null);
__decorate([
    (0, core_1.Get)('/uploadMode', { summary: '文件上传模式' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "uploadMode", null);
exports.BaseAppCommController = BaseAppCommController = __decorate([
    (0, core_2.CoolUrlTag)(),
    (0, core_1.Provide)(),
    (0, core_2.CoolController)()
], BaseAppCommController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hcHAvY29tbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBMkU7QUFDM0UsNENBTzJCO0FBRTNCLG1EQUE4RDtBQUM5RCx1REFBNkQ7QUFFN0Q7O0dBRUc7QUFJSSxJQUFNLHFCQUFxQixHQUEzQixNQUFNLHFCQUFzQixTQUFRLHFCQUFjO0lBa0JqRCxBQUFOLEtBQUssQ0FBQyxLQUFLLENBQWUsR0FBVztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7OztPQUdHO0lBR1UsQUFBTixLQUFLLENBQUMsTUFBTTtRQUNqQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFFRyxBQUFOLEtBQUssQ0FBQyxNQUFNO1FBQ1YsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUVHLEFBQU4sS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FDRixDQUFBO0FBcERZLHNEQUFxQjtBQUVoQztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNNLG9CQUFhOzREQUFDO0FBRzdCO0lBREMsSUFBQSxhQUFNLEdBQUU7O2tEQUNJO0FBR2I7SUFEQyxJQUFBLGFBQU0sRUFBQyx1QkFBdUIsQ0FBQzs7d0RBQ1o7QUFHcEI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDSixjQUFPO2tEQUFDO0FBR2I7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDWSwyQkFBbUI7a0VBQUM7QUFJbkM7SUFGTCxJQUFBLGNBQU8sRUFBQyxlQUFRLENBQUMsWUFBWSxDQUFDO0lBQzlCLElBQUEsVUFBRyxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN0QixXQUFBLElBQUEsWUFBSyxFQUFDLEtBQUssQ0FBQyxDQUFBOzs7O2tEQUt4QjtBQVFZO0lBRlosSUFBQSxjQUFPLEVBQUMsZUFBUSxDQUFDLFlBQVksQ0FBQztJQUM5QixJQUFBLFVBQUcsRUFBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7Ozs7bURBR25DO0FBTUs7SUFETCxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Ozs7bURBSXBDO0FBTUs7SUFETCxJQUFBLFVBQUcsRUFBQyxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7Ozs7dURBSXpDO2dDQW5EVSxxQkFBcUI7SUFIakMsSUFBQSxpQkFBVSxHQUFFO0lBQ1osSUFBQSxjQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEdBQUU7R0FDSixxQkFBcUIsQ0FvRGpDIn0=