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
exports.UserLoginService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const info_1 = require("../entity/info");
const wx_1 = require("./wx");
const jwt = require("jsonwebtoken");
const wx_2 = require("../entity/wx");
const login_1 = require("../../base/service/sys/login");
const sms_1 = require("./sms");
const uuid_1 = require("uuid");
const md5 = require("md5");
const info_2 = require("../../plugin/service/info");
/**
 * 登录
 */
let UserLoginService = class UserLoginService extends core_2.BaseService {
    /**
     * 发送手机验证码
     * @param phone
     * @param captchaId
     * @param code
     */
    async smsCode(phone, captchaId, code) {
        // 1、检查图片验证码  2、发送短信验证码
        const check = await this.baseSysLoginService.captchaCheck(captchaId, code);
        if (!check) {
            throw new core_2.CoolCommException('图片验证码错误');
        }
        await this.userSmsService.sendSms(phone);
    }
    /**
     *  手机验证码登录
     * @param phone
     * @param smsCode
     */
    async phoneVerifyCode(phone, smsCode) {
        // 1、检查短信验证码  2、登录
        const check = await this.userSmsService.checkCode(phone, smsCode);
        if (check) {
            return await this.phone(phone);
        }
        else {
            throw new core_2.CoolCommException('验证码错误');
        }
    }
    /**
     * 小程序手机号登录
     * @param code
     * @param encryptedData
     * @param iv
     */
    async miniPhone(code, encryptedData, iv) {
        const phone = await this.userWxService.miniPhone(code, encryptedData, iv);
        if (phone) {
            return await this.phone(phone);
        }
        else {
            throw new core_2.CoolCommException('获得手机号失败，请检查配置');
        }
    }
    /**
     * 手机号一键登录
     * @param access_token
     * @param openid
     */
    async uniPhone(access_token, openid, appId) {
        const instance = await this.pluginService.getInstance('uniphone');
        const phone = await instance.getPhone(access_token, openid, appId);
        if (phone) {
            return await this.phone(phone);
        }
        else {
            throw new core_2.CoolCommException('获得手机号失败，请检查配置');
        }
    }
    /**
     * 手机登录
     * @param phone
     * @returns
     */
    async phone(phone) {
        let user = await this.userInfoEntity.findOneBy({
            phone: (0, typeorm_2.Equal)(phone),
        });
        if (!user) {
            user = {
                phone,
                unionid: phone,
                loginType: 2,
                nickName: phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2'),
            };
            await this.userInfoEntity.insert(user);
        }
        return this.token({ id: user.id });
    }
    /**
     * 公众号登录
     * @param code
     */
    async mp(code) {
        let wxUserInfo = await this.userWxService.mpUserInfo(code);
        if (wxUserInfo) {
            delete wxUserInfo.privilege;
            wxUserInfo = await this.saveWxInfo({
                openid: wxUserInfo.openid,
                unionid: wxUserInfo.unionid,
                avatarUrl: wxUserInfo.headimgurl,
                nickName: wxUserInfo.nickname,
                gender: wxUserInfo.sex,
                city: wxUserInfo.city,
                province: wxUserInfo.province,
                country: wxUserInfo.country,
            }, 1);
            return this.wxLoginToken(wxUserInfo);
        }
        else {
            throw new Error('微信登录失败');
        }
    }
    /**
     * 微信APP授权登录
     * @param code
     */
    async wxApp(code) {
        let wxUserInfo = await this.userWxService.appUserInfo(code);
        if (wxUserInfo) {
            delete wxUserInfo.privilege;
            wxUserInfo = await this.saveWxInfo({
                openid: wxUserInfo.openid,
                unionid: wxUserInfo.unionid,
                avatarUrl: wxUserInfo.headimgurl,
                nickName: wxUserInfo.nickname,
                gender: wxUserInfo.sex,
                city: wxUserInfo.city,
                province: wxUserInfo.province,
                country: wxUserInfo.country,
            }, 1);
            return this.wxLoginToken(wxUserInfo);
        }
        else {
            throw new Error('微信登录失败');
        }
    }
    /**
     * 保存微信信息
     * @param wxUserInfo
     * @param type
     * @returns
     */
    async saveWxInfo(wxUserInfo, type) {
        const find = { openid: wxUserInfo.openid };
        let wxInfo = await this.userWxEntity.findOneBy(find);
        if (wxInfo) {
            wxUserInfo.id = wxInfo.id;
        }
        return this.userWxEntity.save({
            ...wxUserInfo,
            type,
        });
    }
    /**
     * 小程序登录
     * @param code
     * @param encryptedData
     * @param iv
     */
    async mini(code, encryptedData, iv) {
        let wxUserInfo = await this.userWxService.miniUserInfo(code, encryptedData, iv);
        if (wxUserInfo) {
            // 保存
            wxUserInfo = await this.saveWxInfo(wxUserInfo, 0);
            return await this.wxLoginToken(wxUserInfo);
        }
    }
    /**
     * 微信登录 获得token
     * @param wxUserInfo 微信用户信息
     * @returns
     */
    async wxLoginToken(wxUserInfo) {
        const unionid = wxUserInfo.unionid ? wxUserInfo.unionid : wxUserInfo.openid;
        let userInfo = await this.userInfoEntity.findOneBy({ unionid });
        if (!userInfo) {
            const file = await this.pluginService.getInstance('upload');
            const avatarUrl = await file.downAndUpload(wxUserInfo.avatarUrl, (0, uuid_1.v1)() + '.png');
            userInfo = {
                unionid,
                nickName: wxUserInfo.nickName,
                avatarUrl,
                gender: wxUserInfo.gender,
                loginType: wxUserInfo.type,
            };
            await this.userInfoEntity.insert(userInfo);
        }
        return this.token({ id: userInfo.id });
    }
    /**
     * 刷新token
     * @param refreshToken
     */
    async refreshToken(refreshToken) {
        try {
            const info = jwt.verify(refreshToken, this.jwtConfig.secret);
            if (!info['isRefresh']) {
                throw new core_2.CoolCommException('token类型非refreshToken');
            }
            const userInfo = await this.userInfoEntity.findOneBy({
                id: info['id'],
            });
            return this.token({ id: userInfo.id });
        }
        catch (e) {
            throw new core_2.CoolCommException('刷新token失败，请检查refreshToken是否正确或过期');
        }
    }
    /**
     * 密码登录
     * @param phone
     * @param password
     */
    async password(phone, password) {
        const user = await this.userInfoEntity.findOneBy({ phone });
        if (user && user.password == md5(password)) {
            return this.token({
                id: user.id,
            });
        }
        else {
            throw new core_2.CoolCommException('账号或密码错误');
        }
    }
    /**
     * 获得token
     * @param info
     * @returns
     */
    async token(info) {
        const { expire, refreshExpire } = this.jwtConfig;
        return {
            expire,
            token: await this.generateToken(info),
            refreshExpire,
            refreshToken: await this.generateToken(info, true),
        };
    }
    /**
     * 生成token
     * @param tokenInfo 信息
     * @param roleIds 角色集合
     */
    async generateToken(info, isRefresh = false) {
        const { expire, refreshExpire, secret } = this.jwtConfig;
        const user = await this.userInfoEntity.findOneBy({ id: (0, typeorm_2.Equal)(info.id) });
        const tokenInfo = {
            isRefresh,
            ...info,
            tenantId: user === null || user === void 0 ? void 0 : user.tenantId,
        };
        return jwt.sign(tokenInfo, secret, {
            expiresIn: isRefresh ? refreshExpire : expire,
        });
    }
};
exports.UserLoginService = UserLoginService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.UserInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserLoginService.prototype, "userInfoEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(wx_2.UserWxEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserLoginService.prototype, "userWxEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", wx_1.UserWxService)
], UserLoginService.prototype, "userWxService", void 0);
__decorate([
    (0, core_1.Config)('module.user.jwt'),
    __metadata("design:type", Object)
], UserLoginService.prototype, "jwtConfig", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", login_1.BaseSysLoginService)
], UserLoginService.prototype, "baseSysLoginService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_2.PluginService)
], UserLoginService.prototype, "pluginService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", sms_1.UserSmsService)
], UserLoginService.prototype, "userSmsService", void 0);
exports.UserLoginService = UserLoginService = __decorate([
    (0, core_1.Provide)()
], UserLoginService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy91c2VyL3NlcnZpY2UvbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXlEO0FBQ3pELDRDQUFtRTtBQUNuRSwrQ0FBc0Q7QUFDdEQscUNBQTRDO0FBQzVDLHlDQUFnRDtBQUNoRCw2QkFBcUM7QUFDckMsb0NBQW9DO0FBQ3BDLHFDQUE0QztBQUM1Qyx3REFBbUU7QUFDbkUsK0JBQXVDO0FBQ3ZDLCtCQUFrQztBQUNsQywyQkFBMkI7QUFDM0Isb0RBQTBEO0FBRTFEOztHQUVHO0FBRUksSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBaUIsU0FBUSxrQkFBVztJQXNCL0M7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSTtRQUNsQyx1QkFBdUI7UUFDdkIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxNQUFNLElBQUksd0JBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPO1FBQ2xDLGtCQUFrQjtRQUNsQixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksd0JBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksd0JBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUs7UUFDeEMsTUFBTSxRQUFRLEdBQVEsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RSxNQUFNLEtBQUssR0FBRyxNQUFNLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksd0JBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFhO1FBQ3ZCLElBQUksSUFBSSxHQUFRLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDbEQsS0FBSyxFQUFFLElBQUEsZUFBSyxFQUFDLEtBQUssQ0FBQztTQUNwQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDVixJQUFJLEdBQUc7Z0JBQ0wsS0FBSztnQkFDTCxPQUFPLEVBQUUsS0FBSztnQkFDZCxTQUFTLEVBQUUsQ0FBQztnQkFDWixRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLENBQUM7YUFDN0QsQ0FBQztZQUNGLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFZO1FBQ25CLElBQUksVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUNmLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUM1QixVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUNoQztnQkFDRSxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07Z0JBQ3pCLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztnQkFDM0IsU0FBUyxFQUFFLFVBQVUsQ0FBQyxVQUFVO2dCQUNoQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVE7Z0JBQzdCLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRztnQkFDdEIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO2dCQUNyQixRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVE7Z0JBQzdCLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTzthQUM1QixFQUNELENBQUMsQ0FDRixDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBWTtRQUN0QixJQUFJLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQUksVUFBVSxFQUFFLENBQUM7WUFDZixPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDNUIsVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FDaEM7Z0JBQ0UsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO2dCQUN6QixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87Z0JBQzNCLFNBQVMsRUFBRSxVQUFVLENBQUMsVUFBVTtnQkFDaEMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO2dCQUM3QixNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUc7Z0JBQ3RCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtnQkFDckIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO2dCQUM3QixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87YUFDNUIsRUFDRCxDQUFDLENBQ0YsQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUk7UUFDL0IsTUFBTSxJQUFJLEdBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hELElBQUksTUFBTSxHQUFRLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLFVBQVUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUM1QixHQUFHLFVBQVU7WUFDYixJQUFJO1NBQ0wsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUU7UUFDaEMsSUFBSSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FDcEQsSUFBSSxFQUNKLGFBQWEsRUFDYixFQUFFLENBQ0gsQ0FBQztRQUNGLElBQUksVUFBVSxFQUFFLENBQUM7WUFDZixLQUFLO1lBQ0wsVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVO1FBQzNCLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDNUUsSUFBSSxRQUFRLEdBQVEsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RCxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQ3hDLFVBQVUsQ0FBQyxTQUFTLEVBQ3BCLElBQUEsU0FBSSxHQUFFLEdBQUcsTUFBTSxDQUNoQixDQUFDO1lBQ0YsUUFBUSxHQUFHO2dCQUNULE9BQU87Z0JBQ1AsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO2dCQUM3QixTQUFTO2dCQUNULE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtnQkFDekIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxJQUFJO2FBQzNCLENBQUM7WUFDRixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWTtRQUM3QixJQUFJLENBQUM7WUFDSCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxJQUFJLHdCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Z0JBQ25ELEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsTUFBTSxJQUFJLHdCQUFpQixDQUN6QixrQ0FBa0MsQ0FDbkMsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVE7UUFDNUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFNUQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUMzQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2hCLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTthQUNaLENBQUMsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLHdCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUNkLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3JDLGFBQWE7WUFDYixZQUFZLEVBQUUsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7U0FDbkQsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxHQUFHLEtBQUs7UUFDekMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN6RCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUEsZUFBSyxFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekUsTUFBTSxTQUFTLEdBQUc7WUFDaEIsU0FBUztZQUNULEdBQUcsSUFBSTtZQUNQLFFBQVEsRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUTtTQUN6QixDQUFDO1FBQ0YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDakMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNO1NBQzlDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBbFNZLDRDQUFnQjtBQUUzQjtJQURDLElBQUEsMkJBQWlCLEVBQUMscUJBQWMsQ0FBQzs4QkFDbEIsb0JBQVU7d0RBQWlCO0FBRzNDO0lBREMsSUFBQSwyQkFBaUIsRUFBQyxpQkFBWSxDQUFDOzhCQUNsQixvQkFBVTtzREFBZTtBQUd2QztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNNLGtCQUFhO3VEQUFDO0FBRzdCO0lBREMsSUFBQSxhQUFNLEVBQUMsaUJBQWlCLENBQUM7O21EQUNoQjtBQUdWO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1ksMkJBQW1COzZEQUFDO0FBR3pDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ00sb0JBQWE7dURBQUM7QUFHN0I7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTyxvQkFBYzt3REFBQzsyQkFwQnBCLGdCQUFnQjtJQUQ1QixJQUFBLGNBQU8sR0FBRTtHQUNHLGdCQUFnQixDQWtTNUIifQ==