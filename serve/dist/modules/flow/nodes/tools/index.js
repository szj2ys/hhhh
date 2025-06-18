"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeTool = exports.tools = void 0;
const core_1 = require("@midwayjs/core");
const search_1 = require("./search");
const tavily_search_1 = require("@langchain/community/tools/tavily_search");
/**
 * 工具
 */
exports.tools = {
    // 智谱，https://open.bigmodel.cn/dev/api/search-tool/web-search-pro
    search: (options) => {
        return new search_1.ZhipuSearch(options);
    },
    // Tavily搜索，https://tavily.com/
    tavily: (options) => {
        return new tavily_search_1.TavilySearchResults(options);
    },
};
/**
 * LLM大模型节点
 */
let NodeTool = class NodeTool {
    /**
     * 获得模型
     * @param name
     * @returns
     */
    async getTool(name) {
        return exports.tools[name];
    }
};
exports.NodeTool = NodeTool;
exports.NodeTool = NodeTool = __decorate([
    (0, core_1.Provide)()
], NodeTool);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL3Rvb2xzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUF5QztBQUN6QyxxQ0FBdUM7QUFDdkMsNEVBQStFO0FBRS9FOztHQUVHO0FBQ1UsUUFBQSxLQUFLLEdBQUc7SUFDbkIsaUVBQWlFO0lBQ2pFLE1BQU0sRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFO1FBQ3ZCLE9BQU8sSUFBSSxvQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCwrQkFBK0I7SUFDL0IsTUFBTSxFQUFFLENBQUMsT0FBWSxFQUFFLEVBQUU7UUFDdkIsT0FBTyxJQUFJLG1DQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRixDQUFDO0FBS0Y7O0dBRUc7QUFFSSxJQUFNLFFBQVEsR0FBZCxNQUFNLFFBQVE7SUFDbkI7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBWTtRQUN4QixPQUFPLGFBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQTtBQVRZLDRCQUFRO21CQUFSLFFBQVE7SUFEcEIsSUFBQSxjQUFPLEdBQUU7R0FDRyxRQUFRLENBU3BCIn0=