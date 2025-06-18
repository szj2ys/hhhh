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
exports.FlowMcpClient = void 0;
const core_1 = require("@midwayjs/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const core_2 = require("@cool-midway/core");
const config_1 = require("../service/config");
const mcp_adapters_1 = require("@langchain/mcp-adapters");
/**
 * MCP客户端
 */
let FlowMcpClient = class FlowMcpClient {
    constructor() {
        this.clients = new Map();
    }
    /**
     * 初始化所有客户端
     */
    async initAll() {
        const configs = await this.flowConfigService.getByNode('mcp');
        for (const config of configs) {
            try {
                await this.initOne(config);
            }
            catch (error) {
                this.logger.warn(`MCP[${config.name}]不可用，请检查配置`, error);
            }
        }
    }
    /**
     * 通过名称获取客户端
     * @param name
     * @returns
     */
    async getByName(name) {
        const client = this.clients.get(name);
        if (!client) {
            throw new core_2.CoolCommException(`MCP[${name}]不存在`);
        }
        return client;
    }
    /**
     * 初始化一个客户端
     * @param name
     */
    async initOne(config) {
        const client = await this.getClient();
        config.type == 'sse'
            ? await client.connectToServerViaSSE(config.name, config.options.url)
            : await client.connectToServerViaStdio(config.name, config.options.command, config.options.args);
        this.clients.set(config.name, client);
    }
    /**
     * PING
     */
    async ping(config) {
        const client = await this.getClient();
        try {
            config.type == 'sse'
                ? await client.connectToServerViaSSE(config.name, config.options.url)
                : await client.connectToServerViaStdio(config.name, config.options.command, config.options.args);
        }
        catch (error) {
            throw new core_2.CoolCommException(`MCP[${config.name}]不可用，请检查配置`);
        }
        finally {
            await client.close();
        }
    }
    /**
     * 获取客户端
     * @returns
     */
    async getClient() {
        return new mcp_adapters_1.MultiServerMCPClient();
    }
    /**
     * 移除客户端
     * @param name
     */
    async remove(name) {
        const client = this.clients.get(name);
        try {
            await (client === null || client === void 0 ? void 0 : client.close());
        }
        catch (error) {
            this.logger.warn(`MCP[${name}]关闭失败`, error);
        }
        finally {
            this.clients.delete(name);
        }
    }
};
exports.FlowMcpClient = FlowMcpClient;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], FlowMcpClient.prototype, "logger", void 0);
__decorate([
    (0, typeorm_1.InjectDataSource)(),
    __metadata("design:type", typeorm_2.DataSource)
], FlowMcpClient.prototype, "dataSource", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_2.CoolEventManager)
], FlowMcpClient.prototype, "coolEventManager", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", config_1.FlowConfigService)
], FlowMcpClient.prototype, "flowConfigService", void 0);
exports.FlowMcpClient = FlowMcpClient = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton, { allowDowngrade: true })
], FlowMcpClient);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9tY3AvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUE0RTtBQUM1RSwrQ0FBcUQ7QUFDckQscUNBQXFDO0FBQ3JDLDRDQUF3RTtBQUN4RSw4Q0FBc0Q7QUFDdEQsMERBQStEO0FBRS9EOztHQUVHO0FBR0ksSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYTtJQUFuQjtRQUlMLFlBQU8sR0FBc0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQWdHekQsQ0FBQztJQXJGQzs7T0FFRztJQUNILEtBQUssQ0FBQyxPQUFPO1FBQ1gsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDO2dCQUNILE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxRCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFZO1FBQzFCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENB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