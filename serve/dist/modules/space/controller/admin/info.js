"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAppSpaceInfoController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const info_1 = require("../../entity/info");
const info_2 = require("../../service/info");
/**
 * 图片空间信息
 */
let BaseAppSpaceInfoController = class BaseAppSpaceInfoController extends core_2.BaseController {
};
exports.BaseAppSpaceInfoController = BaseAppSpaceInfoController;
exports.BaseAppSpaceInfoController = BaseAppSpaceInfoController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: info_1.SpaceInfoEntity,
        service: info_2.SpaceInfoService,
        pageQueryOp: {
            fieldEq: ['type', 'classifyId'],
        },
    })
], BaseAppSpaceInfoController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NwYWNlL2NvbnRyb2xsZXIvYWRtaW4vaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsNENBQW1FO0FBQ25FLDRDQUFvRDtBQUNwRCw2Q0FBc0Q7QUFFdEQ7O0dBRUc7QUFVSSxJQUFNLDBCQUEwQixHQUFoQyxNQUFNLDBCQUEyQixTQUFRLHFCQUFjO0NBQUcsQ0FBQTtBQUFwRCxnRUFBMEI7cUNBQTFCLDBCQUEwQjtJQVR0QyxJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxzQkFBZTtRQUN2QixPQUFPLEVBQUUsdUJBQWdCO1FBQ3pCLFdBQVcsRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7U0FDaEM7S0FDRixDQUFDO0dBQ1csMEJBQTBCLENBQTBCIn0=