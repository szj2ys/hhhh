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
exports.UserSmsService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const _ = require("lodash");
const cache_manager_1 = require("@midwayjs/cache-manager");
const info_1 = require("../../plugin/service/info");
/**
 * 描述
 */
let UserSmsService = class UserSmsService extends core_2.BaseService {
    async init() {
        for (const key of ['sms-tx', 'sms-ali']) {
            try {
                this.plugin = await this.pluginService.getInstance(key);
                if (this.plugin) {
                    this.config.pluginKey = key;
                    break;
                }
            }
            catch (e) {
                continue;
            }
        }
    }
    /**
     * 发送验证码
     * @param phone
     */
    async sendSms(phone) {
        // 随机四位验证码
        const code = _.random(1000, 9999);
        const pluginKey = this.config.pluginKey;
        if (!this.plugin)
            throw new core_2.CoolCommException('未配置短信插件，');
        try {
            if (pluginKey == 'sms-tx') {
                await this.plugin.send([phone], [code]);
            }
            if (pluginKey == 'sms-ali') {
                await this.plugin.send([phone], {
                    code,
                });
            }
            this.midwayCache.set(`sms:${phone}`, code, this.config.timeout * 1000);
        }
        catch (error) {
            throw new core_2.CoolCommException('发送过于频繁，请稍后再试');
        }
    }
    /**
     * 验证验证码
     * @param phone
     * @param code
     * @returns
     */
    async checkCode(phone, code) {
        const cacheCode = await this.midwayCache.get(`sms:${phone}`);
        if (code && cacheCode == code) {
            return true;
        }
        return false;
    }
};
exports.UserSmsService = UserSmsService;
__decorate([
    (0, core_1.Config)('module.user.sms'),
    __metadata("design:type", Object)
], UserSmsService.prototype, "config", void 0);
__decorate([
    (0, core_1.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], UserSmsService.prototype, "midwayCache", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.PluginService)
], UserSmsService.prototype, "pluginService", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserSmsService.prototype, "init", null);
exports.UserSmsService = UserSmsService = __decorate([
    (0, core_1.Provide)()
], UserSmsService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvdXNlci9zZXJ2aWNlL3Ntcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkU7QUFDN0UsNENBQW1FO0FBQ25FLDRCQUE0QjtBQUM1QiwyREFBc0U7QUFDdEUsb0RBQTBEO0FBRTFEOztHQUVHO0FBRUksSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBZSxTQUFRLGtCQUFXO0lBY3ZDLEFBQU4sS0FBSyxDQUFDLElBQUk7UUFDUixLQUFLLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDO2dCQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztvQkFDNUIsTUFBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1gsU0FBUztZQUNYLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSztRQUNqQixVQUFVO1FBQ1YsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQ2QsTUFBTSxJQUFJLHdCQUFpQixDQUN6QixVQUFVLENBQ1gsQ0FBQztRQUNKLElBQUksQ0FBQztZQUNILElBQUksU0FBUyxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUMxQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFDRCxJQUFJLFNBQVMsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDM0IsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUM5QixJQUFJO2lCQUNMLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUN6QixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM3RCxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YsQ0FBQTtBQXBFWSx3Q0FBYztBQUd6QjtJQURDLElBQUEsYUFBTSxFQUFDLGlCQUFpQixDQUFDOzs4Q0FDbkI7QUFHUDtJQURDLElBQUEsbUJBQVksRUFBQyw4QkFBYyxFQUFFLFNBQVMsQ0FBQzs7bURBQ2Y7QUFHekI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTSxvQkFBYTtxREFBQztBQUt2QjtJQURMLElBQUEsV0FBSSxHQUFFOzs7OzBDQWFOO3lCQTFCVSxjQUFjO0lBRDFCLElBQUEsY0FBTyxHQUFFO0dBQ0csY0FBYyxDQW9FMUIifQ==