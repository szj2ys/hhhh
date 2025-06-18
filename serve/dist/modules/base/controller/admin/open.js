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
exports.BaseOpenController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const login_1 = require("../../dto/login");
const login_2 = require("../../service/sys/login");
const param_1 = require("../../service/sys/param");
const validate_1 = require("@midwayjs/validate");
/**
 * 不需要登录的后台接口
 */
let BaseOpenController = class BaseOpenController extends core_2.BaseController {
    /**
     * 实体信息与路径
     * @returns
     */
    async getEps() {
        return this.ok(this.eps.admin);
    }
    /**
     * 根据配置参数key获得网页内容(富文本)
     */
    async htmlByKey(key) {
        this.ctx.body = await this.baseSysParamService.htmlByKey(key);
    }
    /**
     * 登录
     * @param login
     */
    async login(login) {
        return this.ok(await this.baseSysLoginService.login(login));
    }
    /**
     * 获得验证码
     */
    async captcha(width, height, color) {
        return this.ok(await this.baseSysLoginService.captcha(width, height, color));
    }
    /**
     * 刷新token
     */
    async refreshToken(refreshToken) {
        try {
            const token = await this.baseSysLoginService.refreshToken(refreshToken);
            return this.ok(token);
        }
        catch (e) {
            this.ctx.status = 401;
            this.ctx.body = {
                code: core_2.RESCODE.COMMFAIL,
                message: '登录失效~',
            };
        }
    }
};
exports.BaseOpenController = BaseOpenController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", login_2.BaseSysLoginService)
], BaseOpenController.prototype, "baseSysLoginService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", param_1.BaseSysParamService)
], BaseOpenController.prototype, "baseSysParamService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseOpenController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_2.CoolEps)
], BaseOpenController.prototype, "eps", void 0);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Get)('/eps', { summary: '实体信息与路径' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "getEps", null);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Get)('/html', { summary: '获得网页内容的参数值' }),
    __param(0, (0, core_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "htmlByKey", null);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Post)('/login', { summary: '登录' }),
    (0, validate_1.Validate)(),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "login", null);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Get)('/captcha', { summary: '验证码' }),
    __param(0, (0, core_1.Query)('width')),
    __param(1, (0, core_1.Query)('height')),
    __param(2, (0, core_1.Query)('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "captcha", null);
__decorate([
    (0, core_2.CoolTag)(core_2.TagTypes.IGNORE_TOKEN),
    (0, core_1.Get)('/refreshToken', { summary: '刷新token' }),
    __param(0, (0, core_1.Query)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "refreshToken", null);
exports.BaseOpenController = BaseOpenController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({ description: '开放接口' }),
    (0, core_2.CoolUrlTag)()
], BaseOpenController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hZG1pbi9vcGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF5RTtBQUN6RSw0Q0FRMkI7QUFDM0IsMkNBQTJDO0FBQzNDLG1EQUE4RDtBQUM5RCxtREFBOEQ7QUFFOUQsaURBQThDO0FBRTlDOztHQUVHO0FBSUksSUFBTSxrQkFBa0IsR0FBeEIsTUFBTSxrQkFBbUIsU0FBUSxxQkFBYztJQWFwRDs7O09BR0c7SUFHVSxBQUFOLEtBQUssQ0FBQyxNQUFNO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUdHLEFBQU4sS0FBSyxDQUFDLFNBQVMsQ0FBZSxHQUFXO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7OztPQUdHO0lBSUcsQUFBTixLQUFLLENBQUMsS0FBSyxDQUFTLEtBQWU7UUFDakMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7T0FFRztJQUdHLEFBQU4sS0FBSyxDQUFDLE9BQU8sQ0FDSyxLQUFhLEVBQ1osTUFBYyxFQUNmLEtBQWE7UUFFN0IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUNaLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUM3RCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBR0csQUFB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