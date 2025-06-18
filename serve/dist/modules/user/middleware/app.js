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
exports.UserMiddleware = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@midwayjs/core");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const core_3 = require("@cool-midway/core");
const utils_1 = require("../../../comm/utils");
/**
 * 用户
 */
let UserMiddleware = class UserMiddleware {
    constructor() {
        this.ignoreUrls = [];
    }
    async init() {
        this.ignoreUrls = this.coolUrlTagData.byKey(core_3.TagTypes.IGNORE_TOKEN, 'app');
    }
    resolve() {
        return async (ctx, next) => {
            let { url } = ctx;
            url = url.replace(this.prefix, '').split('?')[0];
            if (_.startsWith(url, '/app/')) {
                const token = ctx.get('Authorization');
                try {
                    ctx.user = jwt.verify(token, this.jwtConfig.secret);
                    if (ctx.user.userId) {
                        ctx.user.id = ctx.user.userId;
                    }
                    if (ctx.user.isRefresh) {
                        throw new core_3.CoolCommException('登录失效~');
                    }
                }
                catch (error) { }
                // 使用matchUrl方法来检查URL是否应该被忽略
                const isIgnored = this.ignoreUrls.some(pattern => this.utils.matchUrl(pattern, url));
                if (isIgnored) {
                    await next();
                    return;
                }
                else {
                    if (!ctx.user) {
                        ctx.status = 401;
                        throw new core_3.CoolCommException('登录失效~');
                    }
                }
            }
            await next();
        };
    }
};
exports.UserMiddleware = UserMiddleware;
__decorate([
    (0, core_1.Config)(core_1.ALL),
    __metadata("design:type", Object)
], UserMiddleware.prototype, "coolConfig", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", core_3.CoolUrlTagData)
], UserMiddleware.prototype, "coolUrlTagData", void 0);
__decorate([
    (0, core_1.Config)('module.base.jwt'),
    __metadata("design:type", Object)
], UserMiddleware.prototype, "jwtConfig", void 0);
__decorate([
    (0, core_1.Config)('koa.globalPrefix'),
    __metadata("design:type", Object)
], UserMiddleware.prototype, "prefix", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", utils_1.Utils)
], UserMiddleware.prototype, "utils", void 0);
__decorate([
    (0, core_2.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserMiddleware.prototype, "init", null);
exports.UserMiddleware = UserMiddleware = __decorate([
    (0, core_1.Middleware)()
], UserMiddleware);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvdXNlci9taWRkbGV3YXJlL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUQ7QUFFekQseUNBQTJEO0FBQzNELG9DQUFvQztBQUNwQyw0QkFBNEI7QUFDNUIsNENBQWdGO0FBQ2hGLCtDQUE0QztBQUU1Qzs7R0FFRztBQUVJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFBcEI7UUFXTCxlQUFVLEdBQWEsRUFBRSxDQUFDO0lBOEM1QixDQUFDO0lBckNPLEFBQU4sS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGVBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1lBQ2hELElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDbEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUMvQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUM7b0JBQ0gsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNwRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUNoQyxDQUFDO29CQUVELElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDdkIsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN2QyxDQUFDO2dCQUNILENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFBLENBQUM7Z0JBQ2xCLDRCQUE0QjtnQkFDNUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUNsQyxDQUFDO2dCQUNGLElBQUksU0FBUyxFQUFFLENBQUM7b0JBQ2QsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDYixPQUFPO2dCQUNULENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNkLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO3dCQUNqQixNQUFNLElBQUksd0JBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZDLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUF6RFksd0NBQWM7QUFFekI7SUFEQyxJQUFBLGFBQU0sRUFBQyxVQUFHLENBQUM7O2tEQUNEO0FBR1g7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTyxxQkFBYztzREFBQztBQUkvQjtJQURDLElBQUEsYUFBTSxFQUFDLGlCQUFpQixDQUFDOztpREFDaEI7QUFLVjtJQURDLElBQUEsYUFBTSxFQUFDLGtCQUFrQixDQUFDOzs4Q0FDcEI7QUFHUDtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNGLGFBQUs7NkNBQUM7QUFHUDtJQURMLElBQUEsV0FBSSxHQUFFOzs7OzBDQUdOO3lCQXRCVSxjQUFjO0lBRDFCLElBQUEsaUJBQVUsR0FBRTtHQUNBLGNBQWMsQ0F5RDFCIn0=