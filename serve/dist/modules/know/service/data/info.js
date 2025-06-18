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
exports.KnowDataInfoService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const info_1 = require("../../entity/data/info");
const store_1 = require("../../store");
const core_3 = require("@midwayjs/core");
const type_1 = require("../../entity/data/type");
const graph_1 = require("../graph");
const source_1 = require("./source");
const _ = require("lodash");
const uuid_1 = require("uuid");
/**
 * 知识信息
 */
let KnowDataInfoService = class KnowDataInfoService extends core_2.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.knowDataInfoEntity);
    }
    /**
     * 删除
     * @param sourceId
     */
    async deleteBySourceId(sourceId) {
        const ids = await this.knowDataInfoEntity.findBy({
            sourceId: (0, typeorm_2.In)(sourceId),
        });
        if (ids.length > 0) {
            await this.delete(ids.map(item => item.id));
        }
    }
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        const info = await this.knowDataInfoEntity.findOneBy({ id: ids[0] });
        const type = await this.knowDataTypeEntity.findOneBy({ id: info === null || info === void 0 ? void 0 : info.typeId });
        if (!info || !type) {
            throw new core_2.CoolCommException('知识信息不存在');
        }
        const store = await this.knowStore.get(type.collectionId);
        await store.remove(`${this.prefix}${type.collectionId}`, ids);
        await super.delete(ids);
    }
    /**
     * 新增或修改
     * @param param
     * @param type
     */
    async addOrUpdate(param, type) {
        var _a;
        if (Array.isArray(param)) {
            for (const item of param) {
                item.id = item.id || (0, uuid_1.v4)();
            }
        }
        else {
            param.id = param.id || (0, uuid_1.v4)();
        }
        await super.addOrUpdate(param, type);
        if (type == 'add') {
            // 判断param 是数组还是对象
            if (Array.isArray(param)) {
                const save = async () => {
                    for (const item of param) {
                        await this.retrySaveToStore(item.typeId, item);
                    }
                };
                save();
            }
            else {
                if (param.enable == 1) {
                    await this.retrySaveToStore(param.typeId, param);
                }
            }
        }
        else {
            const info = await this.knowDataInfoEntity.findOneBy({
                id: Array.isArray(param) ? (_a = param[0]) === null || _a === void 0 ? void 0 : _a.id : param.id,
            });
            const type = await this.knowDataTypeEntity.findOneBy({
                id: (info === null || info === void 0 ? void 0 : info.typeId) || param.typeId,
            });
            if (!info || !type) {
                throw new core_2.CoolCommException('知识信息不存在');
            }
            const store = await this.knowStore.get(type.collectionId);
            const data = {
                ...info,
                ...param,
            };
            if (data.enable == 0) {
                await store.remove(`${this.prefix}${info.typeId}`, [data.id]);
                await this.knowDataInfoEntity.update(data.id, {
                    status: 0,
                });
            }
            else {
                await this.retrySaveToStore(info.typeId, data);
            }
        }
    }
    /**
     * 重试保存到存储
     * @param typeId
     * @param param
     */
    async retrySaveToStore(typeId, param) {
        const invokeNew = (0, core_3.retryWithAsync)(this.saveToStore.bind(this), this.knowConfig.retry, {
            retryInterval: this.knowConfig.retryInterval,
        });
        try {
            await invokeNew(typeId, param);
        }
        catch (e) {
            console.error('retrySaveToStore error', e);
        }
    }
    /**
     * 保持到存储
     * @param typeId
     * @param param
     */
    async saveToStore(typeId, param) {
        try {
            await this.knowDataSourceService.checkStatus(param.sourceId);
            const type = await this.knowDataTypeEntity.findOneBy({ id: typeId });
            if (!type) {
                throw new core_2.CoolCommException('知识库不存在');
            }
            const store = await this.knowStore.get(type.collectionId);
            await store.upsert(`${this.prefix}${type.collectionId}`, [
                {
                    id: param.id,
                    content: param.content,
                    type: 'rag',
                    collectionId: type.collectionId,
                    sourceId: param.sourceId,
                    typeId: type.id,
                },
            ]);
            await this.knowDataInfoEntity.update({ id: (0, typeorm_2.Equal)(param.id) }, {
                status: 1,
            });
            await this.knowDataSourceService.checkStatus(param.sourceId);
            this.knowGraphService.retrySave(typeId, {
                typeId: type.id,
                chunkId: param.id,
                sourceId: param.sourceId,
                text: param.content,
            });
        }
        catch (e) {
            console.error('saveToStore error', e);
        }
    }
    /**
     * 根据ids获取内容
     * @param ids
     * @returns
     */
    async getContentByIds(ids) {
        if (_.isEmpty(ids)) {
            return [];
        }
        const infos = await this.knowDataInfoEntity.findBy({ id: (0, typeorm_2.In)(ids) });
        return infos.map(item => {
            return {
                id: item.id,
                content: item.content,
            };
        });
    }
};
exports.KnowDataInfoService = KnowDataInfoService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.KnowDataInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowDataInfoService.prototype, "knowDataInfoEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(type_1.KnowDataTypeEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowDataInfoService.prototype, "knowDataTypeEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", store_1.KnowStore)
], KnowDataInfoService.prototype, "knowStore", void 0);
__decorate([
    (0, core_1.Config)('module.know.prefix'),
    __metadata("design:type", String)
], KnowDataInfoService.prototype, "prefix", void 0);
__decorate([
    (0, core_1.Config)('module.know'),
    __metadata("design:type", Object)
], KnowDataInfoService.prototype, "knowConfig", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", graph_1.KnowGraphService)
], KnowDataInfoService.prototype, "knowGraphService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", source_1.KnowDataSourceService)
], KnowDataInfoService.prototype, "knowDataSourceService", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KnowDataInfoService.prototype, "init", null);
exports.KnowDataInfoService = KnowDataInfoService = __decorate([
    (0, core_1.Provide)()
], KnowDataInfoService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvc2VydmljZS9kYXRhL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQStEO0FBQy9ELDRDQUFtRTtBQUNuRSwrQ0FBc0Q7QUFDdEQscUNBQWdEO0FBQ2hELGlEQUE0RDtBQUM1RCx1Q0FBd0M7QUFDeEMseUNBQWdEO0FBQ2hELGlEQUE0RDtBQUM1RCxvQ0FBNEM7QUFDNUMscUNBQWlEO0FBQ2pELDRCQUE0QjtBQUM1QiwrQkFBb0M7QUFFcEM7O0dBRUc7QUFFSSxJQUFNLG1CQUFtQixHQUF6QixNQUFNLG1CQUFvQixTQUFRLGtCQUFXO0lBdUI1QyxBQUFOLEtBQUssQ0FBQyxJQUFJO1FBQ1IsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQWtCO1FBQ3ZDLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztZQUMvQyxRQUFRLEVBQUUsSUFBQSxZQUFFLEVBQUMsUUFBUSxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFhO1FBQ3hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixD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