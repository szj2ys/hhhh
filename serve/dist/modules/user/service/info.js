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
exports.UserInfoService = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const typeorm_1 = require("@midwayjs/typeorm");
const md5 = require("md5");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const info_1 = require("../../plugin/service/info");
const info_2 = require("../entity/info");
const sms_1 = require("./sms");
const wx_1 = require("./wx");
const user_1 = require("../../base/entity/sys/user");
const session_1 = require("../../flow/entity/session");
const data_1 = require("../../flow/entity/data");
/**
 * 用户信息
 */
let UserInfoService = class UserInfoService extends core_1.BaseService {
    /**
     * 绑定小程序手机号
     * @param userId
     * @param code
     * @param encryptedData
     * @param iv
     */
    async miniPhone(userId, code, encryptedData, iv) {
        const phone = await this.userWxService.miniPhone(code, encryptedData, iv);
        await this.userInfoEntity.update({ id: (0, typeorm_2.Equal)(userId) }, { phone });
        return phone;
    }
    /**
     * 获取用户信息
     * @param id
     * @returns
     */
    async person(id) {
        // const info = await this.userInfoEntity.findOneBy({ id: Equal(id) });
        const info = await this.baseSysUserEntity.findOneBy({
            id: (0, typeorm_2.Equal)(id),
        });
        delete info.password;
        return info;
    }
    /**
     * 注销
     * @param userId
     */
    async logoff(userId) {
        await this.userInfoEntity.update({ id: userId }, {
            status: 2,
            phone: null,
            unionid: null,
            nickName: `已注销-00${userId}`,
            avatarUrl: null,
        });
    }
    /**
     * 更新用户信息
     * @param id
     * @param param
     * @returns
     */
    async updatePerson(id, param) {
        const info = await this.person(id);
        if (!info)
            throw new core_1.CoolCommException('用户不存在');
        try {
            // 修改了头像要重新处理
            if (param.headImg && info.headImg != param.headImg) {
                const file = await this.pluginService.getInstance('upload');
                param.headImg = await file.downAndUpload(param.headImg, (0, uuid_1.v1)() + '.png');
            }
        }
        catch (err) {
        }
        try {
            return await this.baseSysUserEntity.update({ id }, param);
        }
        catch (err) {
            throw new core_1.CoolCommException('更新失败，参数错误或者手机号已存在');
        }
    }
    /**
     * 更新密码
     * @param userId
     * @param password
     * @param 验证码
     */
    async updatePassword(userId, password, code) {
        const user = await this.userInfoEntity.findOneBy({ id: userId });
        const check = await this.userSmsService.checkCode(user.phone, code);
        if (!check) {
            throw new core_1.CoolCommException('验证码错误');
        }
        await this.userInfoEntity.update(user.id, { password: md5(password) });
    }
    /**
     * 绑定手机号
     * @param userId
     * @param phone
     * @param code
     */
    async bindPhone(userId, phone, code) {
        const check = await this.userSmsService.checkCode(phone, code);
        if (!check) {
            throw new core_1.CoolCommException('验证码错误');
        }
        await this.userInfoEntity.update({ id: userId }, { phone });
    }
    async getHistory(userId, key) {
        if (key)
            return {
                list: await this.flowSessionEntity.findBy({
                    userId,
                    sessionKey: `ai.message.${key}`,
                }),
                data: await this.flowDataEntity.findOneBy({
                    objectId: `${userId}-${key}`
                })
            };
        return await this.flowSessionEntity.findBy({
            userId,
            status: null,
        });
    }
    async postHistory(history) {
        const where = {
            userId: history.userId,
            sessionKey: history.sessionKey,
            index: history.index,
        };
        const result = await this.flowSessionEntity.findOneBy(where);
        if (result === null) {
            await this.flowSessionEntity.save(history);
        }
        else {
            await this.flowSessionEntity.update({ id: result.id }, history);
        }
    }
    async delHistory(userId, key) {
        return await this.flowSessionEntity.delete({
            userId,
            sessionKey: key,
        });
    }
};
exports.UserInfoService = UserInfoService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_2.UserInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserInfoService.prototype, "userInfoEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserInfoService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(session_1.FlowSessionEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserInfoService.prototype, "flowSessionEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(data_1.FlowDataEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserInfoService.prototype, "flowDataEntity", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_1.PluginService)
], UserInfoService.prototype, "pluginService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", sms_1.UserSmsService)
], UserInfoService.prototype, "userSmsService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", wx_1.UserWxService)
], UserInfoService.prototype, "userWxService", void 0);
exports.UserInfoService = UserInfoService = __decorate([
    (0, core_2.Provide)()
], UserInfoService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXIvc2VydmljZS9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFpRTtBQUNqRSx5Q0FBK0M7QUFDL0MsK0NBQW9EO0FBQ3BELDJCQUEyQjtBQUMzQixxQ0FBMEM7QUFDMUMsK0JBQWdDO0FBQ2hDLG9EQUF3RDtBQUN4RCx5Q0FBOEM7QUFDOUMsK0JBQXFDO0FBQ3JDLDZCQUFtQztBQUNuQyxxREFBNkQ7QUFDN0QsdURBQTREO0FBRTVELGlEQUFzRDtBQUV0RDs7R0FFRztBQUVJLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWdCLFNBQVEsa0JBQVc7SUFzQjlDOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBYyxFQUFFLElBQVMsRUFBRSxhQUFrQixFQUFFLEVBQU87UUFDcEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBQyxFQUFFLEVBQUUsSUFBQSxlQUFLLEVBQUMsTUFBTSxDQUFDLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDL0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNiLHVFQUF1RTtRQUN2RSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7WUFDbEQsRUFBRSxFQUFFLElBQUEsZUFBSyxFQUFDLEVBQUUsQ0FBQztTQUNkLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJ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