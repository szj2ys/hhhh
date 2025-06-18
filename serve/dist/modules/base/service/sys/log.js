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
exports.BaseSysLogService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const log_1 = require("../../entity/sys/log");
const moment = require("moment");
const utils_1 = require("../../../../comm/utils");
const conf_1 = require("./conf");
/**
 * 描述
 */
let BaseSysLogService = class BaseSysLogService extends core_2.BaseService {
    /**
     * 记录
     * @param url URL地址
     * @param params 参数
     * @param userId 用户ID
     */
    async record(context, url, params, userId) {
        const ip = await this.utils.getReqIP(context);
        const sysLog = new log_1.BaseSysLogEntity();
        sysLog.userId = userId;
        sysLog.ip = typeof ip === 'string' ? ip : ip.join(',');
        sysLog.action = url.split('?')[0];
        sysLog.params = params;
        await this.baseSysLogEntity.insert(sysLog);
    }
    /**
     * 日志
     * @param isAll 是否清除全部
     */
    async clear(isAll) {
        if (isAll) {
            await this.baseSysLogEntity.clear();
            return;
        }
        const keepDay = await this.baseSysConfService.getValue('logKeep');
        if (keepDay) {
            const beforeDate = moment().add(-keepDay, 'days').startOf('day').toDate();
            await this.baseSysLogEntity.delete({ createTime: (0, typeorm_2.LessThan)(beforeDate) });
        }
        else {
            await this.baseSysLogEntity.clear();
        }
    }
};
exports.BaseSysLogService = BaseSysLogService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysLogService.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], BaseSysLogService.prototype, "utils", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(log_1.BaseSysLogEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysLogService.prototype, "baseSysLogEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", conf_1.BaseSysConfService)
], BaseSysLogService.prototype, "baseSysConfService", void 0);
exports.BaseSysLogService = BaseSysLogService = __decorate([
    (0, core_1.Provide)()
], BaseSysLogService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9zZXJ2aWNlL3N5cy9sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlEO0FBQ2pELDRDQUFnRDtBQUNoRCwrQ0FBc0Q7QUFDdEQscUNBQStDO0FBRS9DLDhDQUF3RDtBQUN4RCxpQ0FBaUM7QUFDakMsa0RBQStDO0FBQy9DLGlDQUE0QztBQUc1Qzs7R0FFRztBQUVJLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsa0JBQVc7SUFhaEQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWdCLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQ2hELE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxzQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFNO1FBQ2hCLElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQyxPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRSxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osTUFBTSxVQUFVLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxRSxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBQSxrQkFBUSxFQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRSxDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3RDLENBQUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTlDWSw4Q0FBaUI7QUFFNUI7SUFEQyxJQUFBLGFBQU0sR0FBRTs7OENBQ0w7QUFHSjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNGLGFBQUs7Z0RBQUM7QUFHYjtJQURDLElBQUEsMkJBQWlCLEVBQUMsc0JBQWdCLENBQUM7OEJBQ2xCLG9CQUFVOzJEQUFtQjtBQUcvQztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNXLHlCQUFrQjs2REFBQzs0QkFYNUIsaUJBQWlCO0lBRDdCLElBQUEsY0FBTyxHQUFFO0dBQ0csaUJBQWlCLENBOEM3QiJ9