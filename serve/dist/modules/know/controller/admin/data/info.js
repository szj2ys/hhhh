"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminKnowDataInfoController = void 0;
const core_1 = require("@cool-midway/core");
const info_1 = require("../../../entity/data/info");
const info_2 = require("../../../service/data/info");
/**
 * 知识信息
 */
let AdminKnowDataInfoController = class AdminKnowDataInfoController extends core_1.BaseController {
};
exports.AdminKnowDataInfoController = AdminKnowDataInfoController;
exports.AdminKnowDataInfoController = AdminKnowDataInfoController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: info_1.KnowDataInfoEntity,
        service: info_2.KnowDataInfoService,
        pageQueryOp: {
            keyWordLikeFields: ['a.title'],
            fieldEq: ['a.typeId', 'a.from', 'a.sourceId'],
        },
    })
], AdminKnowDataInfoController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvY29udHJvbGxlci9hZG1pbi9kYXRhL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsNENBQW1FO0FBQ25FLG9EQUErRDtBQUMvRCxxREFBaUU7QUFFakU7O0dBRUc7QUFVSSxJQUFNLDJCQUEyQixHQUFqQyxNQUFNLDJCQUE0QixTQUFRLHFCQUFjO0NBQUcsQ0FBQTtBQUFyRCxrRUFBMkI7c0NBQTNCLDJCQUEyQjtJQVR2QyxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUseUJBQWtCO1FBQzFCLE9BQU8sRUFBRSwwQkFBbUI7UUFDNUIsV0FBVyxFQUFFO1lBQ1gsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDOUIsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7U0FDOUM7S0FDRixDQUFDO0dBQ1csMkJBQTJCLENBQTBCIn0=