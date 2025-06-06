import { ILogger, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { InjectDataSource } from '@midwayjs/typeorm';
import { DataSource } from 'typeorm';
import { CoolCommException, CoolEventManager } from '@cool-midway/core';
import { FlowConfigService } from '../service/config';
import { MultiServerMCPClient } from '@langchain/mcp-adapters';

/**
 * MCP客户端
 */
@Provide()
@Scope(ScopeEnum.Singleton, { allowDowngrade: true })
export class FlowMcpClient {
  @Inject()
  logger: ILogger;

  clients: Map<string, MultiServerMCPClient> = new Map();

  @InjectDataSource()
  dataSource: DataSource;

  @Inject()
  coolEventManager: CoolEventManager;

  @Inject()
  flowConfigService: FlowConfigService;

  /**
   * 初始化所有客户端
   */
  async initAll() {
    const configs = await this.flowConfigService.getByNode('mcp');
    for (const config of configs) {
      try {
        await this.initOne(config);
      } catch (error) {
        this.logger.warn(`MCP[${config.name}]不可用，请检查配置`, error);
      }
    }
  }

  /**
   * 通过名称获取客户端
   * @param name
   * @returns
   */
  async getByName(name: string): Promise<MultiServerMCPClient> {
    const client = this.clients.get(name);
    if (!client) {
      throw new CoolCommException(`MCP[${name}]不存在`);
    }
    return client;
  }

  /**
   * 初始化一个客户端
   * @param name
   */
  async initOne(config: any) {
    const client = await this.getClient();
    config.type == 'sse'
      ? await client.connectToServerViaSSE(config.name, config.options.url)
      : await client.connectToServerViaStdio(
          config.name,
          config.options.command,
          config.options.args
        );
    this.clients.set(config.name, client);
  }

  /**
   * PING
   */
  async ping(config: any) {
    const client = await this.getClient();
    try {
      config.type == 'sse'
        ? await client.connectToServerViaSSE(config.name, config.options.url)
        : await client.connectToServerViaStdio(
            config.name,
            config.options.command,
            config.options.args
          );
    } catch (error) {
      throw new CoolCommException(`MCP[${config.name}]不可用，请检查配置`);
    } finally {
      await client.close();
    }
  }

  /**
   * 获取客户端
   * @returns
   */
  async getClient(): Promise<MultiServerMCPClient> {
    return new MultiServerMCPClient();
  }

  /**
   * 移除客户端
   * @param name
   */
  async remove(name: string) {
    const client = this.clients.get(name);
    try {
      await client?.close();
    } catch (error) {
      this.logger.warn(`MCP[${name}]关闭失败`, error);
    } finally {
      this.clients.delete(name);
    }
  }
}
