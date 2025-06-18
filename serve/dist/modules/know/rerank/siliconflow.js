"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowRerankSiliconflow = void 0;
const base_1 = require("./base");
const axios_1 = require("axios");
/**
 * 硅基流动重排 https://docs.siliconflow.cn/cn/api-reference/rerank/create-rerank
 */
class KnowRerankSiliconflow extends base_1.KnowRerankBase {
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
        const result = await axios_1.default.post('https://api.siliconflow.cn/v1/rerank', {
            documents: docs.map(item => item.pageContent),
            query: text,
            model: this.options.model,
            top_n: topN,
            return_documents: false,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.options.apiKey}`,
            },
        });
        const results = await result.data.results;
        return results.map((item) => ({
            index: item.index,
            relevanceScore: item.relevance_score,
        }));
    }
}
exports.KnowRerankSiliconflow = KnowRerankSiliconflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lsaWNvbmZsb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L3JlcmFuay9zaWxpY29uZmxvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpQ0FBd0M7QUFDeEMsaUNBQTBCO0FBRTFCOztHQUVHO0FBQ0gsTUFBYSxxQkFBc0IsU0FBUSxxQkFBYztJQU12RDs7O09BR0c7SUFDSCxNQUFNLENBQUMsT0FBWTtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUNWLElBQThDLEVBQzlDLElBQVksRUFDWixJQUFZO1FBRVosTUFBTSxNQUFNLEdBQUcsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUM3QixzQ0FBc0MsRUFDdEM7WUFDRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDN0MsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsZ0JBQWdCLEVBQUUsS0FBSztTQUN4QixFQUNEO1lBQ0UsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLGFBQWEsRUFBRSxVQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2FBQy9DO1NBQ0YsQ0FDRixDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGNBQWMsRUFBRSxJQUFJLENBQUMsZUFBZTtTQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDRjtBQS9DRCxzREErQ0MifQ==