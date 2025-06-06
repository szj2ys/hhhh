import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { FlowMcpClient } from '../../mcp/client';

// MCP类型键
export type MCPTypeKey = 'sse' | 'stdio';

/**
 * MCP节点
 */
@Provide()
@Scope(ScopeEnum.Singleton, { allowDowngrade: true })
export class NodeMCP {
  @Inject()
  flowMcpClient: FlowMcpClient;

  /**
   * 获得模型
   * @param name
   * @returns
   */
  async getMCP(name: string) {
    return this.flowMcpClient.getByName(name);
  }
}
