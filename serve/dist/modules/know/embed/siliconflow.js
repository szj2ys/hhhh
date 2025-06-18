"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiliconflowEmbeddings = void 0;
const embeddings_1 = require("@langchain/core/embeddings");
const axios_1 = require("axios");
/**
 * 硅基流动向量化模型
 */
class SiliconflowEmbeddings extends embeddings_1.Embeddings {
    constructor(options) {
        super(options);
        this.apiKey = options.apiKey;
        this.model = options.model;
    }
    async embedDocuments(documents) {
        const result = await Promise.all(documents.map(async (document) => {
            const result = await this.request(document);
            return result[0].embedding;
        }));
        return result;
    }
    async embedQuery(document) {
        const result = await this.request(document);
        return result[0].embedding;
    }
    async request(input) {
        const result = await axios_1.default.post('https://api.siliconflow.cn/v1/embeddings', {
            input,
            model: this.model,
            encoding_format: 'float',
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
        });
        return result.data.data;
    }
}
exports.SiliconflowEmbeddings = SiliconflowEmbeddings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lsaWNvbmZsb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L2VtYmVkL3NpbGljb25mbG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUMxRSxpQ0FBMEI7QUFPMUI7O0dBRUc7QUFDSCxNQUFhLHFCQUFzQixTQUFRLHVCQUFVO0lBR25ELFlBQVksT0FBb0M7UUFDOUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBQ0QsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFtQjtRQUN0QyxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQzlCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFO1lBQzdCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQWdCO1FBQy9CLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBYTtRQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQzdCLDBDQUEwQyxFQUMxQztZQUNFLEtBQUs7WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsZUFBZSxFQUFFLE9BQU87U0FDekIsRUFDRDtZQUNFLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxhQUFhLEVBQUUsVUFBVSxJQUFJLENBQUMsTUFBTSxFQUFFO2FBQ3ZDO1NBQ0YsQ0FDRixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUF4Q0Qsc0RBd0NDIn0=