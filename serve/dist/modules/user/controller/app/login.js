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
exports.AppUserLoginController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const login_1 = require("../../service/login");
const login_2 = require("../../../base/service/sys/login");
const validate_1 = require("@midwayjs/validate");
const login_3 = require("../../../base/dto/login");
/**
 * 登录
 */
let AppUserLoginController = class AppUserLoginController extends core_1.BaseController {
    async mini(body) {
        const { code, encryptedData, iv } = body;
        return this.ok(await this.userLoginService.mini(code, encryptedData, iv));
    }
    async mp(code) {
        return this.ok(await this.userLoginService.mp(code));
    }
    async app(code) {
        return this.ok(await this.userLoginService.wxApp(code));
    }
    async phone(phone, smsCode) {
        return this.ok(await this.userLoginService.phoneVerifyCode(phone, smsCode));
    }
    async uniPhone(access_token, openid, appId) {
        return this.ok(await this.userLoginService.uniPhone(access_token, openid, appId));
    }
    async miniPhone(body) {
        const { code, encryptedData, iv } = body;
        return this.ok(await this.userLoginService.miniPhone(code, encryptedData, iv));
    }
    async captcha(width, height, color) {
        return this.ok(await this.baseSysLoginService.captcha(width, height, color));
    }
    /**
     * 登录
     * @param login
     */
    async username(login) {
        return this.ok(await this.baseSysLoginService.login(login));
    }
    async smsCode(phone, captchaId, code) {
        return this.ok(await this.userLoginService.smsCode(phone, captchaId, code));
    }
    async refreshToken(refreshToken) {
        return this.ok(await this.userLoginService.refreshToken(refreshToken));
    }
    async password(phone, password) {
        return this.ok(await this.userLoginService.password(phone, password));
    }
};
exports.AppUserLoginController = AppUserLoginController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", login_1.UserLoginService)
], AppUserLoginController.prototype, "userLoginService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", login_2.BaseSysLoginService)
], AppUserLoginController.prototype, "baseSysLoginService", void 0);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/mini', { summary: '小程序登录' }),
    __param(0, (0, core_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "mini", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/mp', { summary: '公众号登录' }),
    __param(0, (0, core_2.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "mp", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/wxApp', { summary: '微信APP授权登录' }),
    __param(0, (0, core_2.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "app", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/phone', { summary: '手机号登录' }),
    __param(0, (0, core_2.Body)('phone')),
    __param(1, (0, core_2.Body)('smsCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "phone", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/uniPhone', { summary: '一键手机号登录' }),
    __param(0, (0, core_2.Body)('access_token')),
    __param(1, (0, core_2.Body)('openid')),
    __param(2, (0, core_2.Body)('appId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "uniPhone", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/miniPhone', { summary: '绑定小程序手机号' }),
    __param(0, (0, core_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "miniPhone", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Get)('/captcha', { summary: '图片验证码' }),
    __param(0, (0, core_2.Query)('width')),
    __param(1, (0, core_2.Query)('height')),
    __param(2, (0, core_2.Query)('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "captcha", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/username', { summary: '登录' }),
    (0, validate_1.Validate)(),
    __param(0, (0, core_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_3.LoginDTO]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "username", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/smsCode', { summary: '验证码' }),
    __param(0, (0, core_2.Body)('phone')),
    __param(1, (0, core_2.Body)('captchaId')),
    __param(2, (0, core_2.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "smsCode", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/refreshToken', { summary: '刷新token' }),
    __param(0, (0, core_2.Body)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "refreshToken", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/password', { summary: '密码登录' }),
    __param(0, (0, core_2.Body)('phone')),
    __param(1, (0, core_2.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppUserLoginController.prototype, "password", null);
exports.AppUserLoginController = AppUserLoginController = __decorate([
    (0, core_1.CoolUrlTag)(),
    (0, core_1.CoolController)()
], AppUserLoginController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy91c2VyL2NvbnRyb2xsZXIvYXBwL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQU0yQjtBQUMzQix5Q0FBZ0U7QUFDaEUsK0NBQXVEO0FBQ3ZELDJEQUFzRTtBQUN0RSxpREFBNEM7QUFDNUMsbURBQWlEO0FBRWpEOztHQUVHO0FBR0ksSUFBTSxzQkFBc0IsR0FBNUIsTUFBTSxzQkFBdUIsU0FBUSxxQkFBYztJQVNsRCxBQUFOLEtBQUssQ0FBQyxJQUFJLENBQVMsSUFBSTtRQUNyQixNQUFNLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUlLLEFBQU4sS0FBSyxDQUFDLEVBQUUsQ0FBZSxJQUFZO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBSUssQUFBTixLQUFLLENBQUMsR0FBRyxDQUFlLElBQVk7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFJSyxBQUFOLEtBQUssQ0FBQyxLQUFLLENBQWdCLEtBQWEsRUFBbUIsT0FBZTtRQUN4RSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxP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