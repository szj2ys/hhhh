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
exports.PluginSocketTokenMiddleware = void 0;
const core_1 = require("@midwayjs/core");
const jwt = require("jsonwebtoken");
let PluginSocketTokenMiddleware = class PluginSocketTokenMiddleware {
    resolve() {
        return async (ctx, next) => {
            try {
                // 获得连接参数
                const isAdmin = ctx.handshake.auth.isAdmin;
                const token = ctx.handshake.auth.token;
                const data = jwt.verify(token, isAdmin ? this.adminJwtConfig.secret : this.appJwtConfig.secret);
                ctx.connData = {
                    userId: isAdmin ? data.userId : data.id,
                    isAdmin,
                };
            }
            catch (error) {
                ctx.emit('sys', '连接失败');
                return;
            }
            // 这边可以写一些逻辑，比如校验token
            return await next();
        };
    }
};
exports.PluginSocketTokenMiddleware = PluginSocketTokenMiddleware;
__decorate([
    (0, core_1.Config)('module.user.jwt'),
    __metadata("design:type", Object)
], PluginSocketTokenMiddleware.prototype, "appJwtConfig", void 0);
__decorate([
    (0, core_1.Config)('module.base.jwt'),
    __metadata("design:type", Object)
], PluginSocketTokenMiddleware.prototype, "adminJwtConfig", void 0);
exports.PluginSocketTokenMiddleware = PluginSocketTokenMiddleware = __decorate([
    (0, core_1.Middleware)()
], PluginSocketTokenMiddleware);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wbHVnaW4vdm9pY2Uvc29ja2V0L21pZGRsZXdhcmUvdG9rZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9EO0FBRXBELG9DQUFvQztBQUc3QixJQUFNLDJCQUEyQixHQUFqQyxNQUFNLDJCQUEyQjtJQU90QyxPQUFPO1FBQ0wsT0FBTyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQWtCLEVBQUUsRUFBRTtZQUN2QyxJQUFJLENBQUM7Z0JBQ0gsU0FBUztnQkFDVCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQzNDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FDckIsS0FBSyxFQUNMLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUNoRSxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxRQUFRLEdBQUc7b0JBQ2IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3ZDLE9BQU87aUJBQ1IsQ0FBQztZQUNKLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QixPQUFPO1lBQ1QsQ0FBQztZQUNELHNCQUFzQjtZQUN0QixPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUE3Qlksa0VBQTJCO0FBRXRDO0lBREMsSUFBQSxhQUFNLEVBQUMsaUJBQWlCLENBQUM7O2lFQUNiO0FBR2I7SUFEQyxJQUFBLGFBQU0sRUFBQyxpQkFBaUIsQ0FBQzs7bUVBQ1g7c0NBTEosMkJBQTJCO0lBRHZDLElBQUEsaUJBQVUsR0FBRTtHQUNBLDJCQUEyQixDQTZCdkMifQ==