"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowRerankAliyun = void 0;
const base_1 = require("./base");
const axios_1 = require("axios");
/**
 * 阿里云重排 https://bailian.console.aliyun.com/
 */
class KnowRerankAliyun extends base_1.KnowRerankBase {
    /**
     * 配置
     * @param options
     */
    config(options) {
        this.options = options;
    }
    /**
     * 重排
     * @param docs
     * @param text
     * @param topN
     */
    async rerank(docs, text, topN) {
        const result = await axios_1.default.post('https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank', {
            input: {
                documents: docs.map(item => item.pageContent),
                query: text,
            },
            model: this.options.model,
            parameters: {
                top_n: topN,
                return_documents: false,
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.options.apiKey}`,
            },
        });
        const results = await result.data.output.results;
        return results.map((item) => ({
            index: item.index,
            relevanceScore: item.relevance_score,
        }));
    }
}
exports.KnowRerankAliyun = KnowRerankAliyun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpeXVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9yZXJhbmsvYWxpeXVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlDQUF3QztBQUN4QyxpQ0FBMEI7QUFFMUI7O0dBRUc7QUFDSCxNQUFhLGdCQUFpQixTQUFRLHFCQUFjO0lBTWxEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxPQUFZO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQ1YsSUFBOEMsRUFDOUMsSUFBWSxFQUNaLElBQVk7UUFFWixNQUFNLE1BQU0sR0FBRyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQzdCLCtFQUErRSxFQUMvRTtZQUNFLEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzdDLEtBQUssRUFBRSxJQUFJO2FBQ1o7WUFDRCxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQ3pCLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsSUFBSTtnQkFDWCxnQkFBZ0IsRUFBRSxLQUFLO2FBQ3hCO1NBQ0YsRUFDRDtZQUNFLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxhQUFhLEVBQUUsVUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTthQUMvQztTQUNGLENBQ0YsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlO1NBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNGO0FBbkRELDRDQW1EQyJ9