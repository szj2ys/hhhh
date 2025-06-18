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
exports.KnowLoaderService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const multi_1 = require("../loader/multi");
const text_1 = require("../loader/text");
const link_1 = require("../loader/link");
/**
 * 非结构化文档加载器
 */
let KnowLoaderService = class KnowLoaderService extends core_2.BaseService {
    /**
     * 加载文本
     * @param text
     */
    async loadText(text) {
        return await this.knowTextLoader.load(text);
    }
    /**
     * 加载文件
     * @param filePath
     */
    async loadFile(filePath) {
        const fileContent = await this.knowMultiLoader.load(filePath);
        return {
            docs: fileContent,
            fileContent: fileContent.map(doc => doc.pageContent).join('\n\n'),
        };
    }
    /**
     * 加载链接
     * @param link
     * @returns
     */
    async loadLink(link) {
        return await this.knowLinkLoader.load(link, { titleOnly: true });
    }
    /**
     * 加载链接
     * @param link
     * @returns
     */
    async loadFileByLink(link) {
        return await this.knowMultiLoader.loadByLink(link);
    }
    /**
     * 解析链接
     * @param link
     * @param callback
     * @returns
     */
    async parseUrl(link, callback) {
        return await this.knowLinkLoader.parseUrl(link, callback);
    }
};
exports.KnowLoaderService = KnowLoaderService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", multi_1.KnowMultiLoader)
], KnowLoaderService.prototype, "knowMultiLoader", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", text_1.KnowTextLoader)
], KnowLoaderService.prototype, "knowTextLoader", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", link_1.KnowLinkLoader)
], KnowLoaderService.prototype, "knowLinkLoader", void 0);
exports.KnowLoaderService = KnowLoaderService = __decorate([
    (0, core_1.Provide)()
], KnowLoaderService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9zZXJ2aWNlL2xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFDakQsNENBQWdEO0FBQ2hELDJDQUFrRDtBQUNsRCx5Q0FBZ0Q7QUFDaEQseUNBQWdEO0FBRWhEOztHQUVHO0FBRUksSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBa0IsU0FBUSxrQkFBVztJQVVoRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLElBQVk7UUFDekIsT0FBTyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQWdCO1FBQzdCLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUQsT0FBTztZQUNMLElBQUksRUFBRSxXQUFXO1lBQ2pCLFdBQVcsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbEUsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFZO1FBQ3pCLE9BQU8sTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBWTtRQUMvQixPQUFPLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FDWixJQUFZLEVBQ1osUUFBd0Q7UUFFeEQsT0FBTyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0YsQ0FBQTtBQTVEWSw4Q0FBaUI7QUFFNUI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDUSx1QkFBZTswREFBQztBQUdqQztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNPLHFCQUFjO3lEQUFDO0FBRy9CO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ08scUJBQWM7eURBQUM7NEJBUnBCLGlCQUFpQjtJQUQ3QixJQUFBLGNBQU8sR0FBRTtHQUNHLGlCQUFpQixDQTREN0IifQ==