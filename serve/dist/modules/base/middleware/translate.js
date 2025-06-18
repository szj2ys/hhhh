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
exports.BaseTranslateMiddleware = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@midwayjs/core");
const translate_1 = require("../service/translate");
const core_3 = require("@cool-midway/core");
/**
 * 翻译中间件
 */
let BaseTranslateMiddleware = class BaseTranslateMiddleware {
    resolve() {
        return async (ctx, next) => {
            const url = ctx.url;
            const language = ctx.get('language');
            let data;
            try {
                data = await next();
            }
            catch (error) {
                this.logger.error(error);
                // 处理翻译消息
                if (error.name == 'CoolCommException') {
                    if (error.message && error.message !== 'success') {
                        ctx.status = error.statusCode || 200;
                        ctx.body = {
                            code: core_3.RESCODE.COMMFAIL,
                            message: await this.baseTranslateService.translate('msg', language, error.message),
                        };
                        return;
                    }
                }
                ctx.status = 200;
                ctx.body = {
                    code: core_3.RESCODE.COMMFAIL,
                    message: error.message,
                };
                return;
            }
            if (!this.config.enable) {
                return;
            }
            // 处理菜单翻译
            if (url == '/admin/base/comm/permmenu') {
                for (const menu of data.data.menus) {
                    if (menu.name) {
                        menu.name = await this.baseTranslateService.translate('menu', language, menu.name);
                    }
                }
            }
            if (url == '/admin/base/sys/menu/list') {
                for (const menu of data.data) {
                    if (menu.name) {
                        menu.name = await this.baseTranslateService.translate('menu', language, menu.name);
                    }
                }
            }
            // 处理字典翻译
            if (url == '/admin/dict/info/list') {
                for (const dict of data.data) {
                    dict.name = await this.baseTranslateService.translate('dict:info', language, dict.name);
                }
            }
            if (url == '/admin/dict/type/page') {
                for (const dict of data.data.list) {
                    dict.name = await this.baseTranslateService.translate('dict:type', language, dict.name);
                }
            }
            if (url == '/admin/dict/info/data' || url == '/app/dict/info/data') {
                for (const key in data.data) {
                    for (const item of data.data[key]) {
                        item.name = await this.baseTranslateService.translate('dict:info', language, item.name);
                    }
                }
            }
        };
    }
};
exports.BaseTranslateMiddleware = BaseTranslateMiddleware;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", translate_1.BaseTranslateService)
], BaseTranslateMiddleware.prototype, "baseTranslateService", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], BaseTranslateMiddleware.prototype, "logger", void 0);
__decorate([
    (0, core_1.Config)('cool.i18n'),
    __metadata("design:type", Object)
], BaseTranslateMiddleware.prototype, "config", void 0);
exports.BaseTranslateMiddleware = BaseTranslateMiddleware = __decorate([
    (0, core_1.Middleware)()
], BaseTranslateMiddleware);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9taWRkbGV3YXJlL3RyYW5zbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkQ7QUFFN0QseUNBQXFEO0FBQ3JELG9EQUE0RDtBQUU1RCw0Q0FBNEM7QUFDNUM7O0dBRUc7QUFFSSxJQUFNLHVCQUF1QixHQUE3QixNQUFNLHVCQUF1QjtJQW1CbEMsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDdkMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNwQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksSUFBSSxDQUFDO1lBQ1QsSUFBSSxDQUFDO2dCQUNILElBQUksR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDO1lBQ3RCLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixTQUFTO2dCQUNULElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxtQkFBbUIsRUFBRSxDQUFDO29CQUN0QyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUUsQ0FBQzt3QkFDakQsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQzt3QkFDckMsR0FBRyxDQUFDLElBQUksR0FBRzs0QkFDVCxJQUFJLEVBQUUsY0FBTyxDQUFDLFFBQVE7NEJBQ3RCLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQ2hELEtBQUssRUFDTCxRQUFRLEVBQ1IsS0FBSyxDQUFDLE9BQU8sQ0FD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