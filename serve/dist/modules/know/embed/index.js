"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddModel = void 0;
const openai_1 = require("@langchain/openai");
const zhipuai_1 = require("@langchain/community/embeddings/zhipuai");
const minimax_1 = require("@langchain/community/embeddings/minimax");
const ollama_1 = require("@langchain/ollama");
const alibaba_tongyi_1 = require("@langchain/community/embeddings/alibaba_tongyi");
const bytedance_doubao_1 = require("@langchain/community/embeddings/bytedance_doubao");
const siliconflow_1 = require("./siliconflow");
/**
 * 向量化模型，你还可以添加其他向量化模型，https://js.langchain.com/v0.2/docs/integrations/text_embedding
 */
exports.EmbeddModel = {
    // 字节跳动，https://bytedance.com
    doubao: (options) => {
        return new bytedance_doubao_1.ByteDanceDoubaoEmbeddings(options);
    },
    // OpenAI Embeddings，也适用支持openai api格式的其他向量化模型
    openai: (options) => {
        return new openai_1.OpenAIEmbeddings(options);
    },
    // 智谱，https://www.zhipu.ai
    zhipu: (options) => {
        return new zhipuai_1.ZhipuAIEmbeddings({
            apiKey: options.apiKey,
            modelName: options.model,
        });
    },
    // 通义，https://tongyi.aliyun.com
    tongyi: (options) => {
        return new alibaba_tongyi_1.AlibabaTongyiEmbeddings(options);
    },
    // minimax，https://www.minimaxi.com
    minimax: (options) => {
        return new minimax_1.MinimaxEmbeddings(options);
    },
    // ollama，本地大模型，https://ollama.com
    ollama: (options) => {
        return new ollama_1.OllamaEmbeddings(options);
    },
    // 硅基流动，https://docs.siliconflow.cn/cn/api-reference/embeddings/create-embeddings
    siliconflow: (options) => {
        return new siliconflow_1.SiliconflowEmbeddings(options);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L2VtYmVkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUFxRDtBQUNyRCxxRUFBNEU7QUFDNUUscUVBQTRFO0FBQzVFLDhDQUFxRDtBQUNyRCxtRkFBeUY7QUFDekYsdUZBQTZGO0FBQzdGLCtDQUFzRDtBQUV0RDs7R0FFRztBQUNVLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLDZCQUE2QjtJQUM3QixNQUFNLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRTtRQUN2QixPQUFPLElBQUksNENBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELDhDQUE4QztJQUM5QyxNQUFNLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRTtRQUN2QixPQUFPLElBQUkseUJBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELDBCQUEwQjtJQUMxQixLQUFLLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRTtRQUN0QixPQUFPLElBQUksMkJBQWlCLENBQUM7WUFDM0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLFNBQVMsRUFBRSxPQUFPLENBQUMsS0FBSztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsK0JBQStCO0lBQy9CLE1BQU0sRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFO1FBQ3ZCLE9BQU8sSUFBSSx3Q0FBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsbUNBQW1DO0lBQ25DLE9BQU8sRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFO1FBQ3hCLE9BQU8sSUFBSSwyQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0Qsa0NBQWtDO0lBQ2xDLE1BQU0sRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFO1FBQ3ZCLE9BQU8sSUFBSSx5QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsaUZBQWlGO0lBQ2pGLFdBQVcsRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFO1FBQzVCLE9BQU8sSUFBSSxtQ0FBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0YsQ0FBQyJ9