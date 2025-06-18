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
exports.BaseAuthorityMiddleware = void 0;
const core_1 = require("@midwayjs/core");
const _ = require("lodash");
const core_2 = require("@cool-midway/core");
const jwt = require("jsonwebtoken");
const core_3 = require("@midwayjs/core");
const cache_manager_1 = require("@midwayjs/cache-manager");
const utils_1 = require("../../../comm/utils");
/**
 * 权限校验
 */
let BaseAuthorityMiddleware = class BaseAuthorityMiddleware {
    constructor() {
        this.ignoreUrls = [];
    }
    async init() {
        this.ignoreUrls = this.coolUrlTagData.byKey(core_2.TagTypes.IGNORE_TOKEN, 'admin');
    }
    resolve() {
        return async (ctx, next) => {
            let statusCode = 200;
            let { url } = ctx;
            url = url.replace(this.prefix, '').split('?')[0];
            const token = ctx.get('Authorization');
            const adminUrl = '/admin/';
            // 路由地址为 admin前缀的 需要权限校验
            if (_.startsWith(url, adminUrl)) {
                try {
                    ctx.admin = jwt.verify(token, this.jwtConfig.jwt.secret);
                    if (ctx.admin.isRefresh) {
                        ctx.status = 401;
                        throw new core_2.CoolCommException('登录失效~', ctx.status);
                    }
                }
                catch (error) { }
                // 使用matchUrl方法来检查URL是否应该被忽略
                const isIgnored = this.ignoreUrls.some(pattern => this.utils.matchUrl(pattern, url));
                if (isIgnored) {
                    await next();
                    return;
                }
                if (ctx.admin) {
                    const rToken = await this.midwayCache.get(`admin:token:${ctx.admin.userId}`);
                    // 判断密码版本是否正确
                    const passwordV = await this.midwayCache.get(`admin:passwordVersion:${ctx.admin.userId}`);
                    if (passwordV != ctx.admin.passwordVersion) {
                        throw new core_2.CoolCommException('登录失效~', 401);
                    }
                    // 超管拥有所有权限
                    if (ctx.admin.username == 'admin' && !ctx.admin.isRefresh) {
                        if (rToken !== token && this.jwtConfig.jwt.sso) {
                            throw new core_2.CoolCommException('登录失效~', 401);
                        }
                        else {
                            await next();
                            return;
                        }
                    }
                    // 要登录每个人都有权限的接口
                    if (new RegExp(`^${adminUrl}?.*/comm/`).test(url) ||
                        // 字典接口
                        url == '/admin/dict/info/data') {
                        await next();
                        return;
                    }
                    // 如果传的token是refreshToken则校验失败
                    if (ctx.admin.isRefresh) {
                        throw new core_2.CoolCommException('登录失效~', 401);
                    }
                    if (!rToken) {
                        throw new core_2.CoolCommException('登录失效或无权限访问~', 401);
                    }
                    if (rToken !== token && this.jwtConfig.jwt.sso) {
                        statusCode = 401;
                    }
                    else {
                        let perms = await this.midwayCache.get(`admin:perms:${ctx.admin.userId}`);
                        if (!_.isEmpty(perms)) {
                            perms = perms.map(e => {
                                return e.replace(/:/g, '/');
                            });
                            if (!perms.includes(url.split('?')[0].replace('/admin/', ''))) {
                                statusCode = 403;
                            }
                        }
                        else {
                            statusCode = 403;
                        }
                    }
                }
                else {
                    statusCode = 401;
                }
                if (statusCode > 200) {
                    throw new core_2.CoolCommException('登录失效或无权限访问~', statusCode);
                }
            }
            await next();
        };
    }
};
exports.BaseAuthorityMiddleware = BaseAuthorityMiddleware;
__decorate([
    (0, core_1.Config)('koa.globalPrefix'),
    __metadata("design:type", Object)
], BaseAuthorityMiddleware.prototype, "prefix", void 0);
__decorate([
    (0, core_1.Config)('module.base'),
    __metadata("design:type", Object)
], BaseAuthorityMiddleware.prototype, "jwtConfig", void 0);
__decorate([
    (0, core_3.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], BaseAuthorityMiddleware.prototype, "midwayCache", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_2.CoolUrlTagData)
], BaseAuthorityMiddleware.prototype, "coolUrlTagData", void 0);
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], BaseAuthorityMiddleware.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], BaseAuthorityMiddleware.prototype, "utils", void 0);
__decorate([
    (0, core_3.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAuthorityMiddleware.prototype, "init", null);
exports.BaseAuthorityMiddleware = BaseAuthorityMiddleware = __decorate([
    (0, core_1.Middleware)()
], BaseAuthorityMiddleware);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9taWRkbGV3YXJlL2F1dGhvcml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUU7QUFDakUsNEJBQTRCO0FBQzVCLDRDQUFnRjtBQUNoRixvQ0FBb0M7QUFFcEMseUNBS3dCO0FBQ3hCLDJEQUFzRTtBQUN0RSwrQ0FBNEM7QUFFNUM7O0dBRUc7QUFFSSxJQUFNLHVCQUF1QixHQUE3QixNQUFNLHVCQUF1QjtJQUE3QjtRQXFCTCxlQUFVLEdBQWEsRUFBRSxDQUFDO0lBOEY1QixDQUFDO0lBM0ZPLEFBQU4sS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGVBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1lBQ2hELElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUNyQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQzNCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQztvQkFDSCxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6RCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ3hCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO3dCQUNqQixNQUFNLElBQUksd0JBQWlCLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbkQsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQSxDQUFDO2dCQUNsQiw0QkFBNEI7Z0JBQzVCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDbEMsQ0FBQztnQkFDRixJQUFJLFNBQVMsRUFBRSxDQUFDO29CQUNkLE1BQU0sSUFBSSxFQUFFLENBQUM7b0JBQ2IsT0FBTztnQkFDVCxDQUFDO2dCQUNELElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNkLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ3ZDLGVBQWUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FDbEMsQ0FBQztvQkFDRixhQUFhO29CQUNiLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQzFDLHlCQUF5QixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUM1QyxDQUFDO29CQUNGLElBQUksU0FBUyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7d0JBQzNDLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzVDLENBQUM7b0JBQ0QsV0FBVztvQkFDWCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQzFELElBQUksTUFBTSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDL0MsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDNUMsQ0FBQzs2QkFBTSxDQUFDOzRCQUNOLE1BQU0sSUFBSSxFQUFFLENBQUM7NEJBQ2IsT0FBTzt3QkFDVCxDQUFDO29CQUNILENBQUM7b0JBQ0QsZ0JBQWdCO29CQUNoQixJQUNFLElBQUksTUFBTSxDQUFDLElBQUksUUFBUSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUM3QyxPQUFPO3dCQUNQLEdBQUcsSUFBSSx1QkFBdUIsRUFDOUIsQ0FBQzt3QkFDRCxNQUFNLElBQUksRUFBRSxDQUFDO3dCQUNiLE9BQU87b0JBQ1QsQ0FBQztvQkFDRCw4QkFBOEI7b0JBQzlCLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDeEIsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDNUMsQ0FBQztvQkFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ1osTUFBTSxJQUFJLHdCQUFpQixDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDbEQsQ0FBQztvQkFDRCxJQUFJLE1BQU0sS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQy9DLFVBQVUsR0FBRyxHQUFHLENBQUM7b0JBQ25CLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixJQUFJLEtBQUssR0FBYSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUM5QyxlQUFlLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQ2xDLENBQUM7d0JBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs0QkFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQ3BCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQzlCLENBQUMsQ0FBQyxDQUFDOzRCQUNILElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQzlELFVBQVUsR0FBRyxHQUFHLENBQUM7NEJBQ25CLENBQUM7d0JBQ0gsQ0FBQzs2QkFBTSxDQUFDOzRCQUNOLFVBQVUsR0FBRyxHQUFHLENBQUM7d0JBQ25CLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sVUFBVSxHQUFHLEdBQUcsQ0FBQztnQkFDbkIsQ0FBQztnQkFDRCxJQUFJLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQztvQkFDckIsTUFBTSxJQUFJLHdCQUFpQixDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDekQsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFuSFksMERBQXVCO0FBSWxDO0lBREMsSUFBQSxhQUFNLEVBQUMsa0JBQWtCLENBQUM7O3VEQUNwQjtBQUdQO0lBREMsSUFBQSxhQUFNLEVBQUMsYUFBYSxDQUFDOzswREFDWjtBQUdWO0lBREMsSUFBQSxtQkFBWSxFQUFDLDhCQUFjLEVBQUUsU0FBUyxDQUFDOzs0REFDZjtBQUd6QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNPLHFCQUFjOytEQUFDO0FBRy9CO0lBREMsSUFBQSxVQUFHLEdBQUU7O29EQUNrQjtBQUd4QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNGLGFBQUs7c0RBQUM7QUFLUDtJQURMLElBQUEsV0FBSSxHQUFFOzs7O21EQUdOO2tDQTFCVSx1QkFBdUI7SUFEbkMsSUFBQSxpQkFBVSxHQUFFO0dBQ0EsdUJBQXVCLENBbUhuQyJ9