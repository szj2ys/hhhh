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
exports.BaseSysDepartmentService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const department_1 = require("../../entity/sys/department");
const _ = require("lodash");
const role_department_1 = require("../../entity/sys/role_department");
const perms_1 = require("./perms");
const user_1 = require("../../entity/sys/user");
/**
 * 描述
 */
let BaseSysDepartmentService = class BaseSysDepartmentService extends core_2.BaseService {
    /**
     * 获得部门菜单
     */
    async list() {
        // 部门权限
        const permsDepartmentArr = await this.baseSysPermsService.departmentIds(this.ctx.admin.userId);
        // 过滤部门权限
        const find = this.baseSysDepartmentEntity.createQueryBuilder('a');
        if (this.ctx.admin.username !== 'admin') {
            find.andWhere('a.id in (:...ids)', {
                ids: !_.isEmpty(permsDepartmentArr) ? permsDepartmentArr : [null],
            });
            find.orWhere('a.userId = :userId', { userId: this.ctx.admin.userId });
        }
        find.addOrderBy('a.orderNum', 'ASC');
        const departments = await find.getMany();
        if (!_.isEmpty(departments)) {
            departments.forEach(e => {
                const parentMenu = departments.filter(m => {
                    e.parentId = parseInt(e.parentId + '');
                    if (e.parentId == m.id) {
                        return m.name;
                    }
                });
                if (!_.isEmpty(parentMenu)) {
                    e.parentName = parentMenu[0].name;
                }
            });
        }
        return departments;
    }
    /**
     * 根据多个ID获得部门权限信息
     * @param {[]} roleIds 数组
     * @param isAdmin 是否超管
     */
    async getByRoleIds(roleIds, isAdmin) {
        if (!_.isEmpty(roleIds)) {
            if (isAdmin) {
                const result = await this.baseSysDepartmentEntity.find();
                return result.map(e => {
                    return e.id;
                });
            }
            const result = await this.baseSysRoleDepartmentEntity
                .createQueryBuilder('a')
                .where('a.roleId in (:...roleIds)', { roleIds })
                .getMany();
            if (!_.isEmpty(result)) {
                return _.uniq(result.map(e => {
                    return e.departmentId;
                }));
            }
        }
        return [];
    }
    /**
     * 部门排序
     * @param params
     */
    async order(params) {
        for (const e of params) {
            await this.baseSysDepartmentEntity.update(e.id, e);
        }
    }
    /**
     * 删除
     */
    async delete(ids) {
        const { deleteUser } = this.ctx.request.body;
        await super.delete(ids);
        if (deleteUser) {
            await this.baseSysUserEntity.delete({ departmentId: (0, typeorm_2.In)(ids) });
        }
        else {
            const topDepartment = await this.baseSysDepartmentEntity
                .createQueryBuilder('a')
                .where('a.parentId is null')
                .getOne();
            if (topDepartment) {
                await this.baseSysUserEntity.update({ departmentId: (0, typeorm_2.In)(ids) }, { departmentId: topDepartment.id });
            }
        }
    }
};
exports.BaseSysDepartmentService = BaseSysDepartmentService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysDepartmentService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysDepartmentService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(role_department_1.BaseSysRoleDepartmentEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysDepartmentService.prototype, "baseSysRoleDepartmentEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysDepartmentService.prototype, "baseSysPermsService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysDepartmentService.prototype, "ctx", void 0);
exports.BaseSysDepartmentService = BaseSysDepartmentService = __decorate([
    (0, core_1.Provide)()
], BaseSysDepartmentService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvZGVwYXJ0bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFDakQsNENBQWdEO0FBQ2hELCtDQUFzRDtBQUN0RCxxQ0FBeUM7QUFDekMsNERBQXNFO0FBQ3RFLDRCQUE0QjtBQUM1QixzRUFBK0U7QUFDL0UsbUNBQThDO0FBQzlDLGdEQUEwRDtBQUUxRDs7R0FFRztBQUVJLElBQU0sd0JBQXdCLEdBQTlCLE1BQU0sd0JBQXlCLFNBQVEsa0JBQVc7SUFnQnZEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUixPQUFPO1FBQ1AsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQ3JFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDdEIsQ0FBQztRQUVGLFNBQVM7UUFDVCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDakMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDbEUsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7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