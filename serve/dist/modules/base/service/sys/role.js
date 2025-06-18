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
exports.BaseSysRoleService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const role_1 = require("../../entity/sys/role");
const user_role_1 = require("../../entity/sys/user_role");
const _ = require("lodash");
const role_menu_1 = require("../../entity/sys/role_menu");
const role_department_1 = require("../../entity/sys/role_department");
const perms_1 = require("./perms");
const typeorm_3 = require("typeorm");
/**
 * 角色
 */
let BaseSysRoleService = class BaseSysRoleService extends core_2.BaseService {
    /**
     * 根据用户ID获得所有用户角色
     * @param userId
     */
    async getByUser(userId) {
        const userRole = await this.baseSysUserRoleEntity.findBy({ userId });
        if (!_.isEmpty(userRole)) {
            return userRole.map(e => {
                return e.roleId;
            });
        }
        return [];
    }
    /**
     *
     * @param param
     */
    async modifyAfter(param) {
        if (param.id) {
            this.updatePerms(param.id, param.menuIdList, param.departmentIdList);
        }
    }
    /**
     * 更新权限
     * @param roleId
     * @param menuIdList
     * @param departmentIds
     */
    async updatePerms(roleId, menuIdList, departmentIds = []) {
        // 更新菜单权限
        await this.baseSysRoleMenuEntity.delete({ roleId });
        await Promise.all(menuIdList.map(async (e) => {
            return await this.baseSysRoleMenuEntity.save({ roleId, menuId: e });
        }));
        // 更新部门权限
        await this.baseSysRoleDepartmentEntity.delete({ roleId });
        await Promise.all(departmentIds.map(async (e) => {
            return await this.baseSysRoleDepartmentEntity.save({
                roleId,
                departmentId: e,
            });
        }));
        // 刷新权限
        const userRoles = await this.baseSysUserRoleEntity.findBy({ roleId });
        for (const userRole of userRoles) {
            await this.baseSysPermsService.refreshPerms(userRole.userId);
        }
    }
    /**
     * 角色信息
     * @param id
     */
    async info(id) {
        const info = await this.baseSysRoleEntity.findOneBy({ id });
        if (info) {
            const menus = await this.baseSysRoleMenuEntity.findBy(id !== 1 ? { roleId: id } : {});
            const menuIdList = menus.map(e => {
                return parseInt(e.menuId + '');
            });
            const departments = await this.baseSysRoleDepartmentEntity.findBy(id !== 1 ? { roleId: id } : {});
            const departmentIdList = departments.map(e => {
                return parseInt(e.departmentId + '');
            });
            return {
                ...info,
                menuIdList,
                departmentIdList,
            };
        }
        return {};
    }
    async list() {
        return this.baseSysRoleEntity
            .createQueryBuilder('a')
            .where(new typeorm_3.Brackets(qb => {
            qb.where('a.id !=:id', { id: 1 }); // 超级管理员的角色不展示
            // 如果不是超管，只能看到自己新建的或者自己有的角色
            if (this.ctx.admin.username !== 'admin') {
                qb.andWhere('(a.userId=:userId or a.id in (:...roleId))', {
                    userId: this.ctx.admin.userId,
                    roleId: this.ctx.admin.roleIds,
                });
            }
        }))
            .getMany();
    }
};
exports.BaseSysRoleService = BaseSysRoleService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(role_1.BaseSysRoleEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysRoleService.prototype, "baseSysRoleEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysRoleService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(role_menu_1.BaseSysRoleMenuEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysRoleService.prototype, "baseSysRoleMenuEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(role_department_1.BaseSysRoleDepartmentEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysRoleService.prototype, "baseSysRoleDepartmentEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysRoleService.prototype, "baseSysPermsService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysRoleService.prototype, "ctx", void 0);
exports.BaseSysRoleService = BaseSysRoleService = __decorate([
    (0, core_1.Provide)()
], BaseSysRoleService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvcm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFDakQsNENBQWdEO0FBQ2hELCtDQUFzRDtBQUN0RCxxQ0FBcUM7QUFDckMsZ0RBQTBEO0FBQzFELDBEQUFtRTtBQUNuRSw0QkFBNEI7QUFDNUIsMERBQW1FO0FBQ25FLHNFQUErRTtBQUMvRSxtQ0FBOEM7QUFDOUMscUNBQW1DO0FBRW5DOztHQUVHO0FBRUksSUFBTSxrQkFBa0IsR0FBeEIsTUFBTSxrQkFBbUIsU0FBUSxrQkFBVztJQW1CakQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFjO1FBQzVCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUN6QixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUs7UUFDckIsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RSxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxN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