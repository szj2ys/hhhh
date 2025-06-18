"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoI18nController = void 0;
const core_1 = require("@cool-midway/core");
const i18n_1 = require("../../service/i18n");
/**
 * 国际化
 */
let DemoI18nController = class DemoI18nController extends core_1.BaseController {
};
exports.DemoI18nController = DemoI18nController;
exports.DemoI18nController = DemoI18nController = __decorate([
    (0, core_1.CoolController)({
        serviceApis: [
            {
                method: 'en',
                summary: '翻译成英文',
            },
            {
                method: 'tw',
                summary: '翻译成繁体',
            },
        ],
        service: i18n_1.DemoI18nService,
    })
], DemoI18nController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RlbW8vY29udHJvbGxlci9vcGVuL2kxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsNENBQW1FO0FBQ25FLDZDQUFxRDtBQUVyRDs7R0FFRztBQWNJLElBQU0sa0JBQWtCLEdBQXhCLE1BQU0sa0JBQW1CLFNBQVEscUJBQWM7Q0FBRyxDQUFBO0FBQTVDLGdEQUFrQjs2QkFBbEIsa0JBQWtCO0lBYjlCLElBQUEscUJBQWMsRUFBQztRQUNkLFdBQVcsRUFBRTtZQUNYO2dCQUNFLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxPQUFPO2FBQ2pCO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLE9BQU87YUFDakI7U0FDRjtRQUNELE9BQU8sRUFBRSxzQkFBZTtLQUN6QixDQUFDO0dBQ1csa0JBQWtCLENBQTBCIn0=