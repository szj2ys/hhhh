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
exports.FlowLogService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const info_1 = require("../entity/info");
const log_1 = require("../entity/log");
const _ = require("lodash");
const moment = require("moment");
/**
 * 流程信息日志
 */
let FlowLogService = class FlowLogService extends core_2.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.flowLogEntity);
    }
    /**
     * 清理，超过n天的数据
     */
    async clear() {
        const date = moment().subtract(this.logDayCount, 'days').toDate();
        await this.flowLogEntity.delete({
            createTime: (0, typeorm_2.LessThan)(date),
        });
    }
    /**
     * 记录日志
     * @param data
     * @returns
     */
    async save(data) {
        // 获得流程信息
        const info = await this.flowInfoEntity.findOneBy({
            label: (0, typeorm_2.Equal)(data.flowLabel),
        });
        if (info) {
            const { inputParams, nodeInfo, result, type } = data;
            // 构建参数
            const params = {
                flowId: info.id,
                flowLabel: info.label,
                type,
                inputParams,
                result,
            };
            // 如果节点信息结果不为空
            if (!_.isEmpty(nodeInfo)) {
                // params.nodeInfo = Object.create(nodeInfoList)
                params.nodeInfo = this.extractData(nodeInfo);
            }
            // 保存日志
            return await this.flowLogEntity.save(params);
        }
    }
    /**
     * 自定义序列化函数
     * @param obj 参数
     */
    async stringifyCircular(obj) {
        const seen = new WeakSet();
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        });
    }
    /**
     * 提取需储存的数据
     * @param nodeInfo
     * @returns
     */
    extractData(nodeInfo) {
        var _a;
        const nodeInfoList = (_a = nodeInfo === null || nodeInfo === void 0 ? void 0 : nodeInfo.map(e => {
            // 结构对象，提取有用的值
            const { id, label, type, inputParams, result, config: execConfig } = e;
            const { nodesResult, ...resultArg } = result;
            const cParams = {
                id,
                label,
                type,
                inputParams,
                result: {
                    ...resultArg,
                },
                config: {
                    outputParams: (execConfig === null || execConfig === void 0 ? void 0 : execConfig.outputParams) || null,
                    options: (execConfig === null || execConfig === void 0 ? void 0 : execConfig.options) || null,
                },
            };
            return cParams;
        })) !== null && _a !== void 0 ? _a : [];
        return nodeInfoList;
    }
};
exports.FlowLogService = FlowLogService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.FlowInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], FlowLogService.prototype, "flowInfoEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(log_1.FlowLogEntity),
    __metadata("design:type", typeorm_2.Repository)
], FlowLogService.prototype, "flowLogEntity", void 0);
__decorate([
    (0, core_1.Config)('module.flow.clear.log'),
    __metadata("design:type", Number)
], FlowLogService.prototype, "logDayCount", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlowLogService.prototype, "init", null);
exports.FlowLogService = FlowLogService = __decorate([
    (0, core_1.Provide)()
], FlowLogService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9zZXJ2aWNlL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBdUQ7QUFDdkQsNENBQWdEO0FBQ2hELCtDQUFzRDtBQUN0RCxxQ0FBc0Q7QUFDdEQseUNBQWdEO0FBQ2hELHVDQUE4QztBQUM5Qyw0QkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDOztHQUVHO0FBRUksSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBZSxTQUFRLGtCQUFXO0lBV3ZDLEFBQU4sS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xFLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDOUIsVUFBVSxFQUFFLElBQUEsa0JBQVEsRUFBQyxJQUFJLENBQUM7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUk7UUFDYixTQUFTO1FBQ1QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUMvQyxLQUFLLEVBQUUsSUFBQSxlQUFLLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ1QsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElB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