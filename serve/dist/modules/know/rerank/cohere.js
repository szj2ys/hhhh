"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowRerankCohere = void 0;
const base_1 = require("./base");
const cohere_1 = require("@langchain/cohere");
/**
 * cohere重排 https://docs.cohere.com/reference/rerank
 */
class KnowRerankCohere extends base_1.KnowRerankBase {
    /**
     * 配置
     * @param options
     */
    config(options) {
        this.cohere = new cohere_1.CohereRerank(options);
    }
    /**
     * 重排
     * @param docs
     * @param text
     * @param topN
     */
    async rerank(docs, text, topN) {
        const result = this.cohere.rerank(docs, text, { topN });
        return result;
    }
}
exports.KnowRerankCohere = KnowRerankCohere;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29oZXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9yZXJhbmsvY29oZXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlDQUF3QztBQUN4Qyw4Q0FBaUQ7QUFFakQ7O0dBRUc7QUFDSCxNQUFhLGdCQUFpQixTQUFRLHFCQUFjO0lBR2xEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxPQUFZO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQ1YsSUFBOEMsRUFDOUMsSUFBWSxFQUNaLElBQVk7UUFFWixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN4RCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUF6QkQsNENBeUJDIn0=