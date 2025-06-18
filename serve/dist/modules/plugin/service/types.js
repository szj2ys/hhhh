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
exports.PluginTypesService = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const typeorm_1 = require("@midwayjs/typeorm");
const fs = require("fs");
const path = require("path");
const typeorm_2 = require("typeorm");
const ts = require("typescript");
const utils_1 = require("../../../comm/utils");
const info_1 = require("../entity/info");
const info_2 = require("./info");
/**
 * 插件类型服务
 */
let PluginTypesService = class PluginTypesService extends core_1.BaseService {
    /**
     * 生成d.ts文件
     * @param tsContent
     * @returns
     */
    async dtsContent(tsContent) {
        let output = '';
        const compilerHost = {
            fileExists: ts.sys.fileExists,
            getCanonicalFileName: ts.sys.useCaseSensitiveFileNames
                ? s => s
                : s => s.toLowerCase(),
            getCurrentDirectory: ts.sys.getCurrentDirectory,
            getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
            getDirectories: ts.sys.getDirectories,
            getNewLine: () => ts.sys.newLine,
            getSourceFile: (fileName, languageVersion) => {
                if (fileName === 'file.ts') {
                    return ts.createSourceFile(fileName, tsContent, languageVersion, true);
                }
                const filePath = ts.sys.resolvePath(fileName);
                return ts.sys.readFile(filePath)
                    ? ts.createSourceFile(filePath, ts.sys.readFile(filePath), languageVersion, true)
                    : undefined;
            },
            readFile: ts.sys.readFile,
            useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
            writeFile: (fileName, content) => {
                if (fileName.includes('file.d.ts')) {
                    output = content || output;
                }
            },
        };
        const options = {
            declaration: true,
            emitDeclarationOnly: true,
            outDir: './',
            skipLibCheck: true,
            skipDefaultLibCheck: true,
            noEmitOnError: false,
            target: ts.ScriptTarget.ES2018,
            strict: false,
            module: ts.ModuleKind.Node16,
            moduleResolution: ts.ModuleResolutionKind.Node16,
            types: ['node'],
        };
        const program = ts.createProgram(['file.ts'], options, compilerHost);
        program.emit();
        if (!output) {
            // Provide a default value if the output is still empty
            output = '/* No declaration content generated */';
        }
        return output;
    }
    /**
     * 生成d.ts文件
     * @param key
     * @param tsContent
     * @returns
     */
    async generateDtsFile(key, tsContent) {
        const env = this.app.getEnv();
        // 不是本地开发环境不生成d.ts文件
        if (env != 'local' || !tsContent) {
            return;
        }
        // 基础路径
        const basePath = path.join(this.app.getBaseDir(), '..', 'typings');
        // pluginDts文件路径
        const pluginDtsPath = path.join(basePath, 'plugin.d.ts');
        // plugin文件夹路径
        const pluginPath = path.join(basePath, `${key}.d.ts`);
        // 生成d.ts文件
        const dtsContent = await this.dtsContent(tsContent);
        // 读取plugin.d.ts文件内容
        let pluginDtsContent = fs.readFileSync(pluginDtsPath, 'utf-8');
        // 根据key判断是否在PluginMap中存在
        const keyWithHyphen = key.includes('-');
        const importStatement = keyWithHyphen
            ? `import * as ${key.replace(/-/g, '_')} from './${key}';`
            : `import * as ${key} from './${key}';`;
        const pluginMapEntry = keyWithHyphen
            ? `'${key}': ${key.replace(/-/g, '_')}.CoolPlugin;`
            : `${key}: ${key}.CoolPlugin;`;
        // 检查import语句是否已经存在，若不存在则添加
        if (!pluginDtsContent.includes(importStatement)) {
            pluginDtsContent = `${importStatement}\n${pluginDtsContent}`;
        }
        // 检查PluginMap中的键是否存在，若不存在则添加
        if (pluginDtsContent.includes(pluginMapEntry)) {
            // 键存在则覆盖
            const regex = new RegExp(`(\\s*${keyWithHyphen ? `'${key}'` : key}:\\s*[^;]+;)`);
            pluginDtsContent = pluginDtsContent.replace(regex, pluginMapEntry);
        }
        else {
            // 键不存在则追加
            const pluginMapRegex = /interface\s+PluginMap\s*{([^}]*)}/;
            pluginDtsContent = pluginDtsContent.replace(pluginMapRegex, (match, p1) => {
                return match.replace(p1, `${p1.trim()}\n  ${pluginMapEntry}`);
            });
        }
        // 格式化内容
        pluginDtsContent = await this.formatContent(pluginDtsContent);
        // 延迟2秒写入文件
        setTimeout(async () => {
            // 写入d.ts文件，如果存在则覆盖
            fs.writeFile(pluginPath, await this.formatContent(dtsContent), () => { });
            // 写入plugin.d.ts文件
            fs.writeFile(pluginDtsPath, pluginDtsContent, () => { });
        }, 2000);
    }
    /**
     * 删除d.ts文件中的指定key
     * @param key
     */
    async deleteDtsFile(key) {
        const env = this.app.getEnv();
        // 不是本地开发环境不删除d.ts文件
        if (env != 'local') {
            return;
        }
        // 基础路径
        const basePath = path.join(this.app.getBaseDir(), '..', 'typings');
        // pluginDts文件路径
        const pluginDtsPath = path.join(basePath, 'plugin.d.ts');
        // plugin文件夹路径
        const pluginPath = path.join(basePath, `${key}.d.ts`);
        // 读取plugin.d.ts文件内容
        let pluginDtsContent = fs.readFileSync(pluginDtsPath, 'utf-8');
        // 根据key判断是否在PluginMap中存在
        const keyWithHyphen = key.includes('-');
        const importStatement = keyWithHyphen
            ? `import \\* as ${key.replace(/-/g, '_')} from '\\./${key}';`
            : `import \\* as ${key} from '\\./${key}';`;
        const pluginMapEntry = keyWithHyphen
            ? `'${key}': ${key.replace(/-/g, '_')}.CoolPlugin;`
            : `${key}: ${key}.CoolPlugin;`;
        // 删除import语句
        const importRegex = new RegExp(`${importStatement}\\n`, 'g');
        pluginDtsContent = pluginDtsContent.replace(importRegex, '');
        // 删除PluginMap中的键
        const pluginMapRegex = new RegExp(`\\s*${pluginMapEntry}`, 'g');
        pluginDtsContent = pluginDtsContent.replace(pluginMapRegex, '');
        // 格式化内容
        pluginDtsContent = await this.formatContent(pluginDtsContent);
        // 延迟2秒写入文件
        setTimeout(async () => {
            // 删除插件d.ts文件
            if (fs.existsSync(pluginPath)) {
                fs.unlink(pluginPath, () => { });
            }
            // 写入plugin.d.ts文件
            fs.writeFile(pluginDtsPath, pluginDtsContent, () => { });
        }, 2000);
    }
    /**
     * 格式化内容
     * @param content
     */
    async formatContent(content) {
        // 使用prettier格式化内容
        const prettier = require('prettier');
        return prettier.format(content, {
            parser: 'typescript',
            singleQuote: true,
            trailingComma: 'all',
            bracketSpacing: true,
            arrowParens: 'avoid',
            printWidth: 80,
        });
    }
    /**
     * 重新生成d.ts文件
     */
    async reGenerate() {
        var _a;
        const pluginInfos = await this.pluginInfoEntity
            .createQueryBuilder('a')
            .where('a.status = :status', { status: 1 })
            .select(['a.id', 'a.status', 'a.tsContent', 'a.keyName'])
            .getMany();
        for (const pluginInfo of pluginInfos) {
            const data = await this.pluginService.getData(pluginInfo.keyName);
            if (!data) {
                continue;
            }
            const tsContent = (_a = data.tsContent) === null || _a === void 0 ? void 0 : _a.data;
            if (tsContent) {
                await this.generateDtsFile(pluginInfo.keyName, tsContent);
                await this.utils.sleep(200);
            }
        }
    }
};
exports.PluginTypesService = PluginTypesService;
__decorate([
    (0, core_2.App)(),
    __metadata("design:type", Object)
], PluginTypesService.prototype, "app", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.PluginInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], PluginTypesService.prototype, "pluginInfoEntity", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_2.PluginService)
], PluginTypesService.prototype, "pluginService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", utils_1.Utils)
], PluginTypesService.prototype, "utils", void 0);
exports.PluginTypesService = PluginTypesService = __decorate([
    (0, core_2.Provide)()
], PluginTypesService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wbHVnaW4vc2VydmljZS90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBZ0Q7QUFDaEQseUNBQTBFO0FBQzFFLCtDQUFzRDtBQUN0RCx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLHFDQUFxQztBQUNyQyxpQ0FBaUM7QUFDakMsK0NBQTRDO0FBQzVDLHlDQUFrRDtBQUNsRCxpQ0FBdUM7QUFFdkM7O0dBRUc7QUFFSSxJQUFNLGtCQUFrQixHQUF4QixNQUFNLGtCQUFtQixTQUFRLGtCQUFXO0lBYWpEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQWlCO1FBQ2hDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixNQUFNLFlBQVksR0FBb0I7WUFDcEMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVTtZQUM3QixvQkFBb0IsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLHlCQUF5QjtnQkFDcEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQ3hCLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CO1lBQy9DLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztZQUNuRSxjQUFjLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjO1lBQ3JDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU87WUFDaEMsYUFBYSxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxFQUFFO2dCQUMzQyxJQUFJLFFBQVEsS0FBSyxTQUFTLEVB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