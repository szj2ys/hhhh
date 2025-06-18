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
exports.NodeMCP = void 0;
const core_1 = require("@midwayjs/core");
const client_1 = require("../../mcp/client");
/**
 * MCP节点
 */
let NodeMCP = class NodeMCP {
    /**
     * 获得模型
     * @param name
     * @returns
     */
    async getMCP(name) {
        return this.flowMcpClient.getByName(name);
    }
};
exports.NodeMCP = NodeMCP;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", client_1.FlowMcpClient)
], NodeMCP.prototype, "flowMcpClient", void 0);
exports.NodeMCP = NodeMCP = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton, { allowDowngrade: true })
], NodeMCP);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL21jcC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBbUU7QUFDbkUsNkNBQWlEO0FBS2pEOztHQUVHO0FBR0ksSUFBTSxPQUFPLEdBQWIsTUFBTSxPQUFPO0lBSWxCOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQVk7UUFDdkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0YsQ0FBQTtBQVpZLDBCQUFPO0FBRWxCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ00sc0JBQWE7OENBQUM7a0JBRmxCLE9BQU87SUFGbkIsSUFBQSxjQUFPLEdBQUU7SUFDVCxJQUFBLFlBQUssRUFBQyxnQkFBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQztHQUN4QyxPQUFPLENBWW5CIn0=