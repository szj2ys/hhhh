import {BaseService, CoolCommException} from '@cool-midway/core';
import {Inject, Provide} from '@midwayjs/core';
import {InjectEntityModel} from '@midwayjs/typeorm';
import * as md5 from 'md5';
import {Equal, Repository} from 'typeorm';
import {v1 as uuid} from 'uuid';
import {PluginService} from '../../plugin/service/info';
import {UserInfoEntity} from '../entity/info';
import {UserSmsService} from './sms';
import {UserWxService} from './wx';
import {BaseSysUserEntity} from "../../base/entity/sys/user";
import {FlowSessionEntity} from "../../flow/entity/session";
import {number} from "zod";
import {FlowDataEntity} from "../../flow/entity/data";

/**
 * 用户信息
 */
@Provide()
export class UserInfoService extends BaseService {
  @InjectEntityModel(UserInfoEntity)
  userInfoEntity: Repository<UserInfoEntity>;

  @InjectEntityModel(BaseSysUserEntity)
  baseSysUserEntity: Repository<BaseSysUserEntity>;

  @InjectEntityModel(FlowSessionEntity)
  flowSessionEntity: Repository<FlowSessionEntity>;

  @InjectEntityModel(FlowDataEntity)
  flowDataEntity: Repository<FlowDataEntity>;

  @Inject()
  pluginService: PluginService;

  @Inject()
  userSmsService: UserSmsService;

  @Inject()
  userWxService: UserWxService;

  /**
   * 绑定小程序手机号
   * @param userId
   * @param code
   * @param encryptedData
   * @param iv
   */
  async miniPhone(userId: number, code: any, encryptedData: any, iv: any) {
    const phone = await this.userWxService.miniPhone(code, encryptedData, iv);
    await this.userInfoEntity.update({id: Equal(userId)}, {phone});
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
      id: Equal(id),
    });
    delete info.password;
    return info;
  }

  /**
   * 注销
   * @param userId
   */
  async logoff(userId: number) {
    await this.userInfoEntity.update(
      {id: userId},
      {
        status: 2,
        phone: null,
        unionid: null,
        nickName: `已注销-00${userId}`,
        avatarUrl: null,
      }
    );
  }

  /**
   * 更新用户信息
   * @param id
   * @param param
   * @returns
   */
  async updatePerson(id, param) {
    const info = await this.person(id);
    if (!info) throw new CoolCommException('用户不存在');
    try {
      // 修改了头像要重新处理
      if (param.headImg && info.headImg != param.headImg) {
        const file = await this.pluginService.getInstance('upload');
        param.headImg = await file.downAndUpload(
          param.headImg,
          uuid() + '.png'
        );
      }
    } catch (err) {
    }
    try {
      return await this.baseSysUserEntity.update({id}, param);
    } catch (err) {
      throw new CoolCommException('更新失败，参数错误或者手机号已存在');
    }
  }

  /**
   * 更新密码
   * @param userId
   * @param password
   * @param 验证码
   */
  async updatePassword(userId, password, code) {
    const user = await this.userInfoEntity.findOneBy({id: userId});
    const check = await this.userSmsService.checkCode(user.phone, code);
    if (!check) {
      throw new CoolCommException('验证码错误');
    }
    await this.userInfoEntity.update(user.id, {password: md5(password)});
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
      throw new CoolCommException('验证码错误');
    }
    await this.userInfoEntity.update({id: userId}, {phone});
  }

  async getHistory(userId: number, key: string) {
    if (key) return {
      list: await this.flowSessionEntity.findBy({
        userId,
        sessionKey: `ai.message.${key}`,
      }),
      data: await this.flowDataEntity.findOneBy({
        objectId: `${userId}-${key}`
      })
    }
    return await this.flowSessionEntity.findBy({
      userId,
      status: null,
    })
  }

  async postHistory(history: FlowSessionEntity) {
    const where = {
      userId: history.userId,
      sessionKey: history.sessionKey,
      index: history.index,
    }
    const result = await this.flowSessionEntity.findOneBy(where);
    if (result === null) {
      await this.flowSessionEntity.save(history);
    } else {
      await this.flowSessionEntity.update({id: result.id}, history);
    }
  }

  async delHistory(userId: number, key: string) {
    return await this.flowSessionEntity.delete({
      userId,
      sessionKey: key,
    })
  }
}
