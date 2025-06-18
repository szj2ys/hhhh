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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminKnowLoaderController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const loader_1 = require("../../service/loader");
const stream_1 = require("stream");
/**
 * 知识库加载器
 */
let AdminKnowLoaderController = class AdminKnowLoaderController extends core_1.BaseController {
    async fileByLink(link) {
        return this.ok(await this.knowLoaderService.loadFileByLink(link));
    }
    async link(link) {
        return this.ok(await this.knowLoaderService.loadLink(link));
    }
    async parseUrl(link) {
        // 设置响应头
        this.ctx.set('Content-Type', 'text/event-stream');
        this.ctx.set('Cache-Control', 'no-cache');
        this.ctx.set('Connection', 'keep-alive');
        const resStream = new stream_1.PassThrough();
        this.knowLoaderService
            .parseUrl(link, result => {
            resStream.write(`data:${JSON.stringify({ ...result, isEnd: false })}\n\n`);
        })
            .then(() => {
            resStream.write(`data:${JSON.stringify({ isEnd: true })}\n\n`);
            resStream.end();
        });
        this.ctx.status = 200;
        this.ctx.body = resStream;
    }
};
exports.AdminKnowLoaderController = AdminKnowLoaderController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", loader_1.KnowLoaderService)
], AdminKnowLoaderController.prototype, "knowLoaderService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], AdminKnowLoaderController.prototype, "ctx", void 0);
__decorate([
    (0, core_2.Post)('/fileByLink', { summary: '通过文件链接加载' }),
    __param(0, (0, core_2.Body)('link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminKnowLoaderController.prototype, "fileByLink", null);
__decorate([
    (0, core_2.Post)('/link', { summary: '加载链接' }),
    __param(0, (0, core_2.Body)('link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminKnowLoaderController.prototype, "link", null);
__decorate([
    (0, core_2.Post)('/parseUrl', { summary: '解析链接' }),
    __param(0, (0, core_2.Body)('link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminKnowLoaderController.prototype, "parseUrl", null);
exports.AdminKnowLoaderController = AdminKnowLoaderController = __decorate([
    (0, core_1.CoolController)()
], AdminKnowLoaderController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9jb250cm9sbGVyL2FkbWluL2xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUseUNBQW9EO0FBQ3BELGlEQUF5RDtBQUV6RCxtQ0FBcUM7QUFFckM7O0dBRUc7QUFFSSxJQUFNLHlCQUF5QixHQUEvQixNQUFNLHlCQUEwQixTQUFRLHFCQUFjO0lBUXJELEFBQU4sS0FBSyxDQUFDLFVBQVUsQ0FBZSxJQUFZO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsSUFBSSxDQUFlLElBQVk7UUFDbkMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxRQUFRLENBQWUsSUFBWTtRQUN2QyxRQUFRO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztRQUVwQyxJQUFJLENBQUMsaUJBQWlCO2FBQ25CLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDdkIsU0FBUyxDQUFDLEtBQUssQ0FDYixRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUMxRCxDQUFDO1FBQ0osQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9ELFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQztDQUNGLENBQUE7QUF2Q1ksOERBQXlCO0FBRXBDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1UsMEJBQWlCO29FQUFDO0FBR3JDO0lBREMsSUFBQSxhQUFNLEdBQUU7O3NEQUNJO0FBR1A7SUFETCxJQUFBLFdBQUksRUFBQyxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDM0IsV0FBQSxJQUFBLFdBQUksRUFBQyxNQUFNLENBQUMsQ0FBQTs7OzsyREFFN0I7QUFHSztJQURMLElBQUEsV0FBSSxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN2QixXQUFBLElBQUEsV0FBSSxFQUFDLE1BQU0sQ0FBQyxDQUFBOzs7O3FEQUV2QjtBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLFdBQUEsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDLENBQUE7Ozs7eURBb0IzQjtvQ0F0Q1UseUJBQXlCO0lBRHJDLElBQUEscUJBQWMsR0FBRTtHQUNKLHlCQUF5QixDQXVDckMifQ==