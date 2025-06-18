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
exports.BaseTranslateService = void 0;
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_1 = require("../entity/sys/menu");
const core_2 = require("@midwayjs/core");
const path = require("path");
const fs = require("fs");
const axios_1 = require("axios");
const info_1 = require("../../dict/entity/info");
const type_1 = require("../../dict/entity/type");
/**
 * 翻译服务
 */
let BaseTranslateService = class BaseTranslateService {
    constructor() {
        this.menuMap = {};
        this.msgMap = {};
        this.commMap = {};
        // 添加字典映射
        this.dictMap = {};
    }
    /**
     * 检查是否存在锁文件
     */
    checkLockFile(type) {
        const lockFile = path.join(this.basePath, type, '.lock');
        return fs.existsSync(lockFile);
    }
    /**
     * 创建锁文件
     */
    createLockFile(type) {
        const lockFile = path.join(this.basePath, type, '.lock');
        fs.writeFileSync(lockFile, new Date().toISOString());
    }
    /**
     * 加载翻译文件到内存
     */
    async loadTranslations() {
        var _a;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.enable)) {
            return;
        }
        if (!this.basePath) {
            this.basePath = path.join(this.app.getBaseDir(), '..', 'src', 'locales');
        }
        // 清空现有映射
        this.menuMap = {};
        this.msgMap = {};
        this.dictMap = {};
        this.commMap = {};
        // 加载菜单翻译
        await this.loadTypeTranslations('menu', this.menuMap);
        // 加载消息翻译
        await this.loadTypeTranslations('msg', this.msgMap);
        // 加载通用消息翻译
        await this.loadTypeTranslations('comm', this.commMap);
        // 加载字典翻译
        await this.loadDictTranslations();
    }
    /**
     * 加载指定类型的翻译
     * @param type 翻译类型
     * @param map 映射对象
     */
    async loadTypeTranslations(type, map) {
        const dirPath = path.join(this.basePath, type);
        if (fs.existsSync(dirPath)) {
            const files = fs.readdirSync(dirPath);
            for (const file of files) {
                if (file.endsWith('.json')) {
                    const language = file.replace('.json', '');
                    const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
                    const translations = JSON.parse(content);
                    for (const [key, value] of Object.entries(translations)) {
                        map[`${language}:${key}`] = value;
                    }
                }
            }
        }
    }
    /**
     * 加载字典翻译
     */
    async loadDictTranslations() {
        const dictTypes = ['info', 'type'];
        for (const dictType of dictTypes) {
            const dirPath = path.join(this.basePath, 'dict', dictType);
            if (fs.existsSync(dirPath)) {
                const files = fs.readdirSync(dirPath);
                for (const file of files) {
                    if (file.endsWith('.json')) {
                        const language = file.replace('.json', '');
                        const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
                        const translations = JSON.parse(content);
                        for (const [key, value] of Object.entries(translations)) {
                            this.dictMap[`${language}:dict:${dictType}:${key}`] =
                                value;
                        }
                    }
                }
            }
        }
    }
    /**
     * 更新翻译映射
     * @param type 类型 menu | msg
     * @param language 语言
     */
    async updateTranslationMap(type, language) {
        const dirPath = path.join(this.basePath, type);
        const file = path.join(dirPath, `${language}.json`);
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf-8');
            const translations = JSON.parse(content);
            const map = type === 'menu' ? this.menuMap : this.msgMap;
            for (const [key, value] of Object.entries(translations)) {
                map[`${language}:${key}`] = value;
            }
        }
    }
    /**
     * 翻译
     * @param type 类型 menu | msg | dict
     * @param language 语言
     * @param text 原文
     * @returns 翻译后的文本
     */
    translate(type, language, text) {
        // 处理字典翻译
        if (type === 'dict:info' || type === 'dict:type') {
            const key = `${language}:${type}:${text}`;
            return this.dictMap[key] || text.split(':').pop() || text;
        }
        // 处理菜单和消息翻译
        const map = type === 'menu' ? this.menuMap : this.msgMap;
        const key = `${language}:${text}`;
        return map[key] || text;
    }
    /**
     * 检查翻译
     */
    async check() {
        var _a;
        if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.enable) && this.app.getEnv() == 'local') {
            this.basePath = path.join(this.app.getBaseDir(), '..', 'src', 'locales');
            const menuLockExists = this.checkLockFile('menu');
            const msgLockExists = this.checkLockFile('msg');
            const commLockExists = this.checkLockFile('comm');
            const dictLockExists = this.checkDictLockFile();
            if (!menuLockExists ||
                !msgLockExists ||
                !dictLockExists ||
                !commLockExists) {
                const tasks = [];
                if (!msgLockExists) {
                    tasks.push(this.genBaseMsg());
                }
                if (!menuLockExists) {
                    tasks.push(this.genBaseMenu());
                }
                if (!dictLockExists) {
                    tasks.push(this.genBaseDict());
                }
                if (!commLockExists) {
                    tasks.push(this.genCommMsg());
                }
                // 启动旋转动画
                const spinner = ['|', '/', '-', '\\'];
                let index = 0;
                const interval = setInterval(() => {
                    process.stdout.write(`\r${spinner[index++]} i18n translate...`);
                    index %= spinner.length;
                }, 200);
                try {
                    await Promise.all(tasks);
                }
                finally {
                    clearInterval(interval);
                    // 加载翻译文件到内存
                    await this.loadTranslations();
                    await this.loadDictTranslations();
                    process.stdout.write('\r✅ i18n translate success！！！\n');
                }
            }
            else {
                this.logger.debug('Translation lock files exist, skipping translation');
                // 直接加载翻译文件到内存
                await this.loadTranslations();
                await this.loadDictTranslations();
            }
        }
    }
    /**
     * 检查字典锁文件
     */
    checkDictLockFile() {
        const lockFile = path.join(this.basePath, 'dict', '.lock');
        return fs.existsSync(lockFile);
    }
    /**
     * 创建字典锁文件
     */
    createDictLockFile() {
        const lockFile = path.join(this.basePath, 'dict', '.lock');
        fs.writeFileSync(lockFile, new Date().toISOString());
    }
    /**
     * 生成基础字典
     */
    async genBaseDict() {
        var _a;
        try {
            // 检查是否存在锁文件
            if (this.checkDictLockFile()) {
                this.logger.debug('Dictionary lock file exists, skipping translation');
                return;
            }
            const infos = await this.dictInfoEntity.find();
            const types = await this.dictTypeEntity.find();
            // 确保目录存在
            const infoDir = path.join(this.basePath, 'dict', 'info');
            const typeDir = path.join(this.basePath, 'dict', 'type');
            fs.mkdirSync(infoDir, { recursive: true });
            fs.mkdirSync(typeDir, { recursive: true });
            // 生成中文基础文件
            const infoContent = {};
            const typeContent = {};
            for (const info of infos) {
                infoContent[info.name] = info.name;
            }
            for (const type of types) {
                typeContent[type.name] = type.name;
            }
            const infoFile = path.join(infoDir, 'zh-cn.json');
            const typeFile = path.join(typeDir, 'zh-cn.json');
            const infoText = JSON.stringify(infoContent, null, 2);
            const typeText = JSON.stringify(typeContent, null, 2);
            fs.writeFileSync(infoFile, infoText);
            fs.writeFileSync(typeFile, typeText);
            this.logger.debug('Base dictionary files generated successfully');
            // 翻译其他语言
            if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.enable) && this.config.languages) {
                const translatePromises = [];
                for (const language of this.config.languages) {
                    if (language !== 'zh-cn') {
                        // 翻译 info 字典
                        translatePromises.push(this.invokeTranslate(infoText, language, infoDir, 'dict'));
                        // 翻译 type 字典
                        translatePromises.push(this.invokeTranslate(typeText, language, typeDir, 'dict'));
                    }
                }
                await Promise.all(translatePromises);
                this.logger.debug('Dictionary translations completed successfully');
            }
            // 创建锁文件
            this.createDictLockFile();
            // 更新翻译映射
            await this.loadDictTranslations();
        }
        catch (error) {
            this.logger.error('Failed to generate dictionary:', error);
            throw error;
        }
    }
    /**
     * 更新字典翻译映射
     * @param language 语言
     */
    async updateDictTranslationMap(language) {
        const infoFile = path.join(this.basePath, 'dict', 'info', `${language}.json`);
        const typeFile = path.join(this.basePath, 'dict', 'type', `${language}.json`);
        if (fs.existsSync(infoFile)) {
            const content = fs.readFileSync(infoFile, 'utf-8');
            const translations = JSON.parse(content);
            for (const [key, value] of Object.entries(translations)) {
                this.dictMap[`${language}:dict:info:${key}`] = value;
            }
        }
        if (fs.existsSync(typeFile)) {
            const content = fs.readFileSync(typeFile, 'utf-8');
            const translations = JSON.parse(content);
            for (const [key, value] of Object.entries(translations)) {
                this.dictMap[`${language}:dict:type:${key}`] = value;
            }
        }
    }
    /**
     * 生成基础菜单
     */
    async genBaseMenu() {
        const menus = await this.baseSysMenuEntity.find();
        const file = path.join(this.basePath, 'menu', 'zh-cn.json');
        const content = {};
        for (const menu of menus) {
            content[menu.name] = menu.name;
        }
        // 确保目录存在
        const msgDir = path.dirname(file);
        if (!fs.existsSync(msgDir)) {
            fs.mkdirSync(msgDir, { recursive: true });
        }
        const text = JSON.stringify(content, null, 2);
        fs.writeFileSync(file, text);
        this.logger.debug('base menu generate success');
        const translatePromises = [];
        for (const language of this.config.languages) {
            if (language !== 'zh-cn') {
                translatePromises.push(this.invokeTranslate(text, language, path.join(this.basePath, 'menu'), 'menu'));
            }
        }
        await Promise.all(translatePromises);
        this.createLockFile('menu');
    }
    /**
     * 生成基础消息
     */
    async genBaseMsg() {
        const file = path.join(this.basePath, 'msg', 'zh-cn.json');
        const scanPath = path.join(this.app.getBaseDir(), '..', 'src', 'modules');
        const messages = {};
        // 递归扫描目录
        const scanDir = (dir) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    scanDir(fullPath);
                }
                else if (file.endsWith('.ts')) {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    const matches = content.match(/throw new CoolCommException\((['"])(.*?)\1\)/g);
                    if (matches) {
                        matches.forEach(match => {
                            const message = match.match(/(['"])(.*?)\1/)[2];
                            messages[message] = message;
                        });
                    }
                }
            }
        };
        // 开始扫描
        scanDir(scanPath);
        // 确保目录存在
        const msgDir = path.dirname(file);
        if (!fs.existsSync(msgDir)) {
            fs.mkdirSync(msgDir, { recursive: true });
        }
        // 写入文件
        const text = JSON.stringify(messages, null, 2);
        fs.writeFileSync(file, text);
        this.logger.debug('base msg generate success');
        const translatePromises = [];
        for (const language of this.config.languages) {
            if (language !== 'zh-cn') {
                translatePromises.push(this.invokeTranslate(text, language, path.join(this.basePath, 'msg'), 'msg'));
            }
        }
        await Promise.all(translatePromises);
        this.createLockFile('msg');
    }
    /**
     * 生成通用消息
     */
    async genCommMsg() {
        const file = path.join(this.basePath, 'comm', 'zh-cn.json');
        const scanPath = path.join(this.app.getBaseDir(), '..', 'src', 'modules');
        const messages = {};
        // 递归扫描目录
        const scanDir = (dir) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    scanDir(fullPath);
                }
                else if (file.endsWith('.ts')) {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    const matches = content.match(/this.translate.comm\((['"])(.*?)\1\)/g);
                    if (matches) {
                        matches.forEach(match => {
                            const message = match.match(/(['"])(.*?)\1/)[2];
                            messages[message] = message;
                        });
                    }
                }
            }
        };
        // 开始扫描
        scanDir(scanPath);
        // 确保目录存在
        const msgDir = path.dirname(file);
        if (!fs.existsSync(msgDir)) {
            fs.mkdirSync(msgDir, { recursive: true });
        }
        // 写入文件
        const text = JSON.stringify(messages, null, 2);
        fs.writeFileSync(file, text);
        this.logger.debug('base comm generate success');
        const translatePromises = [];
        for (const language of this.config.languages) {
            if (language !== 'zh-cn') {
                translatePromises.push(this.invokeTranslate(text, language, path.join(this.basePath, 'comm'), 'comm'));
            }
        }
        await Promise.all(translatePromises);
        this.createLockFile('comm');
    }
    /**
     * 通用消息翻译
     * @param text 文本
     * @returns 翻译后的文本对象,包含各语言的翻译
     */
    comm(text) {
        const translations = {};
        for (const lang of this.config.languages) {
            const langFile = path.join(this.basePath, 'comm', `${lang}.json`);
            if (fs.existsSync(langFile)) {
                const content = JSON.parse(fs.readFileSync(langFile, 'utf-8'));
                translations[lang] = content[text] || text;
            }
        }
        return translations;
    }
    /**
     * 调用翻译
     * @param text 文本
     * @param language 语言
     * @param dirPath 目录
     * @param type 类型
     * @returns
     */
    async invokeTranslate(text, language, dirPath, type = 'msg') {
        this.logger.debug(`${type} ${language} translate start`);
        const response = await axios_1.default.post(core_1.I18N.DEFAULT_SERVICE_URL, {
            label: 'i18n-node',
            params: {
                text,
                language,
            },
            stream: false,
        });
        const file = path.join(dirPath, `${language}.json`);
        fs.writeFileSync(file, response.data.data.result.data);
        this.logger.debug(`${type} ${language} translate success`);
    }
};
exports.BaseTranslateService = BaseTranslateService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(menu_1.BaseSysMenuEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseTranslateService.prototype, "baseSysMenuEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.DictInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseTranslateService.prototype, "dictInfoEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(type_1.DictTypeEntity),
    __metadata("design:type", typeorm_2.Repository)
], BaseTranslateService.prototype, "dictTypeEntity", void 0);
__decorate([
    (0, core_2.App)(),
    __metadata("design:type", Object)
], BaseTranslateService.prototype, "app", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], BaseTranslateService.prototype, "logger", void 0);
__decorate([
    (0, core_2.Config)('cool.i18n'),
    __metadata("design:type", Object)
], BaseTranslateService.prototype, "config", void 0);
exports.BaseTranslateService = BaseTranslateService = __decorate([
    (0, core_2.Provide)(),
    (0, core_2.Scope)(core_2.ScopeEnum.Singleton)
], BaseTranslateService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9zZXJ2aWNlL3RyYW5zbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBeUM7QUFDekMsK0NBQXNEO0FBQ3RELHFDQUFxQztBQUNyQyw2Q0FBdUQ7QUFDdkQseUNBU3dCO0FBQ3hCLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsaUNBQTBCO0FBQzFCLGlEQUF3RDtBQUN4RCxpREFBd0Q7QUFDeEQ7O0dBRUc7QUFHSSxJQUFNLG9CQUFvQixHQUExQixNQUFNLG9CQUFvQjtJQUExQjtRQTZCTCxZQUFPLEdBQTJCLEVBQUUsQ0FBQztRQUVyQyxXQUFNLEdBQTJCLEVBQUUsQ0FBQztRQUVwQyxZQUFPLEdBQTJCLEVBQUUsQ0FBQztRQUVyQyxTQUFTO1FBQ1QsWUFBTyxHQUEyQixFQUFFLENBQUM7SUErZ0J2QyxDQUFDO0lBN2dCQzs7T0FFRztJQUNLLGFBQWEsQ0FBQyxJQUE2QjtRQUNqRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxjQUFjLENBQUMsSUFBNkI7UUFDbEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQjs7UUFDcEIsSUFBSSxDQUFDLENBQUEs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