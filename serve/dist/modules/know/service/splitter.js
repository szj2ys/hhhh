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
exports.KnowSplitterService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const type_1 = require("./data/type");
const prompts_1 = require("@langchain/core/prompts");
const textsplitters_1 = require("@langchain/textsplitters");
const source_1 = require("./data/source");
const info_1 = require("./data/info");
const _ = require("lodash");
/**
 * 知识拆分
 */
let KnowSplitterService = class KnowSplitterService extends core_2.BaseService {
    /**
     * 通用
     * @param config
     * @param callback
     */
    async comm(config, callback) {
        const { type, typeId, sourceId } = config;
        if (type === 'quality') {
            await this.quality(typeId, sourceId, config.quality.prompt, callback);
        }
        if (type === 'quick') {
            await this.quick(typeId, sourceId, config.quick, callback);
        }
        if (type === 'not') {
            await this.not(typeId, sourceId, callback);
        }
    }
    /**
     * 不分段
     * @param typeId
     * @param sourceId
     * @param callback
     */
    async not(typeId, sourceId, callback) {
        const { text, source } = await this.knowDataSourceService.getText(sourceId);
        callback(text);
        // 保存到数据库
        await this.knowDataInfoService.addOrUpdate({
            typeId,
            sourceId,
            content: text,
            from: source.from,
        }, 'add');
    }
    /**
     * 快速分段
     * @param document
     * @param config
     * @returns
     */
    async quick(typeId, sourceId, config, callback) {
        const { text, source } = await this.knowDataSourceService.getText(sourceId);
        const textSplitter = new textsplitters_1.CharacterTextSplitter({
            chunkSize: config.chunkSize || 500,
            chunkOverlap: config.chunkOverlap || 50,
            separator: config.separator || '\n\n',
        });
        const chunks = await textSplitter.splitText(text);
        this.knowDataInfoService.addOrUpdate(chunks.map(chunk => ({
            typeId,
            sourceId,
            content: chunk,
            from: source.from,
        })), 'add');
        for (const chunk of chunks) {
            callback(chunk);
        }
    }
    /**
     * 处理高质量分段的LLM流式处理和数据持久化
     */
    async _processQualityLlmStream(typeId, sourceId, prompt, text, source, // 明确 source 的类型会更好，这里暂时用 any
    callback) {
        const llm = await this.knowDataTypeService.getLLMModel(typeId);
        const s1 = '输出的内容首尾不必带```markdown```';
        const s2 = '标签：`团队`、`地址`、`公司`';
        const sysPrompt = prompts_1.ChatPromptTemplate.fromMessages([
            [
                'system',
                `
        # 角色
        你是一个专业的文档分割高手，将一个大的文档分为多块，分块会被存储于RAG系统中
        - 所提供的文档可能包含表格，请将表格完整的转换为markdown格式表格；
        - 所提供的文档格式排版可能比较凌乱，需要重新美化排版；
        - 除了排版外和去除无意义信息外，尽量跟随原文描述，不要自己总结和扩写；
        - 给每块文档的后面打上标签；
        - 可以根据标题、小标题、内容含义等进行分块，细小的点不要分割到不同的文档中；
        - 如果某个主题下的内容较少(少于500字)，但是也有分小点，这种情况合并到一个块；
        - 每个分块的内容不能太少，只有太长了实在无法分到一起才进行分块；
        
        # 输出
        - 将每块文档包含在<chunk></chunk>中；
        - 不要输出任何解释性和说明性信息；
        - 要给文档分成多块信息，而不是只有一块；
        - 除分块内容，不要输出其他任何无关信息；
        - 输出的内容首尾不必带${s1}
        - Absolutely prohibit modifying the image link address; keep it as is.
        - Display the image using Markdown’s image format.；
        - link 127.0.0.0.1 is invalid, 127.0.0.1 is valid;
        - 示例：
        <chunk>
        我们团队坐落于美丽的贵州，团队成员

        ${s2}
        </chunk>
       `,
            ],
            [
                'user',
                `
        # 特殊要求(如果有特殊要求以特殊要求为主)
        {prompt}
        输入文档：{text}`,
            ],
        ]);
        const chain = sysPrompt.pipe(llm);
        const controller = new AbortController();
        try {
            const result = await chain.stream({ text, prompt }, { signal: controller.signal });
            let content = '';
            let pendingChunk = '';
            let chunkStarted = false;
            // 处理流式结果
            for await (const chunk of result) {
                content += chunk.text;
                pendingChunk += chunk.text;
                // 查找完整的chunk标签
                while (true) {
                    // 如果还没开始chunk处理，检查是否有开始标签
                    if (!chunkStarted) {
                        const startIndex = pendingChunk.indexOf('<chunk>');
                        if (startIndex !== -1) {
                            // 移除开始标签之前的内容
                            pendingChunk = pendingChunk.substring(startIndex + 7);
                            chunkStarted = true;
                        }
                        else {
                            // 没有找到开始标签，跳出循环继续等待
                            break;
                        }
                    }
                    // 已经找到开始标签，检查是否有结束标签
                    if (chunkStarted) {
                        const endIndex = pendingChunk.indexOf('</chunk>');
                        if (endIndex !== -1) {
                            // 提取完整的chunk内容
                            const chunkContent = pendingChunk.substring(0, endIndex).trim();
                            // 处理完整的chunk
                            if (chunkContent && chunkContent.trim() !== '```') {
                                // 回调完整的块
                                callback(chunkContent);
                                const check = await this.knowDataSourceService.info(sourceId);
                                if (!check) {
                                    this.logger.warn('资源已删除');
                                    if (controller) {
                                        controller.abort();
                                        controller == null;
                                    }
                                }
                                // 保存到数据库
                                await this.knowDataInfoService.addOrUpdate({
                                    typeId,
                                    sourceId,
                                    content: chunkContent,
                                    from: source.from,
                                }, 'add');
                            }
                            // 移除已处理的chunk
                            pendingChunk = pendingChunk.substring(endIndex + 8);
                            chunkStarted = false;
                        }
                        else {
                            // 没有找到结束标签，跳出循环继续等待
                            break;
                        }
                    }
                }
            }
            // 处理最后可能存在的不完整chunk
            if (pendingChunk.trim() && pendingChunk.trim() !== '```') {
                // 如果还有剩余内容但没有正确的chunk格式，将其作为一个独立chunk处理
                callback(pendingChunk.trim());
                const check = await this.knowDataSourceService.info(sourceId);
                if (!check) {
                    this.logger.warn('资源已删除');
                    if (controller) {
                        controller.abort();
                        controller == null;
                    }
                }
                await this.knowDataInfoService.addOrUpdate({
                    typeId,
                    sourceId,
                    content: pendingChunk.trim(),
                    from: source.from,
                }, 'add');
            }
        }
        catch (e) {
            if (e.message == 'Aborted') {
                this.logger.warn('中断取消');
            }
            else {
                // 重新抛出其他类型的错误
                throw e;
            }
        }
        finally {
            if (controller) {
                controller.abort();
                controller == null;
            }
        }
    }
    /**
     * 高质量
     * @param typeId
     * @param sourceId
     * @param prompt
     * @param callback
     */
    async quality(typeId, sourceId, prompt, callback) {
        const { text, source } = await this.knowDataSourceService.getText(sourceId);
        // csv特殊处理
        if (source.content.endsWith('.csv')) {
            const csvDatas = text.split('---sep---');
            const batchSize = 20;
            let headContent = '';
            if (!_.isEmpty(csvDatas)) {
                headContent = csvDatas[0];
                csvDatas.shift();
            }
            for (let i = 0; i < csvDatas.length; i += batchSize) {
                const chunk = csvDatas.slice(i, i + batchSize).join('---sep---\n\n');
                console.log('chunk', chunk);
                const check = await this.knowDataSourceService.info(sourceId);
                if (!check) {
                    this.logger.warn('资源已删除');
                    break;
                }
                await this._processQualityLlmStream(typeId, sourceId, prompt, headContent + '---sep---\n\n' + chunk, source, callback);
            }
        }
        await this._processQualityLlmStream(typeId, sourceId, prompt, text, source, callback);
    }
};
exports.KnowSplitterService = KnowSplitterService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", type_1.KnowDataTypeService)
], KnowSplitterService.prototype, "knowDataTypeService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", source_1.KnowDataSourceService)
], KnowSplitterService.prototype, "knowDataSourceService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.KnowDataInfoService)
], KnowSplitterService.prototype, "knowDataInfoService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], KnowSplitterService.prototype, "logger", void 0);
exports.KnowSplitterService = KnowSplitterService = __decorate([
    (0, core_1.Provide)()
], KnowSplitterService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L3NlcnZpY2Uvc3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTBEO0FBQzFELDRDQUFtRTtBQUNuRSxzQ0FBa0Q7QUFDbEQscURBQTZEO0FBQzdELDREQUFpRTtBQUNqRSwwQ0FBc0Q7QUFDdEQsc0NBQWtEO0FBRWxELDRCQUE0QjtBQUU1Qjs7R0FFRztBQUVJLElBQU0sbUJBQW1CLEdBQXpCLE1BQU0sbUJBQW9CLFNBQVEsa0JBQVc7SUFhbEQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBMEIsRUFBRSxRQUFpQztRQUN0RSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDMUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdkIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUNELElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUNELElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUNQLE1BQWMsRUFDZCxRQUFnQixFQUNoQixRQUFpQztRQUVqQyxNQUFN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