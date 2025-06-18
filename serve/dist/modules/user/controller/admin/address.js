"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserAddressesController = void 0;
const core_1 = require("@cool-midway/core");
const address_1 = require("../../entity/address");
const address_2 = require("../../service/address");
/**
 * 用户-地址
 */
let AdminUserAddressesController = class AdminUserAddressesController extends core_1.BaseController {
};
exports.AdminUserAddressesController = AdminUserAddressesController;
exports.AdminUserAddressesController = AdminUserAddressesController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: address_1.UserAddressEntity,
        service: address_2.UserAddressService,
    })
], AdminUserAddressesController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXIvY29udHJvbGxlci9hZG1pbi9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDRDQUFtRTtBQUNuRSxrREFBeUQ7QUFDekQsbURBQTJEO0FBRTNEOztHQUVHO0FBTUksSUFBTSw0QkFBNEIsR0FBbEMsTUFBTSw0QkFBNkIsU0FBUSxxQkFBYztDQUFHLENBQUE7QUFBdEQsb0VBQTRCO3VDQUE1Qiw0QkFBNEI7SUFMeEMsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLDJCQUFpQjtRQUN6QixPQUFPLEVBQUUsNEJBQWtCO0tBQzVCLENBQUM7R0FDVyw0QkFBNEIsQ0FBMEIifQ==