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
exports.BaseSysPermsService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const menu_1 = require("./menu");
const role_1 = require("./role");
const department_1 = require("./department");
const cache_manager_1 = require("@midwayjs/cache-manager");
const role_2 = require("../../entity/sys/role");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
/**
 * 权限
 */
let BaseSysPermsService = class BaseSysPermsService extends core_2.BaseService {
    /**
     * 刷新权限
     * @param userId 用户ID
     */
    async refreshPerms(userId) {
        const roleIds = await this.baseSysRoleService.getByUser(userId);
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        await this.midwayCache.set(`admin:perms:${userId}`, perms);
        // 更新部门权限
        const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, await this.isAdmin(roleIds));
        await this.midwayCache.set(`admin:department:${userId}`, departments);
    }
    /**
     * 根据角色判断是不是超管
     * @param roleIds
     */
    async isAdmin(roleIds) {
        const roles = await this.baseSysRoleEntity.findBy({ id: (0, typeorm_1.In)(roleIds) });
        const roleLabels = roles.map(item => item.label);
        return roleLabels.includes('admin');
    }
    /**
     * 获得权限菜单
     * @param roleIds
     */
    async permmenu(roleIds) {
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        const menus = await this.baseSysMenuService.getMenus(roleIds, this.ctx.admin.username === 'admin');
        return { perms, menus };
    }
    /**
     * 根据用户ID获得部门权限
     * @param userId
     * @return 部门ID数组
     */
    async departmentIds(userId) {
        const department = await this.midwayCache.get(`admin:department:${userId}`);
        if (department) {
            return department;
        }
        else {
            return [];
        }
    }
};
exports.BaseSysPermsService = BaseSysPermsService;
__decorate([
    (0, core_1.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], BaseSysPermsService.prototype, "midwayCache", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseSysPermsService.prototype, "baseSysMenuService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", role_1.BaseSysRoleService)
], BaseSysPermsService.prototype, "baseSysRoleService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", department_1.BaseSysDepartmentService)
], BaseSysPermsService.prototype, "baseSysDepartmentService", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(role_2.BaseSysRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysPermsService.prototype, "baseSysRoleEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysPermsService.prototype, "ctx", void 0);
exports.BaseSysPermsService = BaseSysPermsService = __decorate([
    (0, core_1.Provide)()
], BaseSysPermsService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL3Blcm1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUErRDtBQUMvRCw0Q0FBZ0Q7QUFDaEQsaUNBQTRDO0FBQzVDLGlDQUE0QztBQUM1Qyw2Q0FBd0Q7QUFFeEQsMkRBQXNFO0FBQ3RFLGdEQUEwRDtBQUMxRCxxQ0FBeUM7QUFDekMsK0NBQXNEO0FBRXREOztHQUVHO0FBRUksSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBb0IsU0FBUSxrQkFBVztJQW9CbEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNO1FBQ3ZCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRSxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUQsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxlQUFlLE1BQU0sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNELFNBQVM7UUFDVCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLENBQ2xFLE9BQU8sRUFDUCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQzVCLENBQUM7UUFDRixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLG9CQUFvQixNQUFNLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFpQjtRQUM3QixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBQSxZQUFFLEVBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQWlCO1FBQzlCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5RCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQ2xELE9BQU8sRUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUNwQyxDQUFDO1FBQ0YsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBYztRQUNoQyxNQUFNLFVBQVUsR0FBUSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNoRCxvQkFBb0IsTUFBTSxFQUFFLENBQzdCLENBQUM7UUFDRixJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQ2YsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTFFWSxrREFBbUI7QUFFOUI7SUFEQyxJQUFBLG1CQUFZLEVBQUMsOEJBQWMsRUFBRSxTQUFTLENBQUM7O3dEQUNmO0FBR3pCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1cseUJBQWtCOytEQUFDO0FBR3ZDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1cseUJBQWtCOytEQUFDO0FBR3ZDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ2lCLHFDQUF3QjtxRUFBQztBQUduRDtJQURDLElBQUEsMkJBQWlCLEVBQUMsd0JBQWlCLENBQUM7OEJBQ2xCLG9CQUFVOzhEQUFvQjtBQUdqRDtJQURDLElBQUEsYUFBTSxHQUFFOztnREFDSTs4QkFqQkYsbUJBQW1CO0lBRC9CLElBQUEsY0FBTyxHQUFFO0dBQ0csbUJBQW1CLENBMEUvQiJ9