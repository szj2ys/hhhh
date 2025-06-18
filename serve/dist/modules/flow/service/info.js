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
exports.FlowInfoService = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const core_3 = require("@midwayjs/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const info_1 = require("../entity/info");
const nodes_1 = require("../nodes");
/**
 * 流程信息
 */
let FlowInfoService = class FlowInfoService extends core_1.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.flowInfoEntity);
    }
    /**
     * 新增或更新
     * @param param
     * @param type
     */
    async addOrUpdate(param, type) {
        let check;
        if (type == 'add') {
            check = await this.flowInfoEntity.findOneBy({
                label: (0, typeorm_2.Equal)(param.label),
            });
        }
        if (param.label && type == 'update') {
            check = await this.flowInfoEntity.findOneBy({
                label: (0, typeorm_2.Equal)(param.label),
                id: (0, typeorm_2.Not)(param.id),
            });
        }
        if (check) {
            throw new core_1.CoolCommException('标签已存在');
        }
        await super.addOrUpdate(param, type);
    }
    /**
     * 发布流程
     * @param flowId
     */
    async release(flowId) {
        const info = await this.flowInfoEntity.findOneBy({ id: (0, typeorm_2.Equal)(flowId) });
        if (!info) {
            throw new core_1.CoolCommException('流程不存在');
        }
        info.version++;
        info.releaseTime = new Date();
        info.data = info.draft;
        await this.flowInfoEntity.update(info.id, info);
    }
    /**
     * 获得流程的节点
     * @param label
     * @param isDraft 是否是草稿，调试的时候调用草稿
     */
    async getNodes(label, isDraft = false) {
        const info = await this.flowInfoEntity.findOneBy({
            label: (0, typeorm_2.Equal)(label),
            status: 1,
        });
        if (!info) {
            throw new core_1.CoolCommException('流程不存在或被禁用');
        }
        const data = isDraft ? info.draft : info.data;
        if (!data) {
            throw new core_1.CoolCommException('流程未发布或损坏');
        }
        const nodes = [];
        // 构建所有节点
        for (const item of data.nodes) {
            const node = await this.app
                .getApplicationContext()
                .getAsync(nodes_1.NodeType[item.type]);
            node.id = item.id;
            node.flowId = info.id;
            node.label = item.label;
            node.type = item.type;
            node.desc = item.desc;
            node.config = {
                inputParams: item.data.inputParams,
                outputParams: item.data.outputParams,
                options: item.data.options,
            };
            nodes.push(node);
        }
        for (const item of data.edges) {
            const sourceNode = nodes.find(node => node.id == item.source);
            if (sourceNode) {
                item.sourceType = sourceNode.type;
            }
            const targetNode = nodes.find(node => node.id == item.target);
            if (targetNode) {
                item.targetType = targetNode.type;
            }
        }
        return {
            nodes,
            info,
            graph: data,
        };
    }
    /**
     * 根据标签获取流程信息
     * @param label
     */
    async getByLabel(label) {
        return await this.flowInfoEntity.findOneBy({ label: (0, typeorm_2.Equal)(label) });
    }
};
exports.FlowInfoService = FlowInfoService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.FlowInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], FlowInfoService.prototype, "flowInfoEntity", void 0);
__decorate([
    (0, core_3.Inject)(),
    __metadata("design:type", Object)
], FlowInfoService.prototype, "ctx", void 0);
__decorate([
    (0, core_2.App)(),
    __metadata("design:type", Object)
], FlowInfoService.prototype, "app", void 0);
__decorate([
    (0, core_3.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlowInfoService.prototype, "init", null);
exports.FlowInfoService = FlowInfoService = __decorate([
    (0, core_3.Provide)()
], FlowInfoService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvc2VydmljZS9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFtRTtBQUNuRSx5Q0FBeUU7QUFDekUseUNBQXVEO0FBQ3ZELCtDQUFzRDtBQUN0RCxxQ0FBaUQ7QUFDakQseUNBQWdEO0FBQ2hELG9DQUFvQztBQUlwQzs7R0FFRztBQUVJLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWdCLFNBQVEsa0JBQVc7SUFXeEMsQUFBTixLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFxQixFQUFFLElBQXVCO1FBQzlELElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7WUFDbEIsS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Z0JBQzFDLEtBQUssRUFBRSxJQUFBLGVBQUssRUFBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQzFCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3BDLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO2dCQUMxQyxLQUFLLEVBQUUsSUFBQSxlQUFLLEVBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDekIsRUFBRSxFQUFFLElBQUEsYUFBRyxFQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7YUFDbEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksS0FBSyxF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