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
exports.KnowConfigService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const interface_1 = require("../interface");
const config_1 = require("../entity/config");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
/**
 * 配置
 */
let KnowConfigService = class KnowConfigService extends core_2.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.knowConfigEntity);
    }
    /**
     * 获得配置
     * @param config 节点
     * @param type 类型
     */
    async config(config, type) {
        return type ? interface_1.Config[config][type] : interface_1.Config[config];
    }
    /**
     * 所有配置
     * @returns
     */
    async all() {
        return interface_1.AllConfig;
    }
    /**
     * 通过名称获取配置
     * @param func 类型
     * @param type 类型
     * @returns
     */
    async getByFunc(func, type) {
        const find = await this.knowConfigEntity.createQueryBuilder('a');
        if (type) {
            find.where('a.type = :type', { type });
        }
        if (func) {
            find.andWhere('a.func = :func', { func });
        }
        return await find.getMany();
    }
};
exports.KnowConfigService = KnowConfigService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(config_1.KnowConfigEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowConfigService.prototype, "knowConfigEntity", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KnowConfigService.prototype, "init", null);
exports.KnowConfigService = KnowConfigService = __decorate([
    (0, core_1.Provide)()
], KnowConfigService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9zZXJ2aWNlL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBK0M7QUFDL0MsNENBQWdEO0FBQ2hELDRDQUFnRTtBQUNoRSw2Q0FBb0Q7QUFDcEQsK0NBQXNEO0FBQ3RELHFDQUFxQztBQUVyQzs7R0FFRztBQUVJLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsa0JBQVc7SUFLMUMsQUFBTixLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQXFCLEVBQUUsSUFBYTtRQUMvQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEdBQUc7UUFDUCxPQUFPLHFCQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFZLEVBQUUsSUFBYTtRQUN6QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELElBQUksSUFBSSxFQUFFLENBQUM7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsT0FBTyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0YsQ0FBQTtBQTNDWSw4Q0FBaUI7QUFFNUI7SUFEQyxJQUFBLDJCQUFpQixFQUFDLHlCQUFnQixDQUFDOzhCQUNsQixvQkFBVTsyREFBbUI7QUFHekM7SUFETCxJQUFBLFdBQUksR0FBRTs7Ozs2Q0FJTjs0QkFSVSxpQkFBaUI7SUFEN0IsSUFBQSxjQUFPLEdBQUU7R0FDRyxpQkFBaUIsQ0EyQzdCIn0=