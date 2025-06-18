"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAppSpaceTypeController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const type_1 = require("../../entity/type");
const type_2 = require("../../service/type");
/**
 * 空间分类
 */
let BaseAppSpaceTypeController = class BaseAppSpaceTypeController extends core_2.BaseController {
};
exports.BaseAppSpaceTypeController = BaseAppSpaceTypeController;
exports.BaseAppSpaceTypeController = BaseAppSpaceTypeController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: type_1.SpaceTypeEntity,
        service: type_2.SpaceTypeService,
    })
], BaseAppSpaceTypeController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NwYWNlL2NvbnRyb2xsZXIvYWRtaW4vdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsNENBQW1FO0FBQ25FLDRDQUFvRDtBQUNwRCw2Q0FBc0Q7QUFFdEQ7O0dBRUc7QUFPSSxJQUFNLDBCQUEwQixHQUFoQyxNQUFNLDBCQUEyQixTQUFRLHFCQUFjO0NBQUcsQ0FBQTtBQUFwRCxnRUFBMEI7cUNBQTFCLDBCQUEwQjtJQU50QyxJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxzQkFBZTtRQUN2QixPQUFPLEVBQUUsdUJBQWdCO0tBQzFCLENBQUM7R0FDVywwQkFBMEIsQ0FBMEIifQ==