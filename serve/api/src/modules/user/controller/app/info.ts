import { CoolController, BaseController } from '@cool-midway/core';
import {ALL, Body, Del, Get, Inject, Post, Query} from '@midwayjs/core';
import { UserInfoService } from '../../service/info';
import { UserInfoEntity } from '../../entity/info';
import {FlowSessionEntity} from "../../../flow/entity/session";

/**
 * 用户信息
 */
@CoolController({
  api: [],
  entity: UserInfoEntity,
})
export class AppUserInfoController extends BaseController {
  @Inject()
  ctx;

  @Inject()
  userInfoService: UserInfoService;

  @Get('/person', { summary: '获取用户信息' })
  async person() {
    return this.ok(await this.userInfoService.person(this.ctx.user.userId));
  }

  @Get('/getHistory', { summary: '获取用户聊天历史' })
  async getHistory(@Query('key') key: string) {
    return this.ok(await this.userInfoService.getHistory(this.ctx.user.userId, key));
  }

  // @Body(ALL) user: BaseSysUserEntity
  @Post('/postHistory', { summary: '更新用户聊天历史' })
  async postHistory(@Body(ALL) history: FlowSessionEntity) {
    return this.ok(await this.userInfoService.postHistory(history));
  }

  @Del('/delHistory', { summary: '删除用户聊天历史' })
  async delHistory(@Query('key') key: string) {
    return this.ok(await this.userInfoService.delHistory(this.ctx.user.userId, key));
  }

  @Post('/updatePerson', { summary: '更新用户信息' })
  async updatePerson(@Body() body) {
    return this.ok(
      await this.userInfoService.updatePerson(this.ctx.user.id, body)
    );
  }

  @Post('/updatePassword', { summary: '更新用户密码' })
  async updatePassword(
    @Body('password') password: string,
    @Body('code') code: string
  ) {
    await this.userInfoService.updatePassword(this.ctx.user.id, password, code);
    return this.ok();
  }

  @Post('/logoff', { summary: '注销' })
  async logoff() {
    await this.userInfoService.logoff(this.ctx.user.id);
    return this.ok();
  }

  @Post('/bindPhone', { summary: '绑定手机号' })
  async bindPhone(@Body('phone') phone: string, @Body('code') code: string) {
    await this.userInfoService.bindPhone(this.ctx.user.id, phone, code);
    return this.ok();
  }

  @Post('/miniPhone', { summary: '绑定小程序手机号' })
  async miniPhone(@Body() body) {
    const { code, encryptedData, iv } = body;
    return this.ok(
      await this.userInfoService.miniPhone(
        this.ctx.user.id,
        code,
        encryptedData,
        iv
      )
    );
  }
}
