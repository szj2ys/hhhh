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
exports.BaseSysUserService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const user_1 = require("../../entity/sys/user");
const perms_1 = require("./perms");
const _ = require("lodash");
const user_role_1 = require("../../entity/sys/user_role");
const md5 = require("md5");
const department_1 = require("../../entity/sys/department");
const cache_manager_1 = require("@midwayjs/cache-manager");
/**
 * 系统用户
 */
let BaseSysUserService = class BaseSysUserService extends core_2.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { keyWord, status, departmentIds = [] } = query;
        const userId = this.ctx.admin.userId;
        const permsDepartmentArr = await this.baseSysPermsService.departmentIds(userId); // 部门权限
        const sql = `
        SELECT
            a.id,a.name,a.nickName,a.headImg,a.email,a.remark,a.status,a.createTime,a.updateTime,a.username,a.phone,a.departmentId,
            b.name as "departmentName"
        FROM
            base_sys_user a
            LEFT JOIN base_sys_department b on a.departmentId = b.id
        WHERE 1 = 1
            ${this.setSql(!_.isEmpty(departmentIds), 'and a.departmentId in (?)', [departmentIds])}
            ${this.setSql(status, 'and a.status = ?', [status])}
            ${this.setSql(keyWord, 'and (a.name LIKE ? or a.username LIKE ?)', [
            `%${keyWord}%`,
            `%${keyWord}%`,
        ])}
            ${this.setSql(true, 'and a.username != ?', ['admin'])}
            ${this.setSql(this.ctx.admin.username !== 'admin', `and (a.departmentId in (?) or a.userId = ${userId})`, [!_.isEmpty(permsDepartmentArr) ? permsDepartmentArr : [null]])} `;
        const result = await this.sqlRenderPage(sql, query);
        // 匹配角色
        if (!_.isEmpty(result.list)) {
            const userIds = result.list.map(e => e.id);
            const roles = await this.nativeQuery('SELECT b.name, a.userId FROM base_sys_user_role a LEFT JOIN base_sys_role b ON a.roleId = b.id WHERE a.userId in (?) ', [userIds]);
            result.list.forEach(e => {
                const arr = roles.filter(a => a.userId == e.id);
                e['roleIds'] = arr.map(a => a.userId);
                e['roleName'] = arr.map(a => a.name).join(',');
            });
        }
        return result;
    }
    /**
     * 移动部门
     * @param departmentId
     * @param userIds
     */
    async move(departmentId, userIds) {
        await this.baseSysUserEntity.update({ id: (0, typeorm_2.In)(userIds) }, { departmentId });
    }
    /**
     * 获得个人信息
     */
    async person(userId) {
        const info = await this.baseSysUserEntity.findOneBy({
            id: (0, typeorm_2.Equal)(userId),
        });
        info === null || info === void 0 ? true : delete info.password;
        return info;
    }
    /**
     * 更新用户角色关系
     * @param user
     */
    async updateUserRole(user) {
        if (_.isEmpty(user.roleIdList)) {
            return;
        }
        if (user.username === 'admin') {
            throw new core_2.CoolCommException('非法操作~');
        }
        await this.baseSysUserRoleEntity.delete({ userId: user.id });
        if (user.roleIdList) {
            for (const roleId of user.roleIdList) {
                await this.baseSysUserRoleEntity.save({ userId: user.id, roleId });
            }
        }
        await this.baseSysPermsService.refreshPerms(user.id);
    }
    /**
     * 新增
     * @param param
     */
    async add(param) {
        const exists = await this.baseSysUserEntity.findOneBy({
            username: param.username,
        });
        if (!_.isEmpty(exists)) {
            throw new core_2.CoolCommException('用户名已经存在~');
        }
        param.password = md5(param.password);
        await super.add(param);
        await this.updateUserRole(param);
        return param.id;
    }
    /**
     * 根据ID获得信息
     * @param id
     */
    async info(id) {
        const info = await this.baseSysUserEntity.findOneBy({ id });
        const userRoles = await this.nativeQuery('select a.roleId from base_sys_user_role a where a.userId = ?', [id]);
        const department = await this.baseSysDepartmentEntity.findOneBy({
            id: info.departmentId,
        });
        if (info) {
            delete info.password;
            if (userRoles) {
                info.roleIdList = userRoles.map(e => {
                    return parseInt(e.roleId);
                });
            }
        }
        delete info.password;
        if (department) {
            info.departmentName = department.name;
        }
        return info;
    }
    /**
     * 修改个人信息
     * @param param
     */
    async personUpdate(param) {
        param.id = this.ctx.admin.userId;
        if (!_.isEmpty(param.password)) {
            param.password = md5(param.password);
            const oldPassword = md5(param.oldPassword);
            const userInfo = await this.baseSysUserEntity.findOneBy({ id: param.id });
            if (!userInfo) {
                throw new core_2.CoolCommException('用户不存在');
            }
            if (oldPassword !== userInfo.password) {
                throw new core_2.CoolCommException('原密码错误');
            }
            param.passwordV = userInfo.passwordV + 1;
            await this.midwayCache.set(`admin:passwordVersion:${param.id}`, param.passwordV);
        }
        else {
            delete param.password;
        }
        await this.baseSysUserEntity.save(param);
    }
    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        if (param.id && param.username === 'admin') {
            throw new core_2.CoolCommException('非法操作~');
        }
        if (!_.isEmpty(param.password)) {
            param.password = md5(param.password);
            const userInfo = await this.baseSysUserEntity.findOneBy({ id: param.id });
            if (!userInfo) {
                throw new core_2.CoolCommException('用户不存在');
            }
            param.passwordV = userInfo.passwordV + 1;
            await this.midwayCache.set(`admin:passwordVersion:${param.id}`, param.passwordV);
        }
        else {
            delete param.password;
        }
        if (param.status === 0) {
            await this.forbidden(param.id);
        }
        await this.baseSysUserEntity.save(param);
        await this.updateUserRole(param);
    }
    /**
     * 禁用用户
     * @param userId
     */
    async forbidden(userId) {
        await this.midwayCache.del(`admin:token:${userId}`);
    }
};
exports.BaseSysUserService = BaseSysUserService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysUserService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysUserService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysUserService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    (0, core_1.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], BaseSysUserService.prototype, "midwayCache", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysUserService.prototype, "baseSysPermsService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysUserService.prototype, "ctx", void 0);
exports.BaseSysUserService = BaseSysUserService = __decorate([
    (0, core_1.Provide)()
], BaseSysUserService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBK0Q7QUFDL0QsNENBQW1FO0FBQ25FLCtDQUFzRDtBQUN0RCxxQ0FBZ0Q7QUFDaEQsZ0RBQTBEO0FBQzFELG1DQUE4QztBQUM5Qyw0QkFBNEI7QUFDNUIsMERBQW1FO0FBQ25FLDJCQUEyQjtBQUMzQiw0REFBc0U7QUFDdEUsMkRBQXNFO0FBR3RFOztHQUVHO0FBRUksSUFBTSxrQkFBa0IsR0FBeEIsTUFBTSxrQkFBbUIsU0FBUSxrQkFBVztJQW1CakQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUN0RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDckMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQ3JFLE1BQU0sQ0FDUCxDQUFDLENBQUMsT0FBTztRQUNWLE1BQU0sR0FBRyxHQUFHOzs7Ozs7OztjQVFGLElBQUksQ0FBQyxNQUFNLENBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUN6QiwyQkFBMkIsRUFDM0IsQ0FBQyxhQUFhLENBQUMsQ0FDaEI7Y0FDQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2NBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDBDQUEwQyxFQUFFO1lBQ2pFLElBQUksT0FBTyxHQUFHO1lBQ2QsSUFBSSxPQUFPLEdBQUc7U0FDZixDQUFD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