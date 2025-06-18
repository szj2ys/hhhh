"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminFlowLogController = void 0;
const core_1 = require("@cool-midway/core");
const log_1 = require("../../entity/log");
const info_1 = require("../../entity/info");
/**
 * 流程日志
 */
let AdminFlowLogController = class AdminFlowLogController extends core_1.BaseController {
};
exports.AdminFlowLogController = AdminFlowLogController;
exports.AdminFlowLogController = AdminFlowLogController = __decorate([
    (0, core_1.CoolController)({
        api: ['delete', 'info', 'list', 'page'],
        entity: log_1.FlowLogEntity,
        pageQueryOp: {
            fieldEq: ['flowId', 'type'],
            select: ['a.*', 'b.name as "flowName"', 'b.label as "flowLabel"'],
            join: [
                {
                    entity: info_1.FlowInfoEntity,
                    alias: 'b',
                    condition: 'a.flowId = b.id',
                },
            ],
            where: ctx => {
                const { createTime } = ctx.request.body;
                return [
                    [
                        'a.createTime between :startTime and :endTime',
                        { startTime: createTime === null || createTime === void 0 ? void 0 : createTime[0], endTime: createTime === null || createTime === void 0 ? void 0 : createTime[1] },
                        (createTime === null || createTime === void 0 ? void 0 : createTime[0]) && createTime[1],
                    ],
                ];
            },
        },
    })
], AdminFlowLogController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9jb250cm9sbGVyL2FkbWluL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0Q0FBbUU7QUFDbkUsMENBQWlEO0FBQ2pELDRDQUFtRDtBQUVuRDs7R0FFRztBQTBCSSxJQUFNLHNCQUFzQixHQUE1QixNQUFNLHNCQUF1QixTQUFRLHFCQUFjO0NBQUcsQ0FBQTtBQUFoRCx3REFBc0I7aUNBQXRCLHNCQUFzQjtJQXpCbEMsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3ZDLE1BQU0sRUFBRSxtQkFBYTtRQUNyQixXQUFXLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQzNCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBRSx3QkFBd0IsQ0FBQztZQUNqRSxJQUFJLEVBQUU7Z0JBQ0o7b0JBQ0UsTUFBTSxFQUFFLHFCQUFjO29CQUN0QixLQUFLLEVBQUUsR0FBRztvQkFDVixTQUFTLEVBQUUsaUJBQWlCO2lCQUM3QjthQUNGO1lBQ0QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDeEMsT0FBTztvQkFDTDt3QkFDRSw4Q0FBOEM7d0JBQzlDLEVBQUUsU0FBUyxFQUFFLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUN4RCxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRyxDQUFDLENBQUMsS0FBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO3FCQUNqQztpQkFDRixDQUFDO1lBQ0osQ0FBQztTQUNGO0tBQ0YsQ0FBQztHQUNXLHNCQUFzQixDQUEwQiJ9