"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowResultController = void 0;
const core_1 = require("@cool-midway/core");
const result_1 = require("../../entity/result");
/**
 * 流程结果
 */
let FlowResultController = class FlowResultController extends core_1.BaseController {
};
exports.FlowResultController = FlowResultController;
exports.FlowResultController = FlowResultController = __decorate([
    (0, core_1.CoolController)({
        api: ['list'],
        entity: result_1.FlowResultEntity,
        listQueryOp: {
            fieldEq: ['requestId', 'nodeType'],
        },
    })
], FlowResultController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9jb250cm9sbGVyL2FkbWluL3Jlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUsZ0RBQXVEO0FBRXZEOztHQUVHO0FBUUksSUFBTSxvQkFBb0IsR0FBMUIsTUFBTSxvQkFBcUIsU0FBUSxxQkFBYztDQUFHLENBQUE7QUFBOUMsb0RBQW9COytCQUFwQixvQkFBb0I7SUFQaEMsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2IsTUFBTSxFQUFFLHlCQUFnQjtRQUN4QixXQUFXLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDO1NBQ25DO0tBQ0YsQ0FBQztHQUNXLG9CQUFvQixDQUEwQiJ9