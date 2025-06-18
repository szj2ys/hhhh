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
exports.BaseSysLoginService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const uuid_1 = require("uuid");
const user_1 = require("../../entity/sys/user");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const md5 = require("md5");
const role_1 = require("./role");
const _ = require("lodash");
const menu_1 = require("./menu");
const department_1 = require("./department");
const jwt = require("jsonwebtoken");
const cache_manager_1 = require("@midwayjs/cache-manager");
const utils_1 = require("../../../../comm/utils");
const svgCaptcha = require("svg-captcha");
/**
 * 登录
 */
let BaseSysLoginService = class BaseSysLoginService extends core_2.BaseService {
    /**
     * 登录
     * @param login
     */
    async login(login) {
        const { username, captchaId, verifyCode, password } = login;
        // 校验验证码
        const checkV = await this.captchaCheck(captchaId, verifyCode);
        if (checkV) {
            const user = await this.baseSysUserEntity.findOneBy({ username });
            // 校验用户
            if (user) {
                // 校验用户状态及密码
                if (user.status === 0 || user.password !== md5(password)) {
                    throw new core_2.CoolCommException('账户或密码不正确~');
                }
            }
            else {
                throw new core_2.CoolCommException('账户或密码不正确~');
            }
            // 校验角色
            const roleIds = await this.baseSysRoleService.getByUser(user.id);
            if (_.isEmpty(roleIds)) {
                throw new core_2.CoolCommException('该用户未设置任何角色，无法登录~');
            }
            // 生成token
            const { expire, refreshExpire } = this.coolConfig.jwt.token;
            const result = {
                expire,
                token: await this.generateToken(user, roleIds, expire),
                refreshExpire,
                refreshToken: await this.generateToken(user, roleIds, refreshExpire, true),
            };
            // 将用户相关信息保存到缓存
            const perms = await this.baseSysMenuService.getPerms(roleIds);
            const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, user.username === 'admin');
            await this.midwayCache.set(`admin:department:${user.id}`, departments);
            await this.midwayCache.set(`admin:perms:${user.id}`, perms);
            await this.midwayCache.set(`admin:token:${user.id}`, result.token);
            await this.midwayCache.set(`admin:token:refresh:${user.id}`, result.token);
            return result;
        }
        else {
            throw new core_2.CoolCommException('验证码不正确');
        }
    }
    /**
     * 验证码
     * @param width 宽
     * @param height 高
     */
    async captcha(width = 150, height = 50, color = '#fff') {
        const svg = svgCaptcha.create({
            // ignoreChars: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
            width,
            height,
            noise: 3,
        });
        const result = {
            captchaId: (0, uuid_1.v1)(),
            data: svg.data.replace(/"/g, "'"),
        };
        // 文字变白
        const rpList = [
            '#111',
            '#222',
            '#333',
            '#444',
            '#555',
            '#666',
            '#777',
            '#888',
            '#999',
        ];
        rpList.forEach(rp => {
            result.data = result.data['replaceAll'](rp, color);
        });
        // Convert SVG to base64
        const base64Data = Buffer.from(result.data).toString('base64');
        result.data = `data:image/svg+xml;base64,${base64Data}`;
        // 半小时过期
        await this.midwayCache.set(`verify:img:${result.captchaId}`, svg.text.toLowerCase(), 1800 * 1000);
        return result;
    }
    /**
     * 退出登录
     */
    async logout() {
        if (!this.coolConfig.jwt.sso)
            return;
        const { userId } = this.ctx.admin;
        await this.midwayCache.del(`admin:department:${userId}`);
        await this.midwayCache.del(`admin:perms:${userId}`);
        await this.midwayCache.del(`admin:token:${userId}`);
        await this.midwayCache.del(`admin:token:refresh:${userId}`);
        await this.midwayCache.del(`admin:passwordVersion:${userId}`);
    }
    /**
     * 检验图片验证码
     * @param captchaId 验证码ID
     * @param value 验证码
     */
    async captchaCheck(captchaId, value) {
        const rv = await this.midwayCache.get(`verify:img:${captchaId}`);
        if (!rv || !value || value.toLowerCase() !== rv) {
            return false;
        }
        else {
            this.midwayCache.del(`verify:img:${captchaId}`);
            return true;
        }
    }
    /**
     * 生成token
     * @param user 用户对象
     * @param roleIds 角色集合
     * @param expire 过期
     * @param isRefresh 是否是刷新
     */
    async generateToken(user, roleIds, expire, isRefresh) {
        await this.midwayCache.set(`admin:passwordVersion:${user.id}`, user.passwordV);
        const tokenInfo = {
            isRefresh: false,
            roleIds,
            username: user.username,
            userId: user.id,
            passwordVersion: user.passwordV,
            tenantId: user['tenantId'],
        };
        if (isRefresh) {
            tokenInfo.isRefresh = true;
        }
        return jwt.sign(tokenInfo, this.coolConfig.jwt.secret, {
            expiresIn: expire,
        });
    }
    /**
     * 刷新token
     * @param token
     */
    async refreshToken(token) {
        const decoded = jwt.verify(token, this.coolConfig.jwt.secret);
        if (decoded && decoded['isRefresh']) {
            delete decoded['exp'];
            delete decoded['iat'];
            const { expire, refreshExpire } = this.coolConfig.jwt.token;
            decoded['isRefresh'] = false;
            const result = {
                expire,
                token: jwt.sign(decoded, this.coolConfig.jwt.secret, {
                    expiresIn: expire,
                }),
                refreshExpire,
                refreshToken: '',
            };
            decoded['isRefresh'] = true;
            result.refreshToken = jwt.sign(decoded, this.coolConfig.jwt.secret, {
                expiresIn: refreshExpire,
            });
            await this.midwayCache.set(`admin:passwordVersion:${decoded['userId']}`, decoded['passwordVersion']);
            await this.midwayCache.set(`admin:token:${decoded['userId']}`, result.token);
            return result;
        }
    }
};
exports.BaseSysLoginService = BaseSysLoginService;
__decorate([
    (0, core_1.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "midwayCache", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysLoginService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", role_1.BaseSysRoleService)
], BaseSysLoginService.prototype, "baseSysRoleService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseSysLoginService.prototype, "baseSysMenuService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", department_1.BaseSysDepartmentService)
], BaseSysLoginService.prototype, "baseSysDepartmentService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], BaseSysLoginService.prototype, "utils", void 0);
__decorate([
    (0, core_1.Config)('module.base'),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "coolConfig", void 0);
exports.BaseSysLoginService = BaseSysLoginService = __decorate([
    (0, core_1.Provide)()
], BaseSysLoginService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF1RTtBQUN2RSw0Q0FBbUU7QUFFbkUsK0JBQWtDO0FBQ2xDLGdEQUEwRDtBQUMxRCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELDJCQUEyQjtBQUMzQixpQ0FBNEM7QUFDNUMsNEJBQTRCO0FBQzVCLGlDQUE0QztBQUM1Qyw2Q0FBd0Q7QUFDeEQsb0NBQW9DO0FBRXBDLDJEQUFzRTtBQUN0RSxrREFBK0M7QUFDL0MsMENBQTBDO0FBRTFDOztHQUVHO0FBRUksSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBb0IsU0FBUSxrQkFBVztJQXlCbEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFlO1FBQ3pCLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDNUQsUUFBUTtRQUNSLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUQsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDbEUsT0FBTztZQUNQLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1QsWUFBWTtnQkFDWixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7b0JBQ3pELE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztZ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