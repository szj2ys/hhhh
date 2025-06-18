"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminKnowDataSourceController = void 0;
const core_1 = require("@cool-midway/core");
const source_1 = require("../../../entity/data/source");
const source_2 = require("../../../service/data/source");
/**
 * 数据源
 */
let AdminKnowDataSourceController = class AdminKnowDataSourceController extends core_1.BaseController {
};
exports.AdminKnowDataSourceController = AdminKnowDataSourceController;
exports.AdminKnowDataSourceController = AdminKnowDataSourceController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: source_1.KnowDataSourceEntity,
        service: source_2.KnowDataSourceService,
        pageQueryOp: {
            keyWordLikeFields: ['a.title'],
            fieldEq: ['a.typeId'],
        },
    })
], AdminKnowDataSourceController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9jb250cm9sbGVyL2FkbWluL2RhdGEvc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDRDQUFtRTtBQUNuRSx3REFBbUU7QUFDbkUseURBQXFFO0FBRXJFOztHQUVHO0FBVUksSUFBTSw2QkFBNkIsR0FBbkMsTUFBTSw2QkFBOEIsU0FBUSxxQkFBYztDQUFHLENBQUE7QUFBdkQsc0VBQTZCO3dDQUE3Qiw2QkFBNkI7SUFUekMsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLDZCQUFvQjtRQUM1QixPQUFPLEVBQUUsOEJBQXFCO1FBQzlCLFdBQVcsRUFBRTtZQUNYLGlCQUFpQixFQUFFLENBQUMsU0FBUyxDQUFDO1lBQzlCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUN0QjtLQUNGLENBQUM7R0FDVyw2QkFBNkIsQ0FBMEIifQ==