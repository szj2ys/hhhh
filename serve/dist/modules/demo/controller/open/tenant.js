"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenDemoTenantController = void 0;
const core_1 = require("@cool-midway/core");
const goods_1 = require("../../entity/goods");
const tenant_1 = require("../../service/tenant");
/**
 * 多租户
 */
let OpenDemoTenantController = class OpenDemoTenantController extends core_1.BaseController {
};
exports.OpenDemoTenantController = OpenDemoTenantController;
exports.OpenDemoTenantController = OpenDemoTenantController = __decorate([
    (0, core_1.CoolController)({
        api: [],
        entity: goods_1.DemoGoodsEntity,
        service: tenant_1.DemoTenantService,
    })
], OpenDemoTenantController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZGVtby9jb250cm9sbGVyL29wZW4vdGVuYW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDRDQUFtRTtBQUNuRSw4Q0FBcUQ7QUFDckQsaURBQXlEO0FBRXpEOztHQUVHO0FBTUksSUFBTSx3QkFBd0IsR0FBOUIsTUFBTSx3QkFBeUIsU0FBUSxxQkFBYztDQUFHLENBQUE7QUFBbEQsNERBQXdCO21DQUF4Qix3QkFBd0I7SUFMcEMsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLEVBQUU7UUFDUCxNQUFNLEVBQUUsdUJBQWU7UUFDdkIsT0FBTyxFQUFFLDBCQUFpQjtLQUMzQixDQUFDO0dBQ1csd0JBQXdCLENBQTBCIn0=