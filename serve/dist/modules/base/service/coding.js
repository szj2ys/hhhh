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
exports.BaseCodingService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const fs = require("fs");
const path = require("path");
/**
 * Ai编码
 */
let BaseCodingService = class BaseCodingService extends core_2.BaseService {
    /**
     * 获得模块目录结构
     */
    async getModuleTree() {
        if (this.app.getEnv() !== 'local') {
            return [];
        }
        const moduleDir = await this.app.getBaseDir();
        const modulesPath = path.join(moduleDir, 'modules');
        // 返回modules下有多少个模块
        const modules = fs.readdirSync(modulesPath);
        return modules.filter(module => module !== '.DS_Store');
    }
    /**
     * 创建代码
     * @param codes 代码
     */
    async createCode(codes) {
        if (this.app.getEnv() !== 'local') {
            throw new Error('只能在开发环境下创建代码');
        }
        const moduleDir = this.app.getAppDir();
        for (const code of codes) {
            // 格式化代码内容
            const formattedContent = await this.formatContent(code.content);
            // 获取完整的文件路径
            const filePath = path.join(moduleDir, code.path);
            // 确保目录存在
            const dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
            // 写入文件
            fs.writeFileSync(filePath, formattedContent, 'utf8');
        }
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
};
exports.BaseCodingService = BaseCodingService;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], BaseCodingService.prototype, "app", void 0);
exports.BaseCodingService = BaseCodingService = __decorate([
    (0, core_1.Provide)()
], BaseCodingService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9zZXJ2aWNlL2NvZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBZ0Y7QUFDaEYsNENBQWdEO0FBQ2hELHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0I7O0dBRUc7QUFFSSxJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFrQixTQUFRLGtCQUFXO0lBSWhEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGFBQWE7UUFDakIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQ2xDLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM5QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRCxtQkFBbUI7UUFDbkIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQ2QsS0FHRztRQUVILElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXZDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7WUFDekIsVUFBVTtZQUNWLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVoRSxZQUFZO1lBQ1osTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWpELFNBQVM7WUFDVCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUVELE9BQU87WUFDUCxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBZTtRQUNqQyxrQkFBa0I7UUFDbEIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDOUIsTUFBTSxFQUFFLFlBQVk7WUFDcEIsV0FBVyxFQUFFLElBQUk7WUFDakIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsV0FBVyxFQUFFLE9BQU87WUFDcEIsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQXJFWSw4Q0FBaUI7QUFFNUI7SUFEQyxJQUFBLFVBQUcsR0FBRTs7OENBQ2tCOzRCQUZiLGlCQUFpQjtJQUQ3QixJQUFBLGNBQU8sR0FBRTtHQUNHLGlCQUFpQixDQXFFN0IifQ==