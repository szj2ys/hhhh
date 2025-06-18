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
exports.TenantSubscriber = exports.noTenant = void 0;
const typeorm_1 = require("@midwayjs/typeorm");
const _ = require("lodash");
const core_1 = require("@midwayjs/core");
const utils_1 = require("../../../comm/utils");
const core_2 = require("@cool-midway/core");
/**
 * 不操作租户
 * @param ctx
 * @param func
 */
const noTenant = async (ctx, func) => {
    var _a;
    let result;
    const tenantId = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.admin) === null || _a === void 0 ? void 0 : _a.tenantId;
    if (tenantId) {
        ctx.admin.tenantId = null;
        result = await func();
        ctx.admin.tenantId = tenantId;
    }
    else {
        result = await func();
    }
    return result;
};
exports.noTenant = noTenant;
let TenantSubscriber = class TenantSubscriber {
    constructor() {
        // 系统接口不过滤
        this.ignoreUrls = [
            '/admin/base/open/login',
            '/admin/base/comm/person',
            '/admin/base/comm/permmenu',
            '/admin/dict/info/data',
        ];
        // 不进行租户过滤的用户
        this.ignoreUsername = [];
    }
    /**
     * 获取所有忽略的url
     */
    getAllIgnoreUrls() {
        const adminIgnoreUrls = this.coolUrlTagData.byKey(core_2.TagTypes.IGNORE_TOKEN, 'admin');
        const appIgnoreUrls = this.coolUrlTagData.byKey(core_2.TagTypes.IGNORE_TOKEN, 'app');
        this.ignoreUrls = [
            ...this.ignoreUrls,
            ...adminIgnoreUrls,
            ...appIgnoreUrls,
        ];
        // 去重
        this.ignoreUrls = _.uniq(this.ignoreUrls);
        return this.ignoreUrls;
    }
    /**
     * 检查是否需要租户
     */
    checkHandler() {
        var _a;
        const ctx = this.getCtx();
        if (!ctx)
            return false;
        const url = ctx === null || ctx === void 0 ? void 0 : ctx.url;
        if (!url)
            return false;
        if ((_a = this.tenant) === null || _a === void 0 ? void 0 : _a.enable) {
            const isNeedTenant = this.tenant.urls.some(pattern => this.utils.matchUrl(pattern, url));
            return isNeedTenant;
        }
        return false;
    }
    /**
     * 获取ctx
     */
    getCtx() {
        try {
            const contextManager = this.app
                .getApplicationContext()
                .get(core_1.ASYNC_CONTEXT_MANAGER_KEY);
            return contextManager.active().getValue(core_1.ASYNC_CONTEXT_KEY);
        }
        catch (error) {
            return null;
        }
    }
    /**
     * 从登录的用户中获取租户ID
     * @returns string | undefined
     */
    getTenantId() {
        var _a, _b, _c;
        let ctx, url, tenantId;
        ctx = this.getCtx();
        if (!ctx || !this.checkHandler())
            return undefined;
        url = ctx === null || ctx === void 0 ? void 0 : ctx.url;
        // 忽略用户
        if (this.ignoreUsername.includes((_a = ctx === null || ctx === void 0 ? void 0 : ctx.admin) === null || _a === void 0 ? void 0 : _a.username)) {
            return undefined;
        }
        // 忽略系统接口
        if (this.getAllIgnoreUrls().some(pattern => this.utils.matchUrl(pattern, url))) {
            return undefined;
        }
        if (_.startsWith(url, '/admin/')) {
            tenantId = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.admin) === null || _b === void 0 ? void 0 : _b.tenantId;
        }
        else if (_.startsWith(url, '/app/')) {
            tenantId = (_c = ctx === null || ctx === void 0 ? void 0 : ctx.user) === null || _c === void 0 ? void 0 : _c.tenantId;
        }
        if (tenantId && url) {
            return tenantId;
        }
        return undefined;
    }
    /**
     * 查询时添加租户ID条件
     * @param queryBuilder
     */
    afterSelectQueryBuilder(queryBuilder) {
        var _a;
        if (!((_a = this.tenant) === null || _a === void 0 ? void 0 : _a.enable))
            return;
        const tenantId = this.getTenantId();
        if (tenantId) {
            queryBuilder.andWhere(`${queryBuilder.alias ? queryBuilder.alias + '.' : ''}tenantId = '${tenantId}'`);
        }
    }
    /**
     * 插入时添加租户ID
     * @param queryBuilder
     */
    afterInsertQueryBuilder(queryBuilder) {
        var _a;
        if (!((_a = this.tenant) === null || _a === void 0 ? void 0 : _a.enable))
            return;
        const tenantId = this.getTenantId();
        if (tenantId) {
            const values = queryBuilder.expressionMap.valuesSet;
            if (Array.isArray(values)) {
                queryBuilder.values(values.map(item => ({ ...item, tenantId })));
            }
            else if (typeof values === 'object') {
                queryBuilder.values({ ...values, tenantId });
            }
        }
    }
    /**
     * 更新时添加租户ID和条件
     * @param queryBuilder
     */
    afterUpdateQueryBuilder(queryBuilder) {
        var _a;
        if (!((_a = this.tenant) === null || _a === void 0 ? void 0 : _a.enable))
            return;
        const tenantId = this.getTenantId();
        if (tenantId) {
            queryBuilder.andWhere(`tenantId = '${tenantId}'`);
        }
    }
    /**
     * 删除时添加租户ID和条件
     * @param queryBuilder
     */
    afterDeleteQueryBuilder(queryBuilder) {
        var _a;
        if (!((_a = this.tenant) === null || _a === void 0 ? void 0 : _a.enable))
            return;
        const tenantId = this.getTenantId();
        if (tenantId) {
            queryBuilder.andWhere(`tenantId = '${tenantId}'`);
        }
    }
};
exports.TenantSubscriber = TenantSubscriber;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], TenantSubscriber.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], TenantSubscriber.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_2.CoolUrlTagData)
], TenantSubscriber.prototype, "coolUrlTagData", void 0);
__decorate([
    (0, core_1.Config)('cool.tenant'),
    __metadata("design:type", Object)
], TenantSubscriber.prototype, "tenant", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], TenantSubscriber.prototype, "utils", void 0);
exports.TenantSubscriber = TenantSubscriber = __decorate([
    (0, typeorm_1.EventSubscriberModel)()
], TenantSubscriber);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9kYi90ZW5hbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQXlEO0FBUXpELDRCQUE0QjtBQUM1Qix5Q0FTd0I7QUFDeEIsK0NBQTRDO0FBQzVDLDRDQUE2RDtBQUU3RDs7OztHQUlHO0FBQ0ksTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTs7SUFDMUMsSUFBSSxNQUFNLENBQUM7SUFDWCxNQUFNLFFBQVEsR0FBRyxNQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxLQUFLLDBDQUFFLFFBQVEsQ0FBQztJQUN0QyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNoQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFYVyxRQUFBLFFBQVEsWUFXbkI7QUFHSyxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUF0QjtRQWtCTCxVQUFVO1FBQ1YsZUFBVSxHQUFHO1lBQ1gsd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6QiwyQkFBMkI7WUFDM0IsdUJBQXVCO1NBQ3hCLENBQUM7UUFFRixhQUFhO1FBQ2IsbUJBQWMsR0FBRyxFQUFFLENBQUM7SUFnSnRCLENBQUM7SUEzSUM7O09BRUc7SUFDSCxnQkFBZ0I7UUFDZCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FDL0Ms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