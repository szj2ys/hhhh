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
exports.BaseSysMenuService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@midwayjs/core");
const core_3 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_1 = require("../../entity/sys/menu");
const _ = require("lodash");
const perms_1 = require("./perms");
const data_1 = require("./data");
// eslint-disable-next-line node/no-unpublished-import
const ts = require("typescript");
const fs = require("fs");
const pathUtil = require("path");
const role_menu_1 = require("../../entity/sys/role_menu");
const user_role_1 = require("../../entity/sys/user_role");
/**
 * 菜单
 */
let BaseSysMenuService = class BaseSysMenuService extends core_3.BaseService {
    /**
     * 获得所有菜单
     */
    async list() {
        const menus = await this.getMenus(this.ctx.admin.roleIds, this.ctx.admin.username === 'admin');
        if (!_.isEmpty(menus)) {
            menus.forEach((e) => {
                const parentMenu = menus.filter(m => {
                    e.parentId = parseInt(e.parentId);
                    if (e.parentId == m.id) {
                        return m.name;
                    }
                });
                if (!_.isEmpty(parentMenu)) {
                    e.parentName = parentMenu[0].name;
                }
            });
        }
        return menus;
    }
    /**
     * 修改之后
     * @param param
     */
    async modifyAfter(param) {
        if (param.id) {
            await this.refreshPerms(param.id);
        }
    }
    /**
     * 根据角色获得权限信息
     * @param {[]} roleIds 数组
     */
    async getPerms(roleIds) {
        let perms = [];
        if (!_.isEmpty(roleIds)) {
            const find = await this.baseSysMenuEntity.createQueryBuilder('a');
            if (!roleIds.includes(1)) {
                find.innerJoinAndSelect(role_menu_1.BaseSysRoleMenuEntity, 'b', 'a.id = b.menuId AND b.roleId in (:...roleIds)', { roleIds });
            }
            find.where('a.perms is not NULL');
            const result = await find.getMany();
            if (result) {
                result.forEach(d => {
                    if (d.perms) {
                        perms = perms.concat(d.perms.split(','));
                    }
                });
            }
            perms = _.uniq(perms);
            perms = _.remove(perms, n => {
                return !_.isEmpty(n);
            });
        }
        return _.uniq(perms);
    }
    /**
     * 获得用户菜单信息
     * @param roleIds
     * @param isAdmin 是否是超管
     */
    async getMenus(roleIds, isAdmin) {
        const find = this.baseSysMenuEntity.createQueryBuilder('a');
        if (!isAdmin) {
            find.innerJoinAndSelect(role_menu_1.BaseSysRoleMenuEntity, 'b', 'a.id = b.menuId AND b.roleId in (:...roleIds)', { roleIds });
        }
        find.orderBy('a.orderNum', 'ASC');
        const list = await find.getMany();
        return _.uniqBy(list, 'id');
    }
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        let idArr;
        if (ids instanceof Array) {
            idArr = ids;
        }
        else {
            idArr = ids.split(',');
        }
        for (const id of idArr) {
            await this.baseSysMenuEntity.delete({ id });
            await this.delChildMenu(id);
        }
    }
    /**
     * 删除子菜单
     * @param id
     */
    async delChildMenu(id) {
        await this.refreshPerms(id);
        const delMenu = await this.baseSysMenuEntity.findBy({ parentId: id });
        if (_.isEmpty(delMenu)) {
            return;
        }
        const delMenuIds = delMenu.map(e => {
            return e.id;
        });
        await this.baseSysMenuEntity.delete(delMenuIds);
        for (const menuId of delMenuIds) {
            await this.delChildMenu(menuId);
        }
    }
    /**
     * 更新权限
     * @param menuId
     */
    async refreshPerms(menuId) {
        const find = this.baseSysRoleMenuEntity.createQueryBuilder('a');
        find.leftJoinAndSelect(user_role_1.BaseSysUserRoleEntity, 'b', 'a.roleId = b.roleId');
        find.where('a.menuId = :menuId', { menuId: menuId });
        find.select('b.userId', 'userId');
        const users = await find.getRawMany();
        // 刷新admin权限
        await this.baseSysPermsService.refreshPerms(1);
        if (!_.isEmpty(users)) {
            // 刷新其他权限
            for (const user of _.uniqBy(users, 'userId')) {
                await this.baseSysPermsService.refreshPerms(user.userId);
            }
        }
    }
    /**
     * 解析实体和Controller
     * @param entityString
     * @param controller
     * @param module
     */
    async parse(entityString, controller, module) {
        const tempDataSource = new data_1.TempDataSource({
            ...this.config.typeorm.dataSource.default,
            entities: [],
        });
        // 连接数据库
        await tempDataSource.initialize();
        const { newCode, className, oldTableName } = this.parseCode(entityString);
        const code = ts.transpile(`${newCode}
        tempDataSource.options.entities.push(${className})
        `, {
            emitDecoratorMetadata: true,
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2018,
            removeComments: true,
            experimentalDecorators: true,
            noImplicitThis: true,
            noUnusedLocals: true,
            stripInternal: true,
            skipLibCheck: true,
            pretty: true,
            declaration: true,
            noImplicitAny: false,
        });
        eval(code);
        await tempDataSource.buildMetadatas();
        const meta = tempDataSource.getMetadata(className);
        const columnArr = meta.columns;
        await tempDataSource.destroy();
        const commColums = [];
        const columns = _.filter(columnArr.map(e => {
            return {
                propertyName: e.propertyName,
                type: typeof e.type == 'string' ? e.type : e.type.name.toLowerCase(),
                length: e.length,
                comment: e.comment,
                nullable: e.isNullable,
            };
        }), o => {
            if (['createTime', 'updateTime'].includes(o.propertyName)) {
                commColums.push(o);
            }
            return o && !['createTime', 'updateTime'].includes(o.propertyName);
        }).concat(commColums);
        if (!controller) {
            const tableNames = oldTableName.split('_');
            const fileName = tableNames[tableNames.length - 1];
            return {
                columns,
                className: className.replace('TEMP', ''),
                tableName: oldTableName,
                fileName,
                path: `/admin/${module}/${fileName}`,
            };
        }
        const fileName = await this.fileName(controller);
        return {
            columns,
            path: `/admin/${module}/${fileName}`,
        };
    }
    /**
     * 解析Entity类名
     * @param code
     * @returns
     */
    parseCode(code) {
        try {
            const oldClassName = code
                .match('class(.*)extends')[1]
                .replace(/\s*/g, '');
            const oldTableStart = code.indexOf('@Entity(');
            const oldTableEnd = code.indexOf(')');
            const oldTableName = code
                .substring(oldTableStart + 9, oldTableEnd - 1)
                .replace(/\s*/g, '')
                // eslint-disable-next-line no-useless-escape
                .replace(/\"/g, '')
                // eslint-disable-next-line no-useless-escape
                .replace(/\'/g, '');
            const className = `${oldClassName}TEMP`;
            return {
                newCode: code
                    .replace(oldClassName, className)
                    .replace(oldTableName, `func_${oldTableName}`),
                className,
                tableName: `func_${oldTableName}`,
                oldTableName,
            };
        }
        catch (err) {
            throw new core_3.CoolCommException('代码结构不正确，请检查');
        }
    }
    /**
     *  创建代码
     * @param body body
     */
    async create(body) {
        const { module, entity, controller, service, fileName } = body;
        const basePath = this.app.getBaseDir();
        const modulePath = pathUtil.join(basePath, '..', 'src', 'modules', module);
        // 生成Entity
        const entityPath = pathUtil.join(modulePath, 'entity', `${fileName}.ts`);
        // 生成Controller
        const controllerPath = pathUtil.join(modulePath, 'controller', 'admin', `${fileName}.ts`);
        // 生成Service
        const servicePath = pathUtil.join(modulePath, 'service', `${fileName}.ts`);
        this.createConfigFile(module);
        this.createFile(entityPath, entity);
        this.createFile(controllerPath, controller);
        this.createFile(servicePath, service);
    }
    /**
     * 创建配置文件
     * @param module
     */
    async createConfigFile(module) {
        const basePath = this.app.getBaseDir();
        const configFilePath = pathUtil.join(basePath, '..', 'src', 'modules', module, 'config.ts');
        if (!fs.existsSync(configFilePath)) {
            const data = `import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default () => {
  return {
    // 模块名称
    name: 'xxx',
    // 模块描述
    description: 'xxx',
    // 中间件，只对本模块有效
    middlewares: [],
    // 中间件，全局有效
    globalMiddlewares: [],
    // 模块加载顺序，默认为0，值越大越优先加载
    order: 0,
  } as ModuleConfig;
};
`;
            await this.createFile(configFilePath, data);
        }
    }
    /**
     * 找到文件名
     * @param controller
     * @returns
     */
    async fileName(controller) {
        const regex = /import\s*{\s*\w+\s*}\s*from\s*'[^']*\/([\w-]+)';/;
        const match = regex.exec(controller);
        if (match && match.length > 1) {
            return match[1];
        }
        return null;
    }
    /**
     * 创建文件
     * @param filePath
     * @param content
     */
    async createFile(filePath, content) {
        const folderPath = pathUtil.dirname(filePath);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        fs.writeFileSync(filePath, content);
    }
    /**
     * 导出菜单
     * @param ids
     * @returns
     */
    async export(ids) {
        const result = [];
        const menus = await this.baseSysMenuEntity.findBy({ id: (0, typeorm_2.In)(ids) });
        // 递归取出子菜单
        const getChildMenus = (parentId) => {
            const children = _.remove(menus, e => e.parentId == parentId);
            children.forEach(child => {
                child.childMenus = getChildMenus(child.id);
                // 删除不需要的字段
                delete child.id;
                delete child.createTime;
                delete child.updateTime;
                delete child.parentId;
            });
            return children;
        };
        // lodash取出父级菜单(parentId为 null)， 并从menus 删除
        const parentMenus = _.remove(menus, e => {
            return e.parentId == null;
        });
        // 对于每个父级菜单，获取它的子菜单
        parentMenus.forEach(parent => {
            parent.childMenus = getChildMenus(parent.id);
            // 删除不需要的字段
            delete parent.id;
            delete parent.createTime;
            delete parent.updateTime;
            delete parent.parentId;
            result.push(parent);
        });
        return result;
    }
    /**
     * 导入
     * @param menus
     */
    async import(menus) {
        // 递归保存子菜单
        const saveChildMenus = async (parentMenu, parentId) => {
            const children = parentMenu.childMenus || [];
            for (let child of children) {
                const childData = { ...child, parentId: parentId }; // 保持与数据库的parentId字段的一致性
                delete childData.childMenus; // 删除childMenus属性，因为我们不想将它保存到数据库中
                // 保存子菜单并获取其ID，以便为其子菜单设置parentId
                const savedChild = await this.baseSysMenuEntity.save(childData);
                if (!_.isEmpty(child.childMenus)) {
                    await saveChildMenus(child, savedChild.id);
                }
            }
        };
        for (let menu of menus) {
            const menuData = { ...menu };
            delete menuData.childMenus; // 删除childMenus属性，因为我们不想将它保存到数据库中
            // 保存主菜单并获取其ID
            const savedMenu = await this.baseSysMenuEntity.save(menuData);
            if (menu.childMenus && menu.childMenus.length > 0) {
                await saveChildMenus(menu, savedMenu.id);
            }
        }
    }
};
exports.BaseSysMenuService = BaseSysMenuService;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], BaseSysMenuService.prototype, "ctx", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(menu_1.BaseSysMenuEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysMenuService.prototype, "baseSysMenuEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(role_menu_1.BaseSysRoleMenuEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseSysMenuService.prototype, "baseSysRoleMenuEntity", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysMenuService.prototype, "baseSysPermsService", void 0);
__decorate([
    (0, core_2.Config)(core_2.ALL),
    __metadata("design:type", Object)
], BaseSysMenuService.prototype, "config", void 0);
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], BaseSysMenuService.prototype, "app", void 0);
exports.BaseSysMenuService = BaseSysMenuService = __decorate([
    (0, core_1.Scope)(core_1.ScopeEnum.Request, { allowDowngrade: true }),
    (0, core_2.Provide)()
], BaseSysMenuService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBMkU7QUFDM0UseUNBQThEO0FBQzlELDRDQUFtRTtBQUNuRSwrQ0FBc0Q7QUFDdEQscUNBQXlDO0FBQ3pDLGdEQUEwRDtBQUMxRCw0QkFBNEI7QUFDNUIsbUNBQThDO0FBRTlDLGlDQUF3QztBQUN4QyxzREFBc0Q7QUFDdEQsaUNBQWlDO0FBQ2pDLHlCQUF5QjtBQUN6QixpQ0FBaUM7QUFDakMsMERBQW1FO0FBQ25FLDBEQUFtRTtBQUVuRTs7R0FFRztBQUdJLElBQU0sa0JBQWtCLEdBQXhCLE1BQU0sa0JBQW1CLFNBQVEsa0JBQVc7SUFtQmpEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FDcEMsQ0FBQztRQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO2dCQUN2QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3ZCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDaEIsQ0FBQztnQkFD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