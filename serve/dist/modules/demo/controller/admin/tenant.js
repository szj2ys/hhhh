"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDemoTenantController = void 0;
const core_1 = require("@cool-midway/core");
const goods_1 = require("../../entity/goods");
const tenant_1 = require("../../service/tenant");
/**
 * 多租户
 */
let AdminDemoTenantController = class AdminDemoTenantController extends core_1.BaseController {
};
exports.AdminDemoTenantController = AdminDemoTenantController;
exports.AdminDemoTenantController = AdminDemoTenantController = __decorate([
    (0, core_1.CoolController)({
        serviceApis: [
            'use',
            {
                method: 'noUse',
                summary: '不使用多租户',
            },
            {
                method: 'noTenant',
                summary: '局部不使用多租户',
            },
        ],
        entity: goods_1.DemoGoodsEntity,
        service: tenant_1.DemoTenantService,
    })
], AdminDemoTenantController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZGVtby9jb250cm9sbGVyL2FkbWluL3RlbmFudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUsOENBQXFEO0FBQ3JELGlEQUF5RDtBQUV6RDs7R0FFRztBQWdCSSxJQUFNLHlCQUF5QixHQUEvQixNQUFNLHlCQUEwQixTQUFRLHFCQUFjO0NBQUcsQ0FBQTtBQUFuRCw4REFBeUI7b0NBQXpCLHlCQUF5QjtJQWZyQyxJQUFBLHFCQUFjLEVBQUM7UUFDZCxXQUFXLEVBQUU7WUFDWCxLQUFLO1lBQ0w7Z0JBQ0UsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLFFBQVE7YUFDbEI7WUFDRDtnQkFDRSxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsT0FBTyxFQUFFLFVBQVU7YUFDcEI7U0FDRjtRQUNELE1BQU0sRUFBRSx1QkFBZTtRQUN2QixPQUFPLEVBQUUsMEJBQWlCO0tBQzNCLENBQUM7R0FDVyx5QkFBeUIsQ0FBMEIifQ==