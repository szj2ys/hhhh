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
exports.AdminKnowSplitterController = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const splitter_1 = require("../../service/splitter");
const stream_1 = require("stream");
/**
 * 知识拆分
 */
let AdminKnowSplitterController = class AdminKnowSplitterController extends core_1.BaseController {
    async comm(config) {
        // 设置响应头
        this.ctx.set('Content-Type', 'text/event-stream');
        this.ctx.set('Cache-Control', 'no-cache');
        this.ctx.set('Connection', 'keep-alive');
        const resStream = new stream_1.PassThrough();
        this.knowSplitterService
            .comm(config, chunk => {
            resStream.write(`data:${JSON.stringify({ chunk, isEnd: false })}\n\n`);
        })
            .then(() => {
            resStream.write(`data:${JSON.stringify({ isEnd: true })}\n\n`);
            resStream.end();
        });
        this.ctx.status = 200;
        this.ctx.body = resStream;
    }
};
exports.AdminKnowSplitterController = AdminKnowSplitterController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", splitter_1.KnowSplitterService)
], AdminKnowSplitterController.prototype, "knowSplitterService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], AdminKnowSplitterController.prototype, "ctx", void 0);
__decorate([
    (0, core_2.Post)('/comm', { summary: '通用' }),
    __param(0, (0, core_2.Body)('config')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminKnowSplitterController.prototype, "comm", null);
exports.AdminKnowSplitterController = AdminKnowSplitterController = __decorate([
    (0, core_1.CoolController)()
], AdminKnowSplitterController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L2NvbnRyb2xsZXIvYWRtaW4vc3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQW1FO0FBQ25FLHlDQUFvRDtBQUNwRCxxREFBNkQ7QUFFN0QsbUNBQXFDO0FBeUJyQzs7R0FFRztBQUVJLElBQU0sMkJBQTJCLEdBQWpDLE1BQU0sMkJBQTRCLFNBQVEscUJBQWM7SUFRdkQsQUFBTixLQUFLLENBQUMsSUFBSSxDQUFpQixNQUEwQjtRQUNuRCxRQUFRO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztRQUVwQyxJQUFJLENBQUMsbUJBQW1CO2FBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDcEIsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvRCxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBQzVCLENBQUM7Q0FDRixDQUFBO0FBNUJZLGtFQUEyQjtBQUV0QztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNZLDhCQUFtQjt3RUFBQztBQUd6QztJQURDLElBQUEsYUFBTSxHQUFFOzt3REFDSTtBQUdQO0lBREwsSUFBQSxXQUFJLEVBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3JCLFdBQUEsSUFBQSxXQUFJLEVBQUMsUUFBUSxDQUFDLENBQUE7Ozs7dURBbUJ6QjtzQ0EzQlUsMkJBQTJCO0lBRHZDLElBQUEscUJBQWMsR0FBRTtHQUNKLDJCQUEyQixDQTRCdkMifQ==