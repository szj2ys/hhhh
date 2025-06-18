"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeLLMModel = exports.CommModel = void 0;
const minimax_1 = require("@langchain/community/chat_models/minimax");
const alibaba_tongyi_1 = require("@langchain/community/chat_models/alibaba_tongyi");
const zhipuai_1 = require("@langchain/community/chat_models/zhipuai");
const core_1 = require("@midwayjs/core");
const openai_1 = require("@langchain/openai");
const ollama_1 = require("@langchain/ollama");
const deepseek_1 = require("@langchain/deepseek");
const openai_2 = require("@langchain/openai");
/**
 * 模型类型
 */
exports.CommModel = {
    // openai
    openai: openai_1.ChatOpenAI,
    // minimax
    minimax: minimax_1.ChatMinimax,
    // 通义千问
    tongyi: alibaba_tongyi_1.ChatAlibabaTongyi,
    // 智谱AI
    zhipu: zhipuai_1.ChatZhipuAI,
    // ollama 本地大模型
    ollama: ollama_1.ChatOllama,
    // deepseek
    deepseek: deepseek_1.ChatDeepSeek,
    // azure
    azure: openai_2.AzureOpenAI,
};
/**
 * LLM大模型节点
 */
let NodeLLMModel = class NodeLLMModel {
    /**
     * 获得模型
     * @param name
     * @returns
     */
    async getModel(name) {
        return exports.CommModel[name];
    }
};
exports.NodeLLMModel = NodeLLMModel;
exports.NodeLLMModel = NodeLLMModel = __decorate([
    (0, core_1.Provide)()
], NodeLLMModel);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2xsbS9tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxzRUFBdUU7QUFDdkUsb0ZBQW9GO0FBQ3BGLHNFQUF1RTtBQUN2RSx5Q0FBeUM7QUFDekMsOENBQStDO0FBQy9DLDhDQUErQztBQUMvQyxrREFBbUQ7QUFDbkQsOENBQWdEO0FBRWhEOztHQUVHO0FBQ1UsUUFBQSxTQUFTLEdBQUc7SUFDdkIsU0FBUztJQUNULE1BQU0sRUFBRSxtQkFBVTtJQUNsQixVQUFVO0lBQ1YsT0FBTyxFQUFFLHFCQUFXO0lBQ3BCLE9BQU87SUFDUCxNQUFNLEVBQUUsa0NBQWlCO0lBQ3pCLE9BQU87SUFDUCxLQUFLLEVBQUUscUJBQVc7SUFDbEIsZUFBZTtJQUNmLE1BQU0sRUFBRSxtQkFBVTtJQUNsQixXQUFXO0lBQ1gsUUFBUSxFQUFFLHVCQUFZO0lBQ3RCLFFBQVE7SUFDUixLQUFLLEVBQUUsb0JBQVc7Q0FDbkIsQ0FBQztBQUtGOztHQUVHO0FBRUksSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtJQUN2Qjs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FDWixJQUFZO1FBSVosT0FBTyxpQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRixDQUFBO0FBYlksb0NBQVk7dUJBQVosWUFBWTtJQUR4QixJQUFBLGNBQU8sR0FBRTtHQUNHLFlBQVksQ0FheEIifQ==