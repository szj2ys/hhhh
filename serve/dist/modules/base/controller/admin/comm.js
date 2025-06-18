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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const info_1 = require("../../../plugin/service/info");
const user_1 = require("../../entity/sys/user");
const login_1 = require("../../service/sys/login");
const perms_1 = require("../../service/sys/perms");
const user_2 = require("../../service/sys/user");
/**
 * Base 通用接口 一般写不需要权限过滤的接口
 */
let BaseCommController = class BaseCommController extends core_1.BaseController {
    /**
     * 获得个人信息
     */
    async person() {
        var _a;
        return this.ok(await this.baseSysUserService.person((_a = this.ctx.admin) === null || _a === void 0 ? void 0 : _a.userId));
    }
    /**
     * 修改个人信息
     */
    async personUpdate(user) {
        await this.baseSysUserService.personUpdate(user);
        return this.ok();
    }
    /**
     * 权限菜单
     */
    async permmenu() {
        return this.ok(await this.baseSysPermsService.permmenu(this.ctx.admin.roleIds));
    }
    /**
     * 文件上传
     */
    async upload() {
        const file = await this.pluginService.getInstance('upload');
        return this.ok(await file.upload(this.ctx));
    }
    /**
     * 文件上传模式，本地或者云存储
     */
    async uploadMode() {
        const file = await this.pluginService.getInstance('upload');
        return this.ok(await file.getMode());
    }
    /**
     * 退出
     */
    async logout() {
        await this.baseSysLoginService.logout();
        return this.ok();
    }
    async program() {
        return this.ok('Node');
    }
};
exports.BaseCommController = BaseCommController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", user_2.BaseSysUserService)
], BaseCommController.prototype, "baseSysUserService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseCommController.prototype, "baseSysPermsService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", login_1.BaseSysLoginService)
], BaseCommController.prototype, "baseSysLoginService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], BaseCommController.prototype, "ctx", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_1.PluginService)
], BaseCommController.prototype, "pluginService", void 0);
__decorate([
    (0, core_2.Get)('/person', { summary: '个人信息' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "person", null);
__decorate([
    (0, core_2.Post)('/personUpdate', { summary: '修改个人信息' }),
    __param(0, (0, core_2.Body)(core_2.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.BaseSysUserEntity]),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "personUpdate", null);
__decorate([
    (0, core_2.Get)('/permmenu', { summary: '权限与菜单' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "permmenu", null);
__decorate([
    (0, core_2.Post)('/upload', { summary: '文件上传' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "upload", null);
__decorate([
    (0, core_2.Get)('/uploadMode', { summary: '文件上传模式' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "uploadMode", null);
__decorate([
    (0, core_2.Post)('/logout', { summary: '退出' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "logout", null);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Get)('/program', { summary: '编程' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "program", null);
exports.BaseCommController = BaseCommController = __decorate([
    (0, core_1.CoolUrlTag)(),
    (0, core_2.Provide)(),
    (0, core_1.CoolController)()
], BaseCommController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hZG1pbi9jb21tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQU0yQjtBQUMzQix5Q0FBdUU7QUFFdkUsdURBQTZEO0FBQzdELGdEQUEwRDtBQUMxRCxtREFBOEQ7QUFDOUQsbURBQThEO0FBQzlELGlEQUE0RDtBQUU1RDs7R0FFRztBQUlJLElBQU0sa0JBQWtCLEdBQXhCLE1BQU0sa0JBQW1CLFNBQVEscUJBQWM7SUFnQnBEOztPQUVHO0lBRUcsQUFBTixLQUFLLENBQUMsTUFBTTs7UUFDVixPQUFPLElBQUksQ0FBQyxFQUFFLENBQ1osTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLE1BQU0sQ0FBQyxDQUM3RCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBRUcsQUFBTixLQUFLLENBQUMsWUFBWSxDQUFZLElBQXVCO1FBQ25ELE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFFRyxBQUFOLEtBQUssQ0FBQyxRQUFRO1FBQ1osT0FBTyxJQUFJLENBQUMsRUFBRSxDQUNaLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FDaEUsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUVHLEFBQU4sS0FBSyxDQUFDLE1BQU07UUFDVixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBRUcsQUFBTixLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBRUcsQUFBTixLQUFLLENBQUMsTUFBTTtRQUNWLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFJSyxBQUFOLEtBQUssQ0FBQyxPQUFPO1FBQ1gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRixDQUFBO0FBN0VZLGdEQUFrQjtBQUU3QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNXLHlCQUFrQjs4REFBQztBQUd2QztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNZLDJCQUFtQjsrREFBQztBQUd6QztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNZLDJCQUFtQjsrREFBQztBQUd6QztJQURDLElBQUEsYUFBTSxHQUFFOzsrQ0FDSTtBQUdiO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ00sb0JBQWE7eURBQUM7QUFNdkI7SUFETCxJQUFBLFVBQUcsRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Ozs7Z0RBS25DO0FBTUs7SUFETCxJQUFBLFdBQUksRUFBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDekIsV0FBQSxJQUFBLFdBQUksRUFBQyxVQUFHLENBQUMsQ0FBQTs7cUNBQU8sd0JBQWlCOztzREFHcEQ7QUFNSztJQURMLElBQUEsVUFBRyxFQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7OztrREFLdEM7QUFNSztJQURMLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7OztnREFJcEM7QUFNSztJQURMLElBQUEsVUFBRyxFQUFDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzs7OztvREFJekM7QUFNSztJQURMLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OztnREFJbEM7QUFJSztJQUZMLElBQUEsY0FBTyxFQUFDLGVBQVEsQ0FBQyxZQUFZLENBQUM7SUFDOUIsSUFBQSxVQUFHLEVBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs7O2lEQUdsQzs2QkE1RVUsa0JBQWtCO0lBSDlCLElBQUEsaUJBQVUsR0FBRTtJQUNaLElBQUEsY0FBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxHQUFFO0dBQ0osa0JBQWtCLENBNkU5QiJ9