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
exports.PluginCenterService = exports.EVENT_PLUGIN_READY = exports.PLUGIN_CACHE_KEY = void 0;
const core_1 = require("@midwayjs/core");
const fs = require("fs");
const path = require("path");
const info_1 = require("../entity/info");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const cache_manager_1 = require("@midwayjs/cache-manager");
const core_2 = require("@cool-midway/core");
const info_2 = require("./info");
exports.PLUGIN_CACHE_KEY = 'plugin:init';
exports.EVENT_PLUGIN_READY = 'EVENT_PLUGIN_READY';
/**
 * 插件中心
 */
let PluginCenterService = class PluginCenterService {
    constructor() {
        // 插件列表
        this.plugins = new Map();
        // 插件配置
        this.pluginInfos = new Map();
    }
    /**
     * 初始化
     * @returns
     */
    async init() {
        this.plugins.clear();
        await this.initHooks();
        await this.initPlugin();
        this.coolEventManager.emit(exports.EVENT_PLUGIN_READY);
    }
    /**
     * 初始化一个
     * @param keyName key名
     */
    async initOne(keyName) {
        await this.initPlugin({
            keyName,
        });
        this.coolEventManager.emit(exports.EVENT_PLUGIN_READY, keyName);
    }
    /**
     * 移除插件
     * @param keyName
     * @param isHook
     */
    async remove(keyName, isHook = false) {
        this.plugins.delete(keyName);
        this.pluginInfos.delete(keyName);
        if (isHook) {
            await this.initHooks();
        }
    }
    /**
     * 注册插件
     * @param key 唯一标识
     * @param cls 类
     * @param pluginInfo 插件信息
     */
    async register(key, cls, pluginInfo) {
        // 单例插件
        if (pluginInfo === null || pluginInfo === void 0 ? void 0 : pluginInfo.singleton) {
            const instance = new cls();
            await instance.init(this.pluginInfos.get(key), null, this.app, {
                cache: this.midwayCache,
                pluginService: this.pluginService,
            });
            this.plugins.set(key, instance);
        }
        else {
            // 普通插件
            this.plugins.set(key, cls);
        }
    }
    /**
     * 初始化钩子
     */
    async initHooks() {
        const hooksPath = path.join(this.app.getBaseDir(), 'modules', 'plugin', 'hooks');
        for (const key of fs.readdirSync(hooksPath)) {
            const stat = fs.statSync(path.join(hooksPath, key));
            if (!stat.isDirectory()) {
                continue;
            }
            const { Plugin } = await Promise.resolve(`${path.join(hooksPath, key, 'index')}`).then(s => require(s));
            await this.register(key, Plugin);
            this.pluginInfos.set(key, {
                name: key,
                config: this.app.getConfig('module.plugin.hooks.' + key),
            });
        }
    }
    /**
     * 初始化插件
     * @param condition 插件条件
     */
    async initPlugin(condition) {
        let find = { status: 1 };
        if (condition) {
            find = {
                ...find,
                ...condition,
            };
        }
        const plugins = await this.pluginInfoEntity.find({
            where: find,
            select: [
                'id',
                'name',
                'description',
                'keyName',
                'hook',
                'version',
                'pluginJson',
                'config',
            ],
        });
        for (const plugin of plugins) {
            const data = await this.pluginService.getData(plugin.keyName);
            if (!data) {
                continue;
            }
            const instance = await this.getInstance(data.content.data);
            const pluginInfo = {
                ...plugin.pluginJson,
                config: this.getConfig(plugin.config),
            };
            if (plugin.hook) {
                this.pluginInfos.set(plugin.hook, pluginInfo);
                await this.register(plugin.hook, instance, pluginInfo);
            }
            else {
                this.pluginInfos.set(plugin.keyName, pluginInfo);
                await this.register(plugin.keyName, instance, pluginInfo);
            }
        }
    }
    /**
     * 获得配置
     * @param config
     * @returns
     */
    getConfig(config) {
        // 处理配置为字符串的情况
        if (typeof config === 'string') {
            try {
                config = JSON.parse(config);
            }
            catch (e) {
                return {};
            }
        }
        // 如果配置为空或非对象类型，则返回空对象
        if (!config || typeof config !== 'object') {
            return {};
        }
        const env = this.app.getEnv();
        let isMulti = false;
        for (const key in config) {
            if (key.includes('@')) {
                isMulti = true;
                break;
            }
        }
        return isMulti ? config[`@${env}`] : config;
    }
    /**
     * 获得实例
     * @param content
     * @returns
     */
    async getInstance(content) {
        let _instance;
        const script = `
        ${content} 
        _instance = Plugin;
    `;
        eval(script);
        return _instance;
    }
};
exports.PluginCenterService = PluginCenterService;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], PluginCenterService.prototype, "app", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.PluginInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], PluginCenterService.prototype, "pluginInfoEntity", void 0);
__decorate([
    (0, core_1.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], PluginCenterService.prototype, "midwayCache", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_2.CoolEventManager)
], PluginCenterService.prototype, "coolEventManager", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_2.PluginService)
], PluginCenterService.prototype, "pluginService", void 0);
exports.PluginCenterService = PluginCenterService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton)
], PluginCenterService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcGx1Z2luL3NlcnZpY2UvY2VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQVF3QjtBQUN4Qix5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLHlDQUFrRDtBQUNsRCwrQ0FBc0Q7QUFDdEQscUNBQXFDO0FBR3JDLDJEQUFzRTtBQUN0RSw0Q0FBcUQ7QUFDckQsaUNBQXVDO0FBRTFCLFFBQUEsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDO0FBRWpDLFFBQUEsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUM7QUFFdkQ7O0dBRUc7QUFHSSxJQUFNLG1CQUFtQixHQUF6QixNQUFNLG1CQUFtQjtJQUF6QjtRQUNMLE9BQU87UUFDUCxZQUFPLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7UUFFdEMsT0FBTztRQUNQLGdCQUFXLEdBQTRCLElBQUksR0FBRyxFQUFFLENBQUM7SUE2TG5ELENBQUM7SUE1S0M7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsMEJBQWtCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFlO1FBQzNCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNwQixPQUFPO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQywwQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FB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