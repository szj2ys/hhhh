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
exports.KnowDataTypeService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const type_1 = require("../../entity/data/type");
const config_1 = require("../../entity/config");
const config_2 = require("../config");
const embed_1 = require("../../embed");
const store_1 = require("../../store");
const info_1 = require("../../entity/data/info");
const info_2 = require("./info");
const uuid_1 = require("uuid");
const model_1 = require("../../../flow/nodes/llm/model");
/**
 * 知识类型
 */
let KnowDataTypeService = class KnowDataTypeService extends core_2.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.knowDataTypeEntity);
    }
    /**
     * 重建
     * @param typeId
     */
    async rebuild(typeId) {
        const type = await this.knowDataTypeEntity.findOneBy({ id: typeId });
        if (!type) {
            throw new core_2.CoolCommException('知识库不存在');
        }
        await this.knowDataInfoEntity.update({ typeId: type.id }, { status: 0 });
        const store = await this.knowStore.get(type.collectionId);
        // 先删除
        await store.collection(`${this.prefix}${type.collectionId}`, 'delete');
        // 再创建
        await store.collection(`${this.prefix}${type.collectionId}`, 'create');
        // 获得所有数据
        const list = await this.knowDataInfoEntity.findBy({
            typeId: (0, typeorm_2.Equal)(type.id),
            enable: 1,
        });
        // 保存到知识库
        for (const item of list) {
            await this.knowDataInfoService.retrySaveToStore(typeId, item);
        }
    }
    /**
     * 新增或修改
     * @param param
     * @param type
     */
    async addOrUpdate(param, type) {
        try {
            if (type == 'add') {
                param.collectionId = (0, uuid_1.v4)();
            }
            await super.addOrUpdate(param, type);
            if (param.enable == 0) {
                return;
            }
            // 先删除
            const store = await this.knowStore.get(param.collectionId);
            await store.collection(`${this.prefix}${param.collectionId}`, 'delete');
            // 再创建
            await store.collection(`${this.prefix}${param.collectionId}`, 'create');
        }
        catch (err) {
            console.log(err);
            if (type == 'add') {
                await this.knowDataTypeEntity.delete({ id: (0, typeorm_2.Equal)(param.id) });
            }
            throw new core_2.CoolCommException('创建失败，可能是向量存储服务不可以用');
        }
    }
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        const list = await this.knowDataTypeEntity.findBy({ id: (0, typeorm_2.In)(ids) });
        for (const item of list) {
            const store = await this.knowStore.get(item.collectionId);
            await store.collection(`${this.prefix}${item.collectionId}`, 'delete');
        }
        await super.delete(ids);
        // 删除子数据
        await this.knowDataInfoEntity.delete({ typeId: (0, typeorm_2.In)(ids) });
    }
    /**
     * 获得所有可用的知识库列表
     */
    async getKnows() {
        const list = await this.knowDataTypeEntity.findBy({
            enable: 1,
        });
        return list.map(item => {
            return {
                id: item.id,
                name: item.name,
                icon: item.icon,
                description: item.description,
            };
        });
    }
    /**
     * 获得知识信息
     * @param collectionId
     */
    async getKnow(collectionId) {
        const result = await this.knowDataTypeEntity.findOneBy({
            collectionId: (0, typeorm_2.Equal)(collectionId),
        });
        return result;
    }
    /**
     * 获得知识库对应的向量化模型
     * @param collectionId
     * @returns
     */
    async getEmbedding(collectionId) {
        const know = await this.getKnow(collectionId);
        const embedConfigId = know.embedConfigId;
        const config = await this.knowConfigService.info(embedConfigId);
        const embedding = embed_1.EmbeddModel[config.type]({
            ...config.options.comm,
            ...know.embedOptions,
        });
        return embedding;
    }
    /**
     * 获得模型
     * @param typeId 知识库ID
     * @returns
     */
    async getLLMModel(typeId) {
        const know = await this.knowDataTypeEntity.findOneBy({ id: typeId });
        if (!know) {
            throw new core_2.CoolCommException('知识库不存在');
        }
        const llmOptions = know.llmOptions;
        const LLM = await this.nodeLLMModel.getModel(llmOptions.supplier);
        // @ts-ignore
        return new LLM({
            ...llmOptions.params,
            ...llmOptions.comm,
        });
    }
};
exports.KnowDataTypeService = KnowDataTypeService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(type_1.KnowDataTypeEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowDataTypeService.prototype, "knowDataTypeEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.KnowDataInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowDataTypeService.prototype, "knowDataInfoEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(config_1.KnowConfigEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowDataTypeService.prototype, "knowConfigEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_2.KnowDataInfoService)
], KnowDataTypeService.prototype, "knowDataInfoService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", config_2.KnowConfigService)
], KnowDataTypeService.prototype, "knowConfigService", void 0);
__decorate([
    (0, core_1.Config)('module.know.prefix'),
    __metadata("design:type", String)
], KnowDataTypeService.prototype, "prefix", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", store_1.KnowStore)
], KnowDataTypeService.prototype, "knowStore", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", model_1.NodeLLMModel)
], KnowDataTypeService.prototype, "nodeLLMModel", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KnowDataTypeService.prototype, "init", null);
exports.KnowDataTypeService = KnowDataTypeService = __decorate([
    (0, core_1.Provide)()
], KnowDataTypeService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvc2VydmljZS9kYXRhL3R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQStEO0FBQy9ELDRDQUFtRTtBQUNuRSwrQ0FBc0Q7QUFDdEQscUNBQWdEO0FBQ2hELGlEQUE0RDtBQUM1RCxnREFBdUQ7QUFDdkQsc0NBQThDO0FBQzlDLHVDQUEwQztBQUMxQyx1Q0FBd0M7QUFDeEMsaURBQTREO0FBQzVELGlDQUE2QztBQUM3QywrQkFBb0M7QUFFcEMseURBQTZEO0FBRTdEOztHQUVHO0FBRUksSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBb0IsU0FBUSxrQkFBVztJQTBCNUMsQUFBTixLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBYztRQUMxQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksd0JBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUNELE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RSxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FB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