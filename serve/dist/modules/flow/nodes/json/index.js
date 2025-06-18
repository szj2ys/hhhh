"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeJson = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
/**
 * JSON抽取
 */
let NodeJson = class NodeJson extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     * @returns
     */
    async run(context) {
        // 获得输入参数
        const params = this.inputParams;
        const result = this.extractJSONFromText(params.text);
        context.set(`${this.getPrefix()}.json`, result, 'output');
        return {
            success: true,
            result,
        };
    }
    /**
     * 从文本中提取 JSON 字符串并转换为对象
     * @param {string} text - 可能包含 JSON 的文本
     * @returns {Object|Array|null} - 解析出的 JSON 对象，如果没有找到有效 JSON 则返回 null
     */
    extractJSONFromText(text) {
        if (!text || typeof text !== 'string') {
            return null;
        }
        try {
            // 尝试直接解析整个文本
            return JSON.parse(text);
        }
        catch (e) {
            // 整个文本不是有效的 JSON，尝试提取 JSON 部分
        }
        // 查找可能的 JSON 开始位置（{ 或 [）
        const possibleStarts = [];
        for (let i = 0; i < text.length; i++) {
            if (text[i] === '{' || text[i] === '[') {
                possibleStarts.push(i);
            }
        }
        // 从每个可能的起始位置尝试提取 JSON
        for (const startIndex of possibleStarts) {
            let openBraces = 0;
            let openBrackets = 0;
            let inString = false;
            let escapeNext = false;
            for (let i = startIndex; i < text.length; i++) {
                const char = text[i];
                // 处理转义字符
                if (inString && !escapeNext && char === '\\') {
                    escapeNext = true;
                    continue;
                }
                // 处理字符串边界
                if (!escapeNext && char === '"') {
                    inString = !inString;
                }
                if (!inString) {
                    // 只在不在字符串内部时才计算括号
                    if (char === '{')
                        openBraces++;
                    else if (char === '}')
                        openBraces--;
                    else if (char === '[')
                        openBrackets++;
                    else if (char === ']')
                        openBrackets--;
                }
                escapeNext = false;
                // 检查是否找到了完整的 JSON 结构
                if ((openBraces === 0 && text[startIndex] === '{' && char === '}') ||
                    (openBrackets === 0 && text[startIndex] === '[' && char === ']')) {
                    const jsonStr = text.substring(startIndex, i + 1);
                    try {
                        const result = JSON.parse(jsonStr);
                        return result;
                    }
                    catch (e) {
                        // 这个候选 JSON 无效，继续尝试下一个
                        break;
                    }
                }
            }
        }
        return null; // 没有找到有效的 JSON
    }
};
exports.NodeJson = NodeJson;
exports.NodeJson = NodeJson = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeJson);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2pzb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQTJEO0FBQzNELDRDQUE2QztBQUk3Qzs7R0FFRztBQUdJLElBQU0sUUFBUSxHQUFkLE1BQU0sUUFBUyxTQUFRLGVBQVE7SUFDcEM7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBb0I7UUFDNUIsU0FBUztRQUNULE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFaEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTFELE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSTtZQUNiLE1BQU07U0FDUCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxtQkFBbUIsQ0FBQyxJQUFJO1FBQ3RCLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDdEMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxDQUFDO1lBQ0gsYUFBYTtZQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLDhCQUE4QjtRQUNoQyxDQUFDO1FBRUQseUJBQXlCO1FBQ3pCLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVB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