import { ILogger, Inject, Provide } from '@midwayjs/core';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { KnowDataTypeService } from './data/type';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import { KnowDataSourceService } from './data/source';
import { KnowDataInfoService } from './data/info';
import { KnowSplitterConfig } from '../controller/admin/splitter';
import * as _ from 'lodash';

/**
 * 知识拆分
 */
@Provide()
export class KnowSplitterService extends BaseService {
  @Inject()
  knowDataTypeService: KnowDataTypeService;

  @Inject()
  knowDataSourceService: KnowDataSourceService;

  @Inject()
  knowDataInfoService: KnowDataInfoService;

  @Inject()
  logger: ILogger;

  /**
   * 通用
   * @param config
   * @param callback
   */
  async comm(config: KnowSplitterConfig, callback: (chunk: string) => void) {
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
  async not(
    typeId: number,
    sourceId: number,
    callback: (chunk: string) => void
  ) {
    const { text, source } = await this.knowDataSourceService.getText(sourceId);
    callback(text);
    // 保存到数据库
    await this.knowDataInfoService.addOrUpdate(
      {
        typeId,
        sourceId,
        content: text,
        from: source.from,
      },
      'add'
    );
  }

  /**
   * 快速分段
   * @param document
   * @param config
   * @returns
   */
  async quick(
    typeId: number,
    sourceId: number,
    config: {
      chunkSize?: number;
      chunkOverlap?: number;
      separator?: string;
    },
    callback: (chunk: string) => void
  ) {
    const { text, source } = await this.knowDataSourceService.getText(sourceId);
    const textSplitter = new CharacterTextSplitter({
      chunkSize: config.chunkSize || 500,
      chunkOverlap: config.chunkOverlap || 50,
      separator: config.separator || '\n\n',
    });
    const chunks = await textSplitter.splitText(text);
    this.knowDataInfoService.addOrUpdate(
      chunks.map(chunk => ({
        typeId,
        sourceId,
        content: chunk,
        from: source.from,
      })),
      'add'
    );
    for (const chunk of chunks) {
      callback(chunk);
    }
  }

  /**
   * 处理高质量分段的LLM流式处理和数据持久化
   */
  private async _processQualityLlmStream(
    typeId: number,
    sourceId: number,
    prompt: string,
    text: string,
    source: any, // 明确 source 的类型会更好，这里暂时用 any
    callback: (chunk: string) => void
  ) {
    const llm = await this.knowDataTypeService.getLLMModel(typeId);
    const s1 = '输出的内容首尾不必带```markdown```';
    const s2 = '标签：`团队`、`地址`、`公司`';
    const sysPrompt = ChatPromptTemplate.fromMessages([
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
      const result = await chain.stream(
        { text, prompt },
        { signal: controller.signal }
      );

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
            } else {
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
                await this.knowDataInfoService.addOrUpdate(
                  {
                    typeId,
                    sourceId,
                    content: chunkContent,
                    from: source.from,
                  },
                  'add'
                );
              }

              // 移除已处理的chunk
              pendingChunk = pendingChunk.substring(endIndex + 8);
              chunkStarted = false;
            } else {
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
        await this.knowDataInfoService.addOrUpdate(
          {
            typeId,
            sourceId,
            content: pendingChunk.trim(),
            from: source.from,
          },
          'add'
        );
      }
    } catch (e) {
      if (e.message == 'Aborted') {
        this.logger.warn('中断取消');
      } else {
        // 重新抛出其他类型的错误
        throw e;
      }
    } finally {
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
  async quality(
    typeId: number,
    sourceId: number,
    prompt: string,
    callback: (chunk: string) => void
  ) {
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
        await this._processQualityLlmStream(
          typeId,
          sourceId,
          prompt,
          headContent + '---sep---\n\n' + chunk,
          source,
          callback
        );
      }
    }

    await this._processQualityLlmStream(
      typeId,
      sourceId,
      prompt,
      text,
      source,
      callback
    );
  }
}
