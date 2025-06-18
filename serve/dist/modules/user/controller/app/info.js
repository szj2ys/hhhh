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
exports.AppUserInfoController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const info_1 = require("../../service/info");
const info_2 = require("../../entity/info");
const session_1 = require("../../../flow/entity/session");
/**
 * 用户信息
 */
let AppUserInfoController = class AppUserInfoController extends core_1.BaseController {
    async person() {
        return this.ok(await this.userInfoService.person(this.ctx.user.userId));
    }
    async getHistory(key) {
        return this.ok(await this.userInfoService.getHistory(this.ctx.user.userId, key));
    }
    // @Body(ALL) user: BaseSysUserEntity
    async postHistory(history) {
        return this.ok(await this.userInfoService.postHistory(history));
    }
    async delHistory(key) {
        return this.ok(await this.userInfoService.delHistory(this.ctx.user.userId, key));
    }
    async updatePerson(body) {
        return this.ok(await this.userInfoService.updatePerson(this.ctx.user.id, body));
    }
    async updatePassword(password, code) {
        await this.userInfoService.updatePassword(this.ctx.user.id, password, code);
        return this.ok();
    }
    async logoff() {
        await this.userInfoService.logoff(this.ctx.user.id);
        return this.ok();
    }
    async bindPhone(phone, code) {
        await this.userInfoService.bindPhone(this.ctx.user.id, phone, code);
        return this.ok();
    }
    async miniPhone(body) {
        const { code, encryptedData, iv } = body;
        return this.ok(await this.userInfoService.miniPhone(this.ctx.user.id, code, encryptedData, iv));
    }
};
exports.AppUserInfoController = AppUserInfoController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], AppUserInfoController.prototype, "ctx", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_1.UserInfoService)
], AppUserInfoController.prototype, "userInfoService", void 0);
__decorate([
    (0, core_2.Get)('/person', { summary: '获取用户信息' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppUserInfoController.prototype, "person", null);
__decorate([
    (0, core_2.Get)('/getHistory', { summary: '获取用户聊天历史' }),
    __param(0, (0, core_2.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppUserInfoController.prototype, "getHistory", null);
__decorate([
    (0, core_2.Post)('/postHistory', { summary: '更新用户聊天历史' }),
    __param(0, (0, core_2.Body)(core_2.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_1.FlowSessionEntity]),
    __metadata("design:returntype", Promise)
], AppUserInfoController.prototype, "postHistory", null);
__decorate([
    (0, core_2.Del)('/delHistory', { summary: '删除用户聊天历史' }),
    __param(0, (0, core_2.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppUserInfoController.prototype, "delHistory", null);
__decorate([
    (0, core_2.Post)('/updatePerson', { summary: '更新用户信息' }),
    __param(0, (0, core_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUserInfoController.prototype, "updatePerson", null);
__decorate([
    (0, core_2.Post)('/updatePassword', { summary: '更新用户密码' }),
    __param(0, (0, core_2.Body)('password')),
    __param(1, (0, core_2.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppUserInfoController.prototype, "updatePassword", null);
__decorate([
    (0, core_2.Post)('/logoff', { summary: '注销' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppUserInfoController.prototype, "logoff", null);
__decorate([
    (0, core_2.Post)('/bindPhone', { summary: '绑定手机号' }),
    __param(0, (0, core_2.Body)('phone')),
    __param(1, (0, core_2.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppUserInfoController.prototype, "bindPhone", null);
__decorate([
    (0, core_2.Post)('/miniPhone', { summary: '绑定小程序手机号' }),
    __param(0, (0, core_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUserInfoController.prototype, "miniPhone", null);
exports.AppUserInfoController = AppUserInfoController = __decorate([
    (0, core_1.CoolController)({
        api: [],
        entity: info_2.UserInfoEntity,
    })
], AppUserInfoController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXIvY29udHJvbGxlci9hcHAvaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUseUNBQXdFO0FBQ3hFLDZDQUFxRDtBQUNyRCw0Q0FBbUQ7QUFDbkQsMERBQStEO0FBRS9EOztHQUVHO0FBS0ksSUFBTSxxQkFBcUIsR0FBM0IsTUFBTSxxQkFBc0IsU0FBUSxxQkFBYztJQVFqRCxBQUFOLEtBQUssQ0FBQyxNQUFNO1FBQ1YsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsVUFBVSxDQUFlLEdBQVc7UUFDeEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELHFDQUFxQztJQUUvQixBQUFOLEtBQUssQ0FBQyxXQUFXLENBQVksT0FBMEI7UUFDckQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsVUFBVSxDQUFlLEdBQVc7UUFDeEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFD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