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
exports.RecycleDataService = void 0;
const data_1 = require("./../entity/data");
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const moment = require("moment");
const conf_1 = require("../../base/service/sys/conf");
/**
 * 数据回收
 */
let RecycleDataService = class RecycleDataService extends core_2.BaseService {
    /**
     * 恢复数据
     * @param ids
     */
    async restore(ids) {
        for (const id of ids) {
            const info = await this.recycleDataEntity.findOneBy({ id });
            if (!info) {
                continue;
            }
            let entityModel = this.typeORMDataSourceManager
                .getDataSource(info.entityInfo.dataSourceName)
                .getRepository(info.entityInfo.entity);
            await entityModel.save(info.data);
            await this.recycleDataEntity.delete(id);
        }
    }
    /**
     * 记录数据
     * @param params
     */
    async record(params) {
        var _a;
        const { ctx, data, entity } = params;
        if (!(ctx === null || ctx === void 0 ? void 0 : ctx.req))
            return;
        const dataSourceName = this.typeORMDataSourceManager.getDataSourceNameByModel(entity.target);
        const url = ctx === null || ctx === void 0 ? void 0 : ctx.url;
        await this.recycleDataEntity.save({
            entityInfo: {
                dataSourceName,
                entity: entity.target.name,
            },
            url,
            params: (ctx === null || ctx === void 0 ? void 0 : ctx.req.method) === 'GET' ? ctx === null || ctx === void 0 ? void 0 : ctx.request.query : ctx === null || ctx === void 0 ? void 0 : ctx.request.body,
            data,
            count: data.length,
            userId: _.startsWith(url, '/admin/') ? ctx === null || ctx === void 0 ? void 0 : ctx.admin.userId : (_a = ctx === null || ctx === void 0 ? void 0 : ctx.user) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    /**
     * 日志
     * @param isAll 是否清除全部
     */
    async clear(isAll) {
        if (isAll) {
            await this.recycleDataEntity.clear();
            return;
        }
        const keepDay = await this.baseSysConfService.getValue('recycleKeep');
        if (keepDay) {
            const beforeDate = moment().add(-keepDay, 'days').startOf('day').toDate();
            await this.recycleDataEntity.delete({ createTime: (0, typeorm_2.LessThan)(beforeDate) });
        }
        else {
            await this.recycleDataEntity.clear();
        }
    }
};
exports.RecycleDataService = RecycleDataService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(data_1.RecycleDataEntity),
    __metadata("design:type", typeorm_2.Repository)
], RecycleDataService.prototype, "recycleDataEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", typeorm_1.TypeORMDataSourceManager)
], RecycleDataService.prototype, "typeORMDataSourceManager", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", conf_1.BaseSysConfService)
], RecycleDataService.prototype, "baseSysConfService", void 0);
exports.RecycleDataService = RecycleDataService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Request, { allowDowngrade: true })
], RecycleDataService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JlY3ljbGUvc2VydmljZS9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFxRDtBQUNyRCx5Q0FBbUU7QUFDbkUsNENBQWdEO0FBQ2hELCtDQUFnRjtBQUNoRixxQ0FBK0M7QUFDL0MsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyxzREFBaUU7QUFFakU7O0dBRUc7QUFHSSxJQUFNLGtCQUFrQixHQUF4QixNQUFNLGtCQUFtQixTQUFRLGtCQUFXO0lBVWpEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBYTtRQUN6QixLQUFLLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNWLFNBQVM7WUFDWCxDQUFDO1lBQ0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLHdCQUF3QjtpQkFDNUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO2lCQUM3QyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTTs7UUFDakIsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FB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