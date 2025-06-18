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
exports.PluginService = void 0;
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const info_1 = require("../entity/info");
const core_2 = require("@midwayjs/core");
const _ = require("lodash");
const center_1 = require("./center");
const cache_manager_1 = require("@midwayjs/cache-manager");
const init_1 = require("../event/init");
const types_1 = require("./types");
const path = require("path");
const fs = require("fs");
const path_1 = require("../../../comm/path");
/**
 * 插件信息
 */
let PluginService = class PluginService extends core_1.BaseService {
    /**
     * 新增或更新
     * @param param
     * @param type
     */
    async addOrUpdate(param, type) {
        await super.addOrUpdate(param, type);
        const info = await this.pluginInfoEntity
            .createQueryBuilder('a')
            .select(['a.id', 'a.keyName', 'a.status', 'a.hook'])
            .where({
            id: (0, typeorm_2.Equal)(param.id),
        })
            .getOne();
        if (info.status == 1) {
            await this.reInit(info.keyName);
        }
        else {
            await this.remove(info.keyName, !!info.hook);
        }
    }
    /**
     * 重新初始化插件
     */
    async reInit(keyName) {
        // 多进程发送全局事件，pm2下生效，本地开发则通过普通事件
        this.coolEventManager.globalEmit(init_1.GLOBAL_EVENT_PLUGIN_INIT, false, keyName);
    }
    /**
     * 移除插件
     * @param keyName
     * @param isHook
     */
    async remove(keyName, isHook = false) {
        // 多进程发送全局事件，pm2下生效
        this.coolEventManager.globalEmit(init_1.GLOBAL_EVENT_PLUGIN_REMOVE, false, keyName, isHook);
        this.pluginTypesService.deleteDtsFile(keyName);
    }
    /**
     * 删除不经过回收站
     * @param ids
     */
    async delete(ids) {
        const list = await this.pluginInfoEntity.findBy({ id: (0, typeorm_2.In)(ids) });
        for (const item of list) {
            await this.remove(item.keyName, !!item.hook);
            // 删除文件
            await this.deleteData(item.keyName);
        }
        await this.pluginInfoEntity.delete(ids);
    }
    /**
     * 更新
     * @param param
     */
    async update(param) {
        const old = await this.pluginInfoEntity.findOne({
            where: { id: param.id },
            select: ['id', 'status', 'hook'],
        });
        // 启用插件，禁用同名插件
        if (old.hook && param.status == 1 && old.status != param.status) {
            await this.pluginInfoEntity.update({ hook: old.hook, status: 1, id: (0, typeorm_2.Not)(old.id) }, { status: 0 });
        }
        await super.update(param);
    }
    /**
     * 获得插件配置
     * @param key
     */
    async getConfig(key) {
        var _a;
        return (_a = this.pluginCenterService.pluginInfos.get(key)) === null || _a === void 0 ? void 0 : _a.config;
    }
    /**
     * 调用插件
     * @param key 插件key
     * @param method 方法
     * @param params 参数
     * @returns
     */
    async invoke(key, method, ...params) {
        // 实例
        const instance = await this.getInstance(key);
        return await instance[method](...params);
    }
    /**
     * 获得插件实例
     * @param key
     * @returns
     */
    async getInstance(key) {
        const check = await this.checkStatus(key);
        if (!check)
            throw new core_1.CoolCommException(`插件[${key}]不存在或已禁用`);
        let instance;
        const pluginInfo = this.pluginCenterService.pluginInfos.get(key);
        if (pluginInfo.singleton) {
            instance = this.pluginCenterService.plugins.get(key);
        }
        else {
            instance = new (await this.pluginCenterService.plugins.get(key))();
            await instance.init(pluginInfo, this.ctx, this.app, {
                cache: this.midwayCache,
                pluginService: this,
            });
        }
        return instance;
    }
    /**
     * 检查状态
     * @param key
     */
    async checkStatus(key) {
        if (Object.keys(this.hooksConfig).includes(key)) {
            return true;
        }
        const info = await this.pluginInfoEntity
            .createQueryBuilder('a')
            .select(['a.id', 'a.status'])
            .where({ status: 1, keyName: (0, typeorm_2.Equal)(key) })
            .getOne();
        return !!info;
    }
    /**
     * 检查
     * @param filePath
     */
    async check(filePath) {
        let data;
        try {
            data = await this.data(filePath);
        }
        catch (e) {
            return {
                type: 0,
                message: `插件信息不完整，请检查${(data === null || data === void 0 ? void 0 : data.errorData) || ''}`,
            };
        }
        const check = await this.pluginInfoEntity.findOne({
            where: { keyName: (0, typeorm_2.Equal)(data.pluginJson.key) },
            select: ['id', 'hook', 'status'],
        });
        if (check && !check.hook) {
            return {
                type: 1,
                message: '插件已存在，继续安装将覆盖',
            };
        }
        if (check && check.hook && check.status == 1) {
            return {
                type: 2,
                message: '已存在同名Hook插件，你可以继续安装，但是多个相同的Hook插件只能同时开启一个',
            };
        }
        return {
            type: 3,
            message: '检查通过',
        };
    }
    /**
     * 获得插件数据
     * @param filePath
     */
    async data(filePath) {
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(filePath);
        const files = zip.getEntries();
        let errorData;
        let pluginJson, readme, logo, content, tsContent;
        try {
            // 通用方法获取文件内容
            const getFileContent = (entryName, encoding = 'utf-8') => {
                var _a;
                const file = _.find(files, { entryName });
                if (!file) {
                    throw new Error(`File ${entryName} not found`);
                }
                return (_a = file === null || file === void 0 ? void 0 : file.getData()) === null || _a === void 0 ? void 0 : _a.toString(encoding);
            };
            errorData = 'plugin.json';
            pluginJson = JSON.parse(getFileContent('plugin.json'));
            errorData = 'readme';
            readme = getFileContent(pluginJson.readme);
            errorData = 'logo';
            logo = getFileContent(pluginJson.logo, 'base64');
            errorData = 'content';
            content = getFileContent('src/index.js');
            tsContent = getFileContent('source/index.ts');
        }
        catch (e) {
            throw new core_1.CoolCommException('插件信息不完整');
        }
        return {
            pluginJson,
            readme,
            logo,
            content,
            tsContent,
            errorData,
        };
    }
    /**
     * 安装插件
     * @param file 文件
     * @param force 是否强制安装
     */
    async install(filePath, force = false) {
        const forceBool = typeof force === 'string' ? force === 'true' : force;
        const checkResult = await this.check(filePath);
        if (checkResult.type != 3 && !forceBool) {
            return checkResult;
        }
        const { pluginJson, readme, logo, content, tsContent } = await this.data(filePath);
        if (pluginJson.key == 'plugin') {
            throw new core_1.CoolCommException('插件key不能为plugin，请更换其他key');
        }
        const check = await this.pluginInfoEntity.findOne({
            where: { keyName: (0, typeorm_2.Equal)(pluginJson.key) },
            select: ['id', 'status', 'config'],
        });
        const data = {
            name: pluginJson.name,
            keyName: pluginJson.key,
            version: pluginJson.version,
            author: pluginJson.author,
            hook: pluginJson.hook,
            readme,
            logo,
            content: {
                type: 'comm',
                data: content,
            },
            tsContent: {
                type: 'ts',
                data: tsContent,
            },
            description: pluginJson.description,
            pluginJson,
            config: pluginJson.config,
            status: 1,
        };
        // 存在同名插件，更新，保留配置
        if (check) {
            await this.pluginInfoEntity.update(check.id, {
                ...data,
                status: check.status,
                config: {
                    ...pluginJson.config,
                    ...check.config,
                },
            });
        }
        else {
            // 全新安装
            await this.pluginInfoEntity.insert(data);
        }
        // 保存插件内容
        await this.saveData({
            content: {
                type: 'comm',
                data: content,
            },
            tsContent: {
                type: 'ts',
                data: tsContent,
            },
        }, pluginJson.key);
        this.pluginTypesService.generateDtsFile(pluginJson.key, tsContent);
        // 初始化插件
        await this.reInit(pluginJson.key);
    }
    /**
     * 将插件内容保存到文件
     * @param content 内容
     * @param keyName 插件key
     */
    async saveData(data, keyName) {
        const filePath = this.pluginPath(keyName);
        // 确保目录存在
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // 写入文件，如果存在则覆盖
        fs.writeFileSync(filePath, JSON.stringify(data, null, 0), { flag: 'w' });
    }
    /**
     * 获得插件数据
     * @param keyName
     * @returns
     */
    async getData(keyName) {
        const filePath = this.pluginPath(keyName);
        if (!fs.existsSync(filePath)) {
            // 尝试从数据库中获取
            const info = await this.pluginInfoEntity.findOne({
                where: { keyName: (0, typeorm_2.Equal)(keyName) },
                select: ['content', 'tsContent'],
            });
            if (info) {
                // 保存插件到文件
                this.saveData({
                    content: info.content,
                    tsContent: info.tsContent,
                }, keyName);
                return {
                    content: info.content,
                    tsContent: info.tsContent,
                };
            }
            else {
                this.logger.warn(`插件[${keyName}]文件不存在，请卸载后重新安装: ${filePath}`);
                return;
            }
        }
        return JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
    }
    /**
     * 删除插件
     * @param keyName
     */
    async deleteData(keyName) {
        const filePath = this.pluginPath(keyName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    /**
     * 获得插件路径
     * @param keyName
     * @returns
     */
    pluginPath(keyName) {
        return path.join((0, path_1.pPluginPath)(), `${keyName}`);
    }
};
exports.PluginService = PluginService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.PluginInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], PluginService.prototype, "pluginInfoEntity", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], PluginService.prototype, "ctx", void 0);
__decorate([
    (0, core_2.App)(),
    __metadata("design:type", Object)
], PluginService.prototype, "app", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", center_1.PluginCenterService)
], PluginService.prototype, "pluginCenterService", void 0);
__decorate([
    (0, core_2.Config)('module.plugin.hooks'),
    __metadata("design:type", Object)
], PluginService.prototype, "hooksConfig", void 0);
__decorate([
    (0, core_2.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], PluginService.prototype, "midwayCache", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", core_1.CoolEventManager)
], PluginService.prototype, "coolEventManager", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", types_1.PluginTypesService)
], PluginService.prototype, "pluginTypesService", void 0);
__decorate([
    (0, core_2.Logger)(),
    __metadata("design:type", Object)
], PluginService.prototype, "logger", void 0);
exports.PluginService = PluginService = __decorate([
    (0, core_2.Provide)()
], PluginService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3BsdWdpbi9zZXJ2aWNlL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBSTJCO0FBQzNCLCtDQUFzRDtBQUN0RCxxQ0FBcUQ7QUFDckQseUNBQWtEO0FBQ2xELHlDQVV3QjtBQUN4Qiw0QkFBNEI7QUFFNUIscUNBQStDO0FBQy9DLDJEQUFzRTtBQUN0RSx3Q0FHdUI7QUFFdkIsbUNBQTZDO0FBQzdDLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsNkNBQWlEO0FBQ2pEOztHQUVHO0FBRUksSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYyxTQUFRLGtCQUFXO0lBNEI1Qzs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFVLEVBQUUsSUFBdUI7UUFDbkQsTUFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0I7YUFDckMsa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ3ZCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ25ELEtBQUssQ0FBQztZQUNMLEVBQUUsRUFBRSxJQUFBLGVBQUssRUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ3BCLENBQUM7YUFDRCxNQUFNLEVBQUUsQ0FBQztRQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FB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