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
exports.KnowRetrieverService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const core_3 = require("@midwayjs/core");
const store_1 = require("../store");
const type_1 = require("./data/type");
const config_1 = require("./config");
const rerank_1 = require("../rerank");
const type_2 = require("../entity/data/type");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const prompts_1 = require("@langchain/core/prompts");
const utils_1 = require("../../../comm/utils");
const source_1 = require("./data/source");
const graph_1 = require("./graph");
const info_1 = require("./data/info");
const _ = require("lodash");
/**
 * 检索服务
 */
let KnowRetrieverService = class KnowRetrieverService extends core_2.BaseService {
    /**
     * 智能调用
     * @param knowId
     * @param text
     * @param options
     * @returns
     */
    async invoke(knowId, text, options) {
        const type = await this.knowDataTypeEntity.findOneBy({ id: knowId });
        if (!type) {
            throw new core_2.CoolCommException('知识库不存在');
        }
        const store = await this.getStore(type.collectionId);
        const keywords = await this.genKeywords(knowId, text, type.indexType);
        const results = await Promise.all(keywords.map(keyword => {
            return store.similaritySearchWithScore(keyword, this.indexCount, {
                collectionId: type.collectionId,
            });
        }));
        const result = results.flat();
        // 去除ID相同的
        const uniqueResult = result.filter((item, index, self) => index === self.findIndex(t => t[0].id === item[0].id));
        let documents = await this.rerank(knowId, text, uniqueResult, options, keywords);
        // 排序documents
        documents.sort((a, b) => b[1] - a[1]);
        // 截取前N个
        documents = documents.slice(0, (options === null || options === void 0 ? void 0 : options.size) || 10);
        // 匹配资源
        await this.knowDataSourceService.match(documents);
        documents = documents
            .map(e => {
            e[1] = parseFloat(e[1]);
            return e;
        })
            .filter(e => {
            return e[1] >= ((options === null || options === void 0 ? void 0 : options.minScore) || 0);
        });
        // 图谱搜索
        await this.graph(knowId, documents, options);
        return documents;
    }
    /**
     * 图谱搜索
     * @param knowId
     * @param documents
     * @param options
     * @returns
     */
    async graph(knowId, documents, options) {
        const type = await this.knowDataTypeEntity.findOneBy({ id: knowId });
        if (!type) {
            throw new core_2.CoolCommException('知识库不存在');
        }
        if (type.indexType != 2) {
            return;
        }
        let topN = 3;
        let index = 0;
        for (const doc of documents) {
            const graph = await this.knowGraphService.search(knowId, doc[0].id, (options === null || options === void 0 ? void 0 : options.graphLevel) || 3, (options === null || options === void 0 ? void 0 : options.graphSize) || 10);
            const contents = await this.knowDataInfoService.getContentByIds(graph.map(item => item.chunkId));
            doc[0]['relations'] = contents.map(item => {
                const graphInfo = graph.find(e => e.chunkId === item.id);
                return {
                    content: item.content,
                    relations: graphInfo.relations,
                };
            });
            index++;
            if (index >= topN) {
                break;
            }
        }
        return documents;
    }
    /**
     * 生成关键词
     * @param knowId
     * @param text
     * @param indexType
     * @returns
     */
    async genKeywords(knowId, text, indexType) {
        if (indexType == 0) {
            return [text];
        }
        const llm = await this.knowDataTypeService.getLLMModel(knowId);
        const format = `
      ["keyword1", "keyword2", "keyword3"]
    `;
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            [
                'system',
                `
        # Role
        You are a professional keyword generation expert. Please generate a set of search keywords based on the text provided by the user. The keywords will be used to search the knowledge base. Generate 3-5 keywords. The language of the keywords should match the language of the user's text.
        You should understand the user's intent and generate keywords that need to be queried, rather than deriving keywords from the literal meaning.
        # Output
        Output only a minified JSON object with no extra text or formatting.
        {format}
        `,
            ],
            ['user', '{text}'],
        ]);
        const chain = prompt.pipe(llm);
        const result = await chain.invoke({ text, format });
        return this.utils.extractJSONFromText(result.text || '[]').concat(text);
    }
    /**
     * 重新排序调用rerank
     * @param knowId
     * @param result
     * @returns
     */
    async rerank(knowId, text, documents, options, keywords) {
        const know = await this.knowDataTypeEntity.findOneBy({ id: knowId });
        // 处理rerank
        if (!know.enableRerank || _.isEmpty(documents)) {
            return documents;
        }
        const config = await this.knowConfigService.info(know.rerankConfigId);
        const rerank = new rerank_1.RerankModel[config.type]();
        rerank.config({
            ...config.options.comm,
            ...know.rerankOptions,
        });
        const res = await rerank.rerank(documents.map(item => item[0]), keywords.join(';'), (options === null || options === void 0 ? void 0 : options.size) || 10);
        // 对比 重新返回新的结果
        const newResult = [];
        for (const item of res) {
            const arr = [];
            arr.push(documents[item.index][0]);
            arr.push(item.relevanceScore);
            newResult.push(arr);
        }
        return newResult;
    }
    /**
     * 搜索
     * @param collectionIds 集合ID 多个
     * @param text 文本
     * @param options 配置
     */
    async search(knowIds, text, options) {
        const results = await Promise.all(knowIds.map(knowId => {
            return this.invoke(knowId, text, options);
        }));
        // 合并结果，按照得分排序 number是得分
        const result = results.reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);
        result.sort((a, b) => b[1] - a[1]);
        // 只返回文档结果，并取前N个
        return result.map(item => item[0]).slice(0, options.size || 10);
    }
    /**
     * 获得存储器
     * @param knowIds
     * @returns
     */
    async getStores(collectionIds) {
        return await Promise.all(collectionIds.map(collectionId => {
            return this.getStore(collectionId);
        }));
    }
    /**
     * 获得存储器
     * @param knowId
     * @returns
     */
    async getStore(collectionId) {
        const store = await this.knowStore.get(collectionId);
        return await store.getStore(`${this.prefix}${collectionId}`);
    }
};
exports.KnowRetrieverService = KnowRetrieverService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], KnowRetrieverService.prototype, "ctx", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(type_2.KnowDataTypeEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowRetrieverService.prototype, "knowDataTypeEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", store_1.KnowStore)
], KnowRetrieverService.prototype, "knowStore", void 0);
__decorate([
    (0, core_3.Config)('module.know.prefix'),
    __metadata("design:type", String)
], KnowRetrieverService.prototype, "prefix", void 0);
__decorate([
    (0, core_3.Config)('module.know.indexCount'),
    __metadata("design:type", Number)
], KnowRetrieverService.prototype, "indexCount", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", type_1.KnowDataTypeService)
], KnowRetrieverService.prototype, "knowDataTypeService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.KnowDataInfoService)
], KnowRetrieverService.prototype, "knowDataInfoService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", source_1.KnowDataSourceService)
], KnowRetrieverService.prototype, "knowDataSourceService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", config_1.KnowConfigService)
], KnowRetrieverService.prototype, "knowConfigService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", graph_1.KnowGraphService)
], KnowRetrieverService.prototype, "knowGraphService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], KnowRetrieverService.prototype, "utils", void 0);
exports.KnowRetrieverService = KnowRetrieverService = __decorate([
    (0, core_1.Provide)()
], KnowRetrieverService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9zZXJ2aWNlL3JldHJpZXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFDakQsNENBQW1FO0FBR25FLHlDQUF3RDtBQUV4RCxvQ0FBcUM7QUFDckMsc0NBQWtEO0FBRWxELHFDQUE2QztBQUM3QyxzQ0FBd0M7QUFFeEMsOENBQXlEO0FBQ3pELCtDQUFzRDtBQUN0RCxxQ0FBcUM7QUFDckMscURBQTZEO0FBQzdELCtDQUE0QztBQUM1QywwQ0FBc0Q7QUFDdEQsbUNBQTJDO0FBQzNDLHNDQUFrRDtBQUNsRCw0QkFBNEI7QUFFNUI7O0dBRUc7QUFFSSxJQUFNLG9CQUFvQixHQUExQixNQUFNLG9CQUFxQixTQUFRLGtCQUFXO0lBa0NuRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUNWLE1BQWMsRUFDZCxJQUFZLEVBQ1osT0FBdUI7UUFFdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsTUFBTSxJQUFJLHdCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQy9CLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVB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