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
exports.KnowDataSourceService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const source_1 = require("../../entity/data/source");
const info_1 = require("./info");
const graph_1 = require("../graph");
const multi_1 = require("../../loader/multi");
const link_1 = require("../../loader/link");
const info_2 = require("../../entity/data/info");
/**
 * 数据源
 */
let KnowDataSourceService = class KnowDataSourceService extends core_2.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.knowDataSourceEntity);
    }
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        await super.delete(ids);
        await this.knowDataInfoService.deleteBySourceId(ids);
        await this.knowGraphService.clearBySource(ids);
    }
    /**
     * 匹配
     * @param documents
     * @returns
     */
    async match(documents) {
        const sourceIds = documents.map(item => item[0].metadata.sourceId);
        if (sourceIds.length == 0) {
            return [];
        }
        const sources = await this.knowDataSourceEntity.find({
            where: {
                id: (0, typeorm_2.In)(sourceIds),
            },
        });
        for (const document of documents) {
            const item = sources.find(source => source.id == document[0].metadata.sourceId);
            delete document[0].metadata['content'];
            document[0].metadata['source'] = {
                id: item.id,
                title: item.title,
                from: item.from,
                content: item.content,
            };
        }
        return documents;
    }
    /**
     * 加载资源内容
     * @param sourceId
     * @returns
     */
    async getText(sourceId) {
        let text = '';
        const source = await this.knowDataSourceEntity.findOneBy({
            id: (0, typeorm_2.Equal)(sourceId),
        });
        if (source.from == 0) {
            text = source.content;
        }
        if (source.from == 1) {
            text = await this.knowMultiLoader.loadByLink(source.content);
        }
        if (source.from == 2) {
            const docs = await this.knowLinkLoader.load(source.content, {
                downloadImages: true,
            });
            text = docs.map(item => item.pageContent)[0];
        }
        if (!text) {
            throw new core_2.CoolCommException('资源内容为空');
        }
        return { text, source };
    }
    /**
     * 修改状态
     * @param sourceId
     * @param status
     */
    async changeStatus(sourceId, status) {
        await this.knowDataSourceEntity.update(sourceId, { status });
    }
    /**
     * 检查状态
     * @param sourceId
     */
    async checkStatus(sourceId) {
        // 如果所有数据源都已就绪，则修改状态
        const haveNotReady = await this.knowDataInfoEntity.findOneBy({
            sourceId: (0, typeorm_2.Equal)(sourceId),
            status: 0,
        });
        if (haveNotReady) {
            await this.changeStatus(sourceId, 0);
        }
        else {
            await this.changeStatus(sourceId, 1);
        }
    }
};
exports.KnowDataSourceService = KnowDataSourceService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(source_1.KnowDataSourceEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowDataSourceService.prototype, "knowDataSourceEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_2.KnowDataInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowDataSourceService.prototype, "knowDataInfoEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.KnowDataInfoService)
], KnowDataSourceService.prototype, "knowDataInfoService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", graph_1.KnowGraphService)
], KnowDataSourceService.prototype, "knowGraphService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", multi_1.KnowMultiLoader)
], KnowDataSourceService.prototype, "knowMultiLoader", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", link_1.KnowLinkLoader)
], KnowDataSourceService.prototype, "knowLinkLoader", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KnowDataSourceService.prototype, "init", null);
exports.KnowDataSourceService = KnowDataSourceService = __decorate([
    (0, core_1.Provide)()
], KnowDataSourceService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9zZXJ2aWNlL2RhdGEvc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF1RDtBQUN2RCw0Q0FBbUU7QUFDbkUsK0NBQXNEO0FBQ3RELHFDQUFnRDtBQUNoRCxxREFBZ0U7QUFDaEUsaUNBQTZDO0FBRTdDLG9DQUE0QztBQUM1Qyw4Q0FBcUQ7QUFHckQsNENBQW1EO0FBQ25ELGlEQUE0RDtBQUU1RDs7R0FFRztBQUVJLElBQU0scUJBQXFCLEdBQTNCLE1BQU0scUJBQXNCLFNBQVEsa0JBQVc7SUFvQjlDLEFBQU4sS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQWE7UUFDeEIsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBd0M7UUFDbEQsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkUsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxD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