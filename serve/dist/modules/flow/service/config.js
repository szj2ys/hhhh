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
exports.FlowConfigService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("../entity/config");
const nodes_1 = require("../nodes");
const type_1 = require("../../know/service/data/type");
const client_1 = require("../mcp/client");
/**
 * 流程配置
 */
let FlowConfigService = class FlowConfigService extends core_2.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.flowConfigEntity);
    }
    /**
     * 获得配置
     * @param node 节点
     * @param type 类型
     */
    async config(node, type) {
        // 知识库
        if (node == 'know') {
            return {
                knows: await this.knowDataTypeService.getKnows(),
            };
        }
        return type ? nodes_1.FlowNodeConfig[node][type] : nodes_1.FlowNodeConfig[node];
    }
    /**
     * 所有配置
     * @returns
     */
    async all() {
        return nodes_1.FlowAllConfig;
    }
    /**
     * 获得配置
     * @param configId
     * @returns
     */
    async getOptions(configId) {
        const config = await this.flowConfigEntity.findOneBy({
            id: (0, typeorm_2.Equal)(configId),
        });
        return config === null || config === void 0 ? void 0 : config.options;
    }
    /**
     * 获得配置
     * @param configId
     * @returns
     */
    async getConfig(configId) {
        return await this.flowConfigEntity.findOneBy({ id: (0, typeorm_2.Equal)(configId) });
    }
    /**
     * 通过名称获取配置
     * @param node 类型
     * @param type 类型
     * @returns
     */
    async getByNode(node, type) {
        const find = await this.flowConfigEntity.createQueryBuilder('a');
        if (type) {
            find.where('a.type = :type', { type });
        }
        if (node) {
            find.andWhere('a.node = :node', { node });
        }
        return await find.getMany();
    }
    /**
     * 通过名称获取配置
     * @param name 名称
     * @param node 类型
     * @returns
     */
    async getByName(name, node) {
        const find = await this.flowConfigEntity.createQueryBuilder('a');
        if (name) {
            find.where('a.name = :name', { name });
        }
        if (node) {
            find.andWhere('a.node = :node', { node });
        }
        return await find.getOne();
    }
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        for (const id of ids) {
            const info = await this.flowConfigEntity.findOneBy({
                id: (0, typeorm_2.Equal)(id),
            });
            if ((info === null || info === void 0 ? void 0 : info.node) == 'mcp') {
                this.coolEventManager.globalEmit('mcp.client.remove', false, info.name);
            }
        }
        await super.delete(ids);
    }
    /**
     * 修改后
     * @param data
     * @param type
     */
    async modifyAfter(data, type) {
        if (type == 'update' || type == 'add') {
            const info = await this.flowConfigEntity.findOneBy({
                id: (0, typeorm_2.Equal)(data.id),
            });
            if ((info === null || info === void 0 ? void 0 : info.node) == 'mcp') {
                await this.flowMcpClient.ping(info);
                this.coolEventManager.globalEmit('mcp.client.initOne', false, info);
            }
        }
    }
};
exports.FlowConfigService = FlowConfigService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(config_1.FlowConfigEntity),
    __metadata("design:type", typeorm_2.Repository)
], FlowConfigService.prototype, "flowConfigEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", type_1.KnowDataTypeService)
], FlowConfigService.prototype, "knowDataTypeService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", client_1.FlowMcpClient)
], FlowConfigService.prototype, "flowMcpClient", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_2.CoolEventManager)
], FlowConfigService.prototype, "coolEventManager", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], FlowConfigService.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlowConfigService.prototype, "init", null);
exports.FlowConfigService = FlowConfigService = __decorate([
    (0, core_1.Provide)()
], FlowConfigService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9zZXJ2aWNlL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBdUQ7QUFDdkQsNENBQWtFO0FBQ2xFLCtDQUFzRDtBQUN0RCxxQ0FBNEM7QUFDNUMsNkNBQW9EO0FBQ3BELG9DQUFzRTtBQUN0RSx1REFBbUU7QUFDbkUsMENBQThDO0FBRTlDOztHQUVHO0FBRUksSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBa0IsU0FBUSxrQkFBVztJQWlCMUMsQUFBTixLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQWlCLEVBQUUsSUFBYTtRQUMzQyxNQUFNO1FBQ04sSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFLENBQUM7WUFDbkIsT0FBTztnQkFDTCxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFO2FBQ2pELENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLHNCQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxHQUFHO1FBQ1AsT0FBTyxxQkFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFnQjtRQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7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