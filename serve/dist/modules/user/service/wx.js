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
exports.UserWxService = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const typeorm_1 = require("@midwayjs/typeorm");
const axios_1 = require("axios");
const crypto = require("crypto");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const info_1 = require("../../plugin/service/info");
const info_2 = require("../entity/info");
const wx_1 = require("../entity/wx");
/**
 * 微信
 */
let UserWxService = class UserWxService extends core_1.BaseService {
    /**
     * 获得插件实例
     * @returns
     */
    async getPlugin() {
        try {
            const wxPlugin = await this.pluginService.getInstance('wx');
            return wxPlugin;
        }
        catch (error) {
            throw new core_1.CoolCommException('未配置微信插件');
        }
    }
    /**
     * 获得小程序实例
     * @returns
     */
    async getMiniApp() {
        const wxPlugin = await this.getPlugin();
        return wxPlugin.MiniApp();
    }
    /**
     * 获得公众号实例
     * @returns
     */
    async getOfficialAccount() {
        const wxPlugin = await this.getPlugin();
        return wxPlugin.OfficialAccount();
    }
    /**
     * 获得App实例
     * @returns
     */
    async getOpenPlatform() {
        const wxPlugin = await this.getPlugin();
        return wxPlugin.OpenPlatform();
    }
    /**
     * 获得用户的openId
     * @param userId
     * @param type 0-小程序 1-公众号 2-App
     */
    async getOpenid(userId, type = 0) {
        const user = await this.userInfoEntity.findOneBy({
            id: (0, typeorm_2.Equal)(userId),
            status: 1,
        });
        if (!user) {
            throw new core_1.CoolCommException('用户不存在或已被禁用');
        }
        const wx = await this.userWxEntity
            .createQueryBuilder('a')
            .where('a.type = :type', { type })
            .andWhere('(a.unionid = :unionid or a.openid =:openid )', {
            unionid: user.unionid,
            openid: user.unionid,
        })
            .getOne();
        return wx ? wx.openid : null;
    }
    /**
     * 获得微信配置
     * @param appId
     * @param appSecret
     * @param url 当前网页的URL，不包含#及其后面部分(必须是调用JS接口页面的完整URL)
     */
    async getWxMpConfig(url) {
        const token = await this.getWxToken();
        const ticket = await axios_1.default.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket', {
            params: {
                access_token: token,
                type: 'jsapi',
            },
        });
        const account = (await this.getOfficialAccount()).getAccount();
        const appid = account.getAppId();
        // 返回结果集
        const result = {
            timestamp: parseInt(moment().valueOf() / 1000 + ''),
            nonceStr: (0, uuid_1.v1)(),
            appId: appid, //appid
            signature: '',
        };
        const signArr = [];
        signArr.push('jsapi_ticket=' + ticket.data.ticket);
        signArr.push('noncestr=' + result.nonceStr);
        signArr.push('timestamp=' + result.timestamp);
        signArr.push('url=' + decodeURI(url));
        // 敏感信息加密处理
        result.signature = crypto
            .createHash('sha1')
            .update(signArr.join('&'))
            .digest('hex')
            .toUpperCase();
        return result;
    }
    /**
     * 获得公众号用户信息
     * @param code
     */
    async mpUserInfo(code) {
        const token = await this.openOrMpToken(code, 'mp');
        return await this.openOrMpUserInfo(token);
    }
    /**
     * 获得app用户信息
     * @param code
     */
    async appUserInfo(code) {
        const token = await this.openOrMpToken(code, 'open');
        return await this.openOrMpUserInfo(token);
    }
    /**
     * 获得微信token 不用code
     * @param appid
     * @param secret
     */
    async getWxToken(type = 'mp') {
        let app;
        if (type == 'mp') {
            app = await this.getOfficialAccount();
        }
        else {
            app = await this.getOpenPlatform();
        }
        return await app.getAccessToken().getToken();
    }
    /**
     * 获得用户信息
     * @param token
     */
    async openOrMpUserInfo(token) {
        return await axios_1.default
            .get('https://api.weixin.qq.com/sns/userinfo', {
            params: {
                access_token: token.access_token,
                openid: token.openid,
                lang: 'zh_CN',
            },
        })
            .then(res => {
            return res.data;
        });
    }
    /**
     * 获得token嗯
     * @param code
     * @param type
     */
    async openOrMpToken(code, type = 'mp') {
        const account = type == 'mp'
            ? (await this.getOfficialAccount()).getAccount()
            : (await this.getMiniApp()).getAccount();
        const result = await axios_1.default.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
            params: {
                appid: account.getAppId(),
                secret: account.getSecret(),
                code,
                grant_type: 'authorization_code',
            },
        });
        return result.data;
    }
    /**
     * 获得小程序session
     * @param code 微信code
     * @param conf 配置
     */
    async miniSession(code) {
        const app = await this.getMiniApp();
        const utils = app.getUtils();
        const result = await utils.codeToSession(code);
        return result;
    }
    /**
     * 获得小程序用户信息
     * @param code
     * @param encryptedData
     * @param iv
     */
    async miniUserInfo(code, encryptedData, iv) {
        const session = await this.miniSession(code);
        if (session.errcode) {
            throw new core_1.CoolCommException('登录失败，请重试');
        }
        const info = await this.miniDecryptData(encryptedData, iv, session.session_key);
        if (info) {
            delete info['watermark'];
            return {
                ...info,
                openid: session['openid'],
                unionid: session['unionid'],
            };
        }
        return null;
    }
    /**
     * 获得小程序手机
     * @param code
     * @param encryptedData
     * @param iv
     */
    async miniPhone(code, encryptedData, iv) {
        const session = await this.miniSession(code);
        if (session.errcode) {
            throw new core_1.CoolCommException('获取手机号失败，请刷新重试');
        }
        const result = await this.miniDecryptData(encryptedData, iv, session.session_key);
        return result.phoneNumber;
    }
    /**
     * 小程序信息解密
     * @param encryptedData
     * @param iv
     * @param sessionKey
     */
    async miniDecryptData(encryptedData, iv, sessionKey) {
        const app = await this.getMiniApp();
        const utils = app.getUtils();
        return await utils.decryptSession(sessionKey, iv, encryptedData);
    }
};
exports.UserWxService = UserWxService;
__decorate([
    (0, core_2.Config)('module.user'),
    __metadata("design:type", Object)
], UserWxService.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_2.UserInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserWxService.prototype, "userInfoEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(wx_1.UserWxEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserWxService.prototype, "userWxEntity", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_1.PluginService)
], UserWxService.prototype, "pluginService", void 0);
exports.UserWxService = UserWxService = __decorate([
    (0, core_2.Provide)()
], UserWxService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy91c2VyL3NlcnZpY2Uvd3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQW1FO0FBQ25FLHlDQUF5RDtBQUN6RCwrQ0FBc0Q7QUFDdEQsaUNBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMscUNBQTRDO0FBQzVDLCtCQUFrQztBQUNsQyxvREFBMEQ7QUFDMUQseUNBQWdEO0FBQ2hELHFDQUE0QztBQUU1Qzs7R0FFRztBQUVJLElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWMsU0FBUSxrQkFBVztJQWE1Qzs7O09BR0c7SUFDSCxLQUFLLENBQUMsU0FBUztRQUNiLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFRLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLElBQUksd0JBQWlCLENBQ3pCLFNBQVMsQ0FDVixDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sUUFBUSxHQUFRLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsa0JBQWtCO1FBQ3RCLE1BQU0sUUFBUSxHQUFRLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLE9BQU8sUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsZUFBZTtRQUNuQixNQUFNLFFBQVEsR0FBUSxNQUFNLElBQUksQ0FBQyxT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