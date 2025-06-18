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
exports.BaseSysParamService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const param_1 = require("../../entity/sys/param");
const cache_manager_1 = require("@midwayjs/cache-manager");
/**
 * 参数配置
 */
let BaseSysParamService = class BaseSysParamService extends core_2.BaseService {
    /**
     * 根据key获得对应的参数
     * @param key
     */
    async dataByKey(key) {
        let result = await this.midwayCache.get(`param:${key}`);
        if (!result) {
            result = await this.baseSysParamEntity.findOneBy({ keyName: key });
            this.midwayCache.set(`param:${key}`, result);
        }
        if (result) {
            if (result.dataType == 0) {
                try {
                    return JSON.parse(result.data);
                }
                catch (error) {
                    return result.data;
                }
            }
            if (result.dataType == 1) {
                return result.data;
            }
            if (result.dataType == 2) {
                return result.data.split(',');
            }
        }
        return;
    }
    /**
     * 信息
     * @param id
     * @param infoIgnoreProperty
     * @returns
     */
    async info(id, infoIgnoreProperty) {
        const info = await super.info(id, infoIgnoreProperty);
        try {
            info.data = JSON.parse(info.data.replace(/{/g, '[').replace(/}/g, ']'));
        }
        catch (error) {
            info.data = info.data;
        }
        return info;
    }
    /**
     * 根据key获得对应的网页数据
     * @param key
     */
    async htmlByKey(key) {
        let html = '<html><title>@title</title><body>@content</body></html>';
        let result = await this.midwayCache.get(`param:${key}`);
        if (result) {
            html = html
                .replace('@content', result.data)
                .replace('@title', result.name);
        }
        else {
            html = html.replace('@content', 'key notfound');
        }
        return html;
    }
    /**
     * 添加或者修改
     * @param param
     */
    async addOrUpdate(param, type) {
        if (type == 2) {
            param.data = JSON.stringify(param.data.replace());
        }
        const find = {
            keyName: param.keyName,
        };
        if (param.id) {
            find['id'] = (0, typeorm_2.Not)(param.id);
        }
        const check = await this.baseSysParamEntity.findOneBy(find);
        if (check) {
            throw new core_2.CoolCommException('存在相同的keyName');
        }
        await super.addOrUpdate(param, type);
    }
    /**
     * 重新初始化缓存
     */
    async modifyAfter() {
        const params = await this.baseSysParamEntity.find();
        for (const param of params) {
            await this.midwayCache.set(`param:${param.keyName}`, param);
        }
    }
};
exports.BaseSysParamService = BaseSysParamService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(param_1.BaseSysParamEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysParamService.prototype, "baseSysParamEntity", void 0);
__decorate([
    (0, core_1.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], BaseSysParamService.prototype, "midwayCache", void 0);
exports.BaseSysParamService = BaseSysParamService = __decorate([
    (0, core_1.Provide)()
], BaseSysParamService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL3BhcmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF1RDtBQUN2RCw0Q0FBbUU7QUFDbkUsK0NBQXNEO0FBQ3RELHFDQUEwQztBQUMxQyxrREFBNEQ7QUFDNUQsMkRBQXNFO0FBRXRFOztHQUVHO0FBRUksSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBb0IsU0FBUSxrQkFBVztJQU9sRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUc7UUFDakIsSUFBSSxNQUFNLEdBQVEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQztvQkFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7b0JBQ2YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNyQixDQUFDO1lBQ0gsQ0FBQztZQUNELElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxN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