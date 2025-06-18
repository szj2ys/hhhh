"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowAllConfig = exports.FlowNodeConfig = exports.NodeType = void 0;
const code_1 = require("./code");
const end_1 = require("./end");
const judge_1 = require("./judge");
const llm_1 = require("./llm");
const config_1 = require("./llm/config");
const classify_1 = require("./classify");
const start_1 = require("./start");
const know_1 = require("./know");
const flow_1 = require("./flow");
const parse_1 = require("./parse");
const variable_1 = require("./variable");
const config_2 = require("./tools/config");
const config_3 = require("./mcp/config");
const json_1 = require("./json");
/**
 * 节点类型
 */
exports.NodeType = {
    // 开始节点
    start: start_1.NodeStart,
    // LLM大模型
    llm: llm_1.NodeLLM,
    // code 代码执行器节点
    code: code_1.NodeCode,
    // 判断器
    judge: judge_1.NodeJudge,
    // 分类
    classify: classify_1.NodeClassify,
    // 知识库
    know: know_1.NodeKnow,
    // 流程
    flow: flow_1.NodeFlow,
    // 智能解析
    parse: parse_1.NodeParse,
    // 变量
    variable: variable_1.NodeVariable,
    // JSON
    json: json_1.NodeJson,
    // 结束节点
    end: end_1.NodeEnd,
};
// 节点配置
exports.FlowNodeConfig = {
    // LLM大模型
    llm: config_1.ConfigLLM,
    // 工具
    tool: config_2.ConfigTOOL,
    // MCP
    mcp: config_3.ConfigMCP,
};
// 节点配置
exports.FlowAllConfig = [
    {
        title: '大模型LLM',
        type: 'llm',
    },
    {
        title: '工具TOOL',
        type: 'tool',
    },
    {
        title: '功能MCP',
        type: 'mcp',
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFrQztBQUNsQywrQkFBZ0M7QUFDaEMsbUNBQW9DO0FBQ3BDLCtCQUFnQztBQUNoQyx5Q0FBeUM7QUFDekMseUNBQTBDO0FBQzFDLG1DQUFvQztBQUNwQyxpQ0FBa0M7QUFDbEMsaUNBQWtDO0FBQ2xDLG1DQUFvQztBQUNwQyx5Q0FBMEM7QUFDMUMsMkNBQTRDO0FBQzVDLHlDQUF5QztBQUN6QyxpQ0FBa0M7QUFFbEM7O0dBRUc7QUFDVSxRQUFBLFFBQVEsR0FBRztJQUN0QixPQUFPO0lBQ1AsS0FBSyxFQUFFLGlCQUFTO0lBQ2hCLFNBQVM7SUFDVCxHQUFHLEVBQUUsYUFBTztJQUNaLGVBQWU7SUFDZixJQUFJLEVBQUUsZUFBUTtJQUNkLE1BQU07SUFDTixLQUFLLEVBQUUsaUJBQVM7SUFDaEIsS0FBSztJQUNMLFFBQVEsRUFBRSx1QkFBWTtJQUN0QixNQUFNO0lBQ04sSUFBSSxFQUFFLGVBQVE7SUFDZCxLQUFLO0lBQ0wsSUFBSSxFQUFFLGVBQVE7SUFDZCxPQUFPO0lBQ1AsS0FBSyxFQUFFLGlCQUFTO0lBQ2hCLEtBQUs7SUFDTCxRQUFRLEVBQUUsdUJBQVk7SUFDdEIsT0FBTztJQUNQLElBQUksRUFBRSxlQUFRO0lBQ2QsT0FBTztJQUNQLEdBQUcsRUFBRSxhQUFPO0NBQ2IsQ0FBQztBQUtGLE9BQU87QUFDTSxRQUFBLGNBQWMsR0FBRztJQUM1QixTQUFTO0lBQ1QsR0FBRyxFQUFFLGtCQUFTO0lBQ2QsS0FBSztJQUNMLElBQUksRUFBRSxtQkFBVTtJQUNoQixNQUFNO0lBQ04sR0FBRyxFQUFFLGtCQUFTO0NBQ2YsQ0FBQztBQUVGLE9BQU87QUFDTSxRQUFBLGFBQWEsR0FBRztJQUMzQjtRQUNFLEtBQUssRUFBRSxRQUFRO1FBQ2YsSUFBSSxFQUFFLEtBQUs7S0FDWjtJQUNEO1FBQ0UsS0FBSyxFQUFFLFFBQVE7UUFDZixJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsT0FBTztRQUNkLElBQUksRUFBRSxLQUFLO0tBQ1o7Q0FDRixDQUFDIn0=