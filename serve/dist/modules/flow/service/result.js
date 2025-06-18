"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowResultService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const result_1 = require("../entity/result");
const moment = require("moment");
/**
 * 流程结果
 */
let FlowResultService = class FlowResultService extends core_2.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.flowResultEntity);
    }
    /**
     * 清理，超过n天的数据
     */
    async clear() {
        const date = moment().subtract(this.resultDayCount, 'days').toDate();
        await this.flowResultEntity.delete({
            createTime: (0, typeorm_2.LessThan)(date),
        });
    }
    /**
     * 获得结果
     * @param requestId 请求ID
     * @param nodeType 节点类型
     * @returns
     */
    async result(requestId, nodeType) {
        const where = {
            requestId: (0, typeorm_2.Equal)(requestId),
        };
        if (nodeType) {
            where.nodeType = (0, typeorm_2.Equal)(nodeType);
        }
        return await this.flowResultEntity.findBy(where);
    }
};
exports.FlowResultService = FlowResultService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(result_1.FlowResultEntity),
    __metadata("design:type", typeorm_2.Repository)
], FlowResultService.prototype, "flowResultEntity", void 0);
__decorate([
    (0, core_1.Config)('module.flow.clear.result'),
    __metadata("design:type", Number)
], FlowResultService.prototype, "resultDayCount", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlowResultService.prototype, "init", null);
exports.FlowResultService = FlowResultService = __decorate([
    (0, core_1.Provide)()
], FlowResultService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9zZXJ2aWNlL3Jlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBdUQ7QUFDdkQsNENBQWdEO0FBQ2hELCtDQUFzRDtBQUN0RCxxQ0FBc0Q7QUFDdEQsNkNBQW9EO0FBQ3BELGlDQUFpQztBQUVqQzs7R0FFRztBQUVJLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsa0JBQVc7SUFRMUMsQUFBTixLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLEtBQUs7UUFDVCxNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyRSxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7WUFDakMsVUFBVSxFQUFFLElBQUEsa0JBQVEsRUFBQyxJQUFJLENBQUM7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFpQixFQUFFLFFBQWlCO1FBQy9DLE1BQU0sS0FBSyxHQUFRO1lBQ2pCLFNBQVMsRUFBRSxJQUFBLGVBQUssRUFBQyxTQUFTLENBQUM7U0FDNUIsQ0FBQztRQUNGLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUEsZUFBSyxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxPQUFPLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0YsQ0FBQTtBQXRDWSw4Q0FBaUI7QUFFNUI7SUFEQyxJQUFBLDJCQUFpQixFQUFDLHlCQUFnQixDQUFDOzhCQUNsQixvQkFBVTsyREFBbUI7QUFHL0M7SUFEQyxJQUFBLGFBQU0sRUFBQywwQkFBMEIsQ0FBQzs7eURBQ1o7QUFHakI7SUFETCxJQUFBLFdBQUksR0FBRTs7Ozs2Q0FJTjs0QkFYVSxpQkFBaUI7SUFEN0IsSUFBQSxjQUFPLEdBQUU7R0FDRyxpQkFBaUIsQ0FzQzdCIn0=