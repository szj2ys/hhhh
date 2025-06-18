import { BaseService, CoolCommException } from '@cool-midway/core';
import { ILogger, Inject, Provide } from '@midwayjs/core';
import { FlowInfoService } from './info';
import { FlowExecutor } from '../runner/exec';
import { FlowContext } from '../runner/context';
import { FlowResultEntity } from '../entity/result';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { FlowLogEntity } from '../entity/log';

/**
 * 运行流程
 */
@Provide()
export class FlowRunService extends BaseService {
  // 节点执行器
  @Inject()
  flowExecutor: FlowExecutor;

  @Inject()
  flowInfoService: FlowInfoService;

  @Inject()
  logger: ILogger;

  @InjectEntityModel(FlowLogEntity)
  flowLogEntity: Repository<FlowLogEntity>;

  @InjectEntityModel(FlowResultEntity)
  flowResultEntity: Repository<FlowResultEntity>;

  /**
   * 预初始化
   * @param params 请求参数
   * @param label 流程label
   * @param nodeId 节点ID
   * @param stream 是否流式调用
   * @param context 上下文
   * @param callback 回调
   */
  async preInit(
    params: any,
    label: string,
    stream: boolean,
    context: FlowContext
  ) {
    // 设置请求参数
    context.setRequestParams(params);
    // 调试的时候非流式调用
    context.setStream(stream);
    // 获得所有节点
    const { nodes, graph, info } = await this.flowInfoService.getNodes(
      label,
      context.isDebug()
    );
    // 设置流程图
    context.setFlowGraph(graph);
    // 设置上下文
    this.flowExecutor.setContext(context);
    // 设置流程图
    this.flowExecutor.setFlowGraph(graph);
    // 设置节点
    this.flowExecutor.setFlowNode(nodes);
    return { nodes, graph, info };
  }

  /**
   * 调试
   * @param params 请求参数
   * @param label 流程label
   * @param stream 是否流式调用
   * @param context 上下文
   * @param nodeId 节点ID
   * @param callback 回调
   */
  async debug(
    params: any,
    label: string,
    stream: boolean,
    context: FlowContext,
    nodeId?: string,
    callback?: (res) => void
  ) {
    // 设置调试
    context.setDebug(true);
    // 预初始化
    await this.preInit(params, label, stream, context);
    // 执行流程
    await this.flowExecutor.run(nodeId, callback);
  }

  /**
   * 调用
   * @param params 请求参数
   * @param label 流程label
   * @param stream 是否流式调用
   * @param context 上下文
   * @param callback 回调
   */
  async invoke(
    params: any,
    label: string,
    stream: boolean,
    context: FlowContext,
    callback?: (res) => void
  ) {
    // 预初始化
    const { info } = await this.preInit(params, label, stream, context);
    // 执行流程
    const result = await this.flowExecutor.run(null, callback);
    // 保存日志
    this.flowLogEntity.save({
      flowId: info.id,
      type: result.success ? 1 : 0,
      inputParams: params,
      result,
    });
    return result;
  }
}
