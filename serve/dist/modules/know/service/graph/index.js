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
exports.KnowGraphService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const node_1 = require("../../entity/graph/node");
const relation_1 = require("../../entity/graph/relation");
const type_1 = require("../data/type");
// import { LLMGraphTransformer } from '../../graph/llm';
// import { Document } from '@langchain/core/documents';
const core_3 = require("@midwayjs/core");
const typeorm_3 = require("typeorm");
const prompts_1 = require("@langchain/core/prompts");
const utils_1 = require("../../../../comm/utils");
/**
 * 知识图谱服务
 */
let KnowGraphService = class KnowGraphService extends core_2.BaseService {
    /**
     * 重试保存
     * @param typeId
     * @param data
     */
    async retrySave(typeId, data) {
        const type = await this.knowDataTypeService.info(typeId);
        if (!type || type.indexType !== 2) {
            return;
        }
        const invokeNew = (0, core_3.retryWithAsync)(this.save.bind(this), this.knowConfig.retry, {
            retryInterval: this.knowConfig.retryInterval,
        });
        try {
            await invokeNew(typeId, data);
        }
        catch (e) { }
    }
    /**
     * 保存
     * @param typeId
     * @param data
     */
    async save(typeId, data) {
        const genResult = await this.gen(typeId, data.text);
        const nodes = genResult.nodes;
        const relations = genResult.relations;
        // 先清除分段
        await this.clearByChunk(typeId, data.chunkId);
        // 保存节点
        for (const node of nodes) {
            // 先判断是否存在
            const exist = await this.knowGraphNodeEntity.findOneBy({
                typeId: data.typeId,
                name: node.id,
            });
            if (exist) {
                continue;
            }
            // 保存节点
            await this.knowGraphNodeEntity.save({
                typeId: data.typeId,
                name: node.id,
                type: node.type,
                chunkId: data.chunkId,
                sourceId: data.sourceId,
            });
        }
        // 保存关系
        await this.knowGraphRelationEntity.save(relations.map(item => {
            return {
                typeId: data.typeId,
                sourceName: item.sourceId,
                targetName: item.targetId,
                chunkId: data.chunkId,
                sourceId: data.sourceId,
                type: item.type,
            };
        }));
    }
    /**
     * 获取知识图谱
     * @param typeId 类型ID
     */
    async getGraph(typeId) {
        const nodes = await this.knowGraphNodeEntity
            .createQueryBuilder('a')
            .select('a.name', 'id')
            .select('a.name', 'name')
            .addSelect('a.type', 'type')
            .addSelect('a.chunkId', 'chunkId')
            .where('a.typeId = :typeId', { typeId })
            .getRawMany();
        const relations = await this.knowGraphRelationEntity
            .createQueryBuilder('b')
            .select('b.sourceName', 'source')
            .addSelect('b.targetName', 'target')
            .addSelect('b.type', 'type')
            .where('b.typeId = :typeId', { typeId })
            .getRawMany();
        return {
            nodes,
            relations,
        };
    }
    /**
     * 清除分段
     * @param typeId 类型ID
     * @param chunkId 分段ID
     */
    async clearByChunk(typeId, chunkId) {
        await this.knowGraphNodeEntity.delete({ typeId, chunkId });
        await this.knowGraphRelationEntity.delete({ typeId, chunkId });
    }
    /**
     * 清除资源
     * @param sourceId 资源ID
     */
    async clearBySource(sourceIds) {
        await this.knowGraphNodeEntity.delete({ sourceId: (0, typeorm_3.In)(sourceIds) });
        await this.knowGraphRelationEntity.delete({ sourceId: (0, typeorm_3.In)(sourceIds) });
    }
    /**
     * 生成知识图谱
     * @param typeId 类型ID
     * @param text 文本
     */
    async gen(typeId, text) {
        const model = await this.knowDataTypeService.getLLMModel(typeId);
        const format = `{
      "nodes": [
        {
          "id": "实体ID",
          "type": "实体类型"
        }
      ],
      "relations": [
        {
          "sourceId": "源节点ID",
          "type": "关系类型",
          "targetId": "目标节点ID"
        }
      ]
    }`;
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            [
                'system',
                `
        # 知识图谱构建指南

        ## 1. 概述
        你的任务是从文本中提取结构化信息，以构建知识图谱。
        尽可能多地捕获文本中的信息，同时保持准确性。不要添加文本中未明确提及的任何信息。

        知识图谱包含：
        - **节点**：表示实体和概念
        - **关系**：表示实体或概念之间的连接

        ## 2. 节点标注
        - **一致性**：确保使用基础或基本类型作为节点标签
        - 例如，当识别到代表人的实体时，始终将其标记为"Person"，避免使用更具体的术语如"Mathematician"或"Scientist"
        - **节点ID**：不要使用整数作为节点ID。节点ID应该是文本中找到的名称或人类可读的标识符
        - 不能以链接作为节点ID
        - 节点尽可能简短，不能过长，控制在2~6个字符

        ## 3. 关系定义
        - 构建知识图谱时确保关系类型的一致性和通用性
        - 使用更通用和永恒的关系类型，而不是特定和临时的类型
        - 例如，使用"PROFESSOR"而不是"BECAME_PROFESSOR"
        - 确保使用通用且永恒的关系类型

        ## 4. 共指消解
        - **保持实体一致性**：提取实体时确保一致性
        - 如果一个实体（如"张三"）在文本中多次提及但以不同名称或代词（如"小张"、"他"）指代，始终使用该实体最完整的标识符
        - 在这个例子中，使用"张三"作为实体ID
        - 记住，知识图谱应该连贯且易于理解，因此保持实体引用的一致性至关重要

        ## 5. 输出格式
        请以单行压缩JSON格式返回结果，不包含任何换行符、回车符或多余空格。确保返回的是有效的JSON字符串，可以直接被解析。
        Output Minified JSON
        输出格式示例：
        {format}
        
        重要说明：
        1. 返回的JSON必须是单行的，不包含任何\n或\r字符
        2. 不要在JSON前后添加任何额外文本、代码块标记或解释
        3. 确保JSON使用双引号作为字符串分隔符，遵循标准JSON规范
        4. 确保返回的是纯JSON格式，不要添加markdown格式
      `,
            ],
            [
                'user',
                `
        文本：{text}
        `,
            ],
        ]);
        const chain = prompt.pipe(model);
        const result = await chain.invoke({ text, format });
        // 使用工具提取JSON，确保可靠地获取正确的JSON内容
        return this.utils.extractJSONFromText(result.content);
    }
    /**
     * 搜索
     * @param typeId 类型ID
     * @param chunkId 分段ID
     * @param level 层级
     * @param size 数量
     */
    async search(typeId, chunkId, level, size) {
        const visitedChunks = new Set([chunkId]);
        const currentLevelChunks = [chunkId];
        // 记录所有关系对
        const allRelations = new Map();
        // 定义递归查询关系函数
        const findRelatedChunks = async (currentLevel) => {
            if (currentLevel > level || currentLevelChunks.length === 0) {
                return;
            }
            // 获取当前层级所有chunkId的节点
            const nodes = await this.knowGraphNodeEntity.find({
                where: {
                    typeId,
                    chunkId: (0, typeorm_3.In)(currentLevelChunks),
                },
                select: ['name', 'chunkId'],
            });
            // 根据节点名称查找所有关系
            const nodeNames = nodes.map(node => node.name);
            if (nodeNames.length === 0) {
                return;
            }
            // 查找这些节点作为源或目标的所有关系
            const relations = await this.knowGraphRelationEntity.find({
                where: [
                    { typeId, sourceName: (0, typeorm_3.In)(nodeNames) },
                    { typeId, targetName: (0, typeorm_3.In)(nodeNames) },
                ],
            });
            // 获取下一层级的chunkId
            const nextLevelChunks = new Set();
            // 查询所有关联节点的chunkId
            const relatedNodeNames = new Set();
            relations.forEach(relation => {
                if (nodeNames.includes(relation.sourceName)) {
                    relatedNodeNames.add(relation.targetName);
                }
                if (nodeNames.includes(relation.targetName)) {
                    relatedNodeNames.add(relation.sourceName);
                }
            });
            // 查询关联节点的chunkId
            if (relatedNodeNames.size > 0) {
                const relatedNodes = await this.knowGraphNodeEntity.find({
                    where: {
                        typeId,
                        name: (0, typeorm_3.In)(Array.from(relatedNodeNames)),
                    },
                    select: ['name', 'chunkId'],
                });
                // 构建节点名称到chunkId的映射
                const nodeNameToChunkId = new Map();
                nodes.forEach(node => {
                    nodeNameToChunkId.set(node.name, node.chunkId);
                });
                relatedNodes.forEach(node => {
                    nodeNameToChunkId.set(node.name, node.chunkId);
                });
                // 处理关系
                for (const relation of relations) {
                    const sourceChunkId = nodeNameToChunkId.get(relation.sourceName);
                    const targetChunkId = nodeNameToChunkId.get(relation.targetName);
                    if (sourceChunkId && targetChunkId) {
                        // 跳过当前chunkId自身关系
                        if (sourceChunkId === chunkId && targetChunkId === chunkId) {
                            continue;
                        }
                        // 记录关系
                        const relationStr = relation.type;
                        // 如果关系中至少有一个是传入的chunkId，则需要记录关系到关联的另一个chunkId
                        if (sourceChunkId === chunkId) {
                            if (targetChunkId !== chunkId) {
                                // 确保目标不是传入的chunkId
                                if (!allRelations.has(targetChunkId)) {
                                    allRelations.set(targetChunkId, []);
                                }
                                // 避免重复添加相同的关系类型
                                if (!allRelations.get(targetChunkId).includes(relationStr)) {
                                    allRelations.get(targetChunkId).push(relationStr);
                                }
                                // 标记为已访问，并加入下一层级（如果未访问过）
                                if (!visitedChunks.has(targetChunkId)) {
                                    visitedChunks.add(targetChunkId);
                                    nextLevelChunks.add(targetChunkId);
                                }
                            }
                        }
                        else if (targetChunkId === chunkId) {
                            if (sourceChunkId !== chunkId) {
                                // 确保源不是传入的chunkId
                                if (!allRelations.has(sourceChunkId)) {
                                    allRelations.set(sourceChunkId, []);
                                }
                                // 避免重复添加相同的关系类型
                                if (!allRelations.get(sourceChunkId).includes(relationStr)) {
                                    allRelations.get(sourceChunkId).push(relationStr);
                                }
                                // 标记为已访问，并加入下一层级（如果未访问过）
                                if (!visitedChunks.has(sourceChunkId)) {
                                    visitedChunks.add(sourceChunkId);
                                    nextLevelChunks.add(sourceChunkId);
                                }
                            }
                        }
                        else if (currentLevel > 0) {
                            // 处理非直接与原始chunkId相关的关系（间接关系）
                            // 当前层级的节点与其他节点的关系
                            if (currentLevelChunks.includes(sourceChunkId) &&
                                targetChunkId !== chunkId) {
                                if (!allRelations.has(targetChunkId)) {
                                    allRelations.set(targetChunkId, []);
                                }
                                // 避免重复添加相同的关系类型
                                if (!allRelations.get(targetChunkId).includes(relationStr)) {
                                    allRelations.get(targetChunkId).push(relationStr);
                                }
                                if (!visitedChunks.has(targetChunkId)) {
                                    visitedChunks.add(targetChunkId);
                                    nextLevelChunks.add(targetChunkId);
                                }
                            }
                            else if (currentLevelChunks.includes(targetChunkId) &&
                                sourceChunkId !== chunkId) {
                                if (!allRelations.has(sourceChunkId)) {
                                    allRelations.set(sourceChunkId, []);
                                }
                                // 避免重复添加相同的关系类型
                                if (!allRelations.get(sourceChunkId).includes(relationStr)) {
                                    allRelations.get(sourceChunkId).push(relationStr);
                                }
                                if (!visitedChunks.has(sourceChunkId)) {
                                    visitedChunks.add(sourceChunkId);
                                    nextLevelChunks.add(sourceChunkId);
                                }
                            }
                        }
                    }
                }
            }
            // 继续查询下一层级
            const nextLevelArray = Array.from(nextLevelChunks);
            if (nextLevelArray.length > 0) {
                // 将下一层级的chunkId更新为当前层级
                currentLevelChunks.length = 0;
                currentLevelChunks.push(...nextLevelArray);
                await findRelatedChunks(currentLevel + 1);
            }
        };
        // 开始递归查询
        await findRelatedChunks(0);
        // 转换结果格式并排除传入的chunkId
        const finalResult = [];
        // 明确检查并确保不包含传入的chunkId
        for (const [relatedChunkId, relations] of allRelations.entries()) {
            // 严格确保chunkId不等于传入的chunkId
            if (relatedChunkId &&
                relatedChunkId !== chunkId &&
                relations &&
                relations.length > 0) {
                // 对关系进行去重
                const uniqueRelations = [...new Set(relations)];
                finalResult.push({
                    chunkId: relatedChunkId,
                    relations: uniqueRelations,
                });
            }
        }
        // 如果指定了size，则限制返回结果的数量
        return size > 0 ? finalResult.slice(0, size) : finalResult;
    }
};
exports.KnowGraphService = KnowGraphService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(node_1.KnowGraphNodeEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowGraphService.prototype, "knowGraphNodeEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(relation_1.KnowGraphRelationEntity),
    __metadata("design:type", typeorm_2.Repository)
], KnowGraphService.prototype, "knowGraphRelationEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", type_1.KnowDataTypeService)
], KnowGraphService.prototype, "knowDataTypeService", void 0);
__decorate([
    (0, core_1.Config)('module.know'),
    __metadata("design:type", Object)
], KnowGraphService.prototype, "knowConfig", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], KnowGraphService.prototype, "utils", void 0);
exports.KnowGraphService = KnowGraphService = __decorate([
    (0, core_1.Provide)()
], KnowGraphService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L3NlcnZpY2UvZ3JhcGgvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXlEO0FBQ3pELDRDQUFnRDtBQUNoRCwrQ0FBc0Q7QUFDdEQscUNBQXFDO0FBQ3JDLGtEQUE4RDtBQUM5RCwwREFBc0U7QUFDdEUsdUNBQW1EO0FBQ25ELHlEQUF5RDtBQUN6RCx3REFBd0Q7QUFDeEQseUNBQWdEO0FBQ2hELHFDQUE2QjtBQUM3QixxREFBNkQ7QUFDN0Qsa0RBQStDO0FBRS9DOztHQUVHO0FBRUksSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBaUIsU0FBUSxrQkFBVztJQWdCL0M7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQ2IsTUFBYyxFQUNkLElBU0M7UUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ2xDLE9BQU87UUFDVCxDQUFDO1FBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBQSxxQkFBYyxFQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQ3JCO1lBQ0UsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYTtTQUM3QyxDQUNGLENBQUM7UUFDRixJQUFJLENBQUM7WUFDSCxNQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFD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