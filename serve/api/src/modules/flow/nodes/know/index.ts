import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { FlowNode } from '../../runner/node';
import { FlowContext } from '../../runner/context';
import { KnowRetrieverService } from '../../../know/service/retriever';
import * as _ from 'lodash';

/**
 * 知识库节点
 */
@Provide()
@Scope(ScopeEnum.Prototype)
export class NodeKnow extends FlowNode {
  @Inject()
  knowRetrieverService: KnowRetrieverService;

  /**
   * 执行
   * @param context
   * @returns
   */
  async run(context: FlowContext) {
    const { knowIds, size, minScore, graphLevel, graphSize } =
      this.config.options;
    const params = this.inputParams;
    const { text } = params;
    const documents = await this.knowRetrieverService.search(knowIds, text, {
      size,
      minScore,
      graphLevel,
      graphSize,
    });
    context.set(`${this.getPrefix()}.documents`, documents, 'output');
    const relations = item => {
      const contents = item['relations'];
      if (_.isEmpty(contents)) {
        return '';
      }
      return;
    };
    const str = documents
      .map(
        (item, index) =>
          `序号${index + 1}：\n\n 内容：${item.pageContent} \n\n ${relations}`
      )
      .join('/n/r');
    context.set(`${this.getPrefix()}.text`, str, 'output');
    return {
      success: true,
      result: {
        documents,
        text: str,
      },
    };
  }
}
