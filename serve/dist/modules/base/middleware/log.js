"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLogMiddleware = void 0;
const core_1 = require("@midwayjs/core");
const log_1 = require("../service/sys/log");
/**
 * 日志中间件
 */
let BaseLogMiddleware = class BaseLogMiddleware {
    resolve() {
        return async (ctx, next) => {
            const baseSysLogService = await ctx.requestContext.getAsync(log_1.BaseSysLogService);
            baseSysLogService.record(ctx, ctx.url, ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body, ctx.admin ? ctx.admin.userId : null);
            await next();
        };
    }
};
exports.BaseLogMiddleware = BaseLogMiddleware;
exports.BaseLogMiddleware = BaseLogMiddleware = __decorate([
    (0, core_1.Middleware)()
], BaseLogMiddleware);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9taWRkbGV3YXJlL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBNEM7QUFJNUMsNENBQXVEO0FBRXZEOztHQUVHO0FBRUksSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBaUI7SUFDNUIsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDaEQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUN6RCx1QkFBaUIsQ0FDbEIsQ0FBQztZQUNGLGlCQUFpQixDQUFDLE1BQU0sQ0FDdEIsR0FBRyxFQUNILEdBQUcsQ0FBQyxHQUFHLEVBQ1AsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQy9ELEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3BDLENBQUM7WUFDRixNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFmWSw4Q0FBaUI7NEJBQWpCLGlCQUFpQjtJQUQ3QixJQUFBLGlCQUFVLEdBQUU7R0FDQSxpQkFBaUIsQ0FlN0IifQ==