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
exports.BaseSysConfService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const conf_1 = require("../../entity/sys/conf");
/**
 * 系统配置
 */
let BaseSysConfService = class BaseSysConfService extends core_2.BaseService {
    /**
     * 获得配置参数值
     * @param key
     */
    async getValue(key) {
        const conf = await this.baseSysConfEntity.findOneBy({ cKey: key });
        if (conf) {
            return conf.cValue;
        }
    }
    /**
     * 更新配置参数
     * @param cKey
     * @param cValue
     */
    async updateVaule(cKey, cValue) {
        await this.baseSysConfEntity
            .createQueryBuilder()
            .update()
            .where({ cKey })
            .set({ cKey, cValue })
            .execute();
    }
};
exports.BaseSysConfService = BaseSysConfService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(conf_1.BaseSysConfEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysConfService.prototype, "baseSysConfEntity", void 0);
exports.BaseSysConfService = BaseSysConfService = __decorate([
    (0, core_1.Provide)()
], BaseSysConfService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvY29uZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsNENBQWdEO0FBQ2hELCtDQUFzRDtBQUN0RCxxQ0FBcUM7QUFDckMsZ0RBQTBEO0FBRTFEOztHQUVHO0FBRUksSUFBTSxrQkFBa0IsR0FBeEIsTUFBTSxrQkFBbUIsU0FBUSxrQkFBVztJQUlqRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUc7UUFDaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNO1FBQzVCLE1BQU0sSUFBSSxDQUFDLGlCQUFpQjthQUN6QixrQkFBa0IsRUFBRTthQUNwQixNQUFNLEVBQUU7YUFDUixLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUNmLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUNyQixPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7Q0FDRixDQUFBO0FBNUJZLGdEQUFrQjtBQUU3QjtJQURDLElBQUEsMkJBQWlCLEVBQUMsd0JBQWlCLENBQUM7OEJBQ2xCLG9CQUFVOzZEQUFvQjs2QkFGdEMsa0JBQWtCO0lBRDlCLElBQUEsY0FBTyxHQUFFO0dBQ0csa0JBQWtCLENBNEI5QiJ9