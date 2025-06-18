"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigRerank = void 0;
/**
 * 配置模板
 */
exports.ConfigRerank = {
    // cohere
    cohere: {
        comm: {
            apiKey: 'API密钥',
        },
        options: [
            {
                field: 'model',
                title: 'Cohere',
                select: [
                    'rerank-english-v3.0',
                    'rerank-multilingual-v3.0',
                    'rerank-english-v2.0',
                    'rerank-multilingual-v2.0',
                ],
                default: 'rerank-multilingual-v3.0',
            },
        ],
    },
    // aliyun
    aliyun: {
        comm: {
            apiKey: 'API密钥',
        },
        options: [
            {
                field: 'model',
                title: '阿里云',
                select: ['gte-rerank-v2'],
                default: 'gte-rerank-v2',
            },
        ],
    },
    // siliconflow
    siliconflow: {
        comm: {
            apiKey: 'API密钥',
        },
        options: [
            {
                field: 'model',
                title: '硅基流动',
                select: [
                    'BAAI/bge-reranker-v2-m3',
                    'Pro/BAAI/bge-reranker-v2-m3',
                    'netease-youdao/bce-reranker-base_v1',
                ],
                default: 'BAAI/bge-reranker-v2-m3',
            },
        ],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9yZXJhbmsvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOztHQUVHO0FBQ1UsUUFBQSxZQUFZLEdBQWtDO0lBQ3pELFNBQVM7SUFDVCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsT0FBTztTQUNoQjtRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLEtBQUssRUFBRSxPQUFPO2dCQUNkLEtBQUssRUFBRSxRQUFRO2dCQUNmLE1BQU0sRUFBRTtvQkFDTixxQkFBcUI7b0JBQ3JCLDBCQUEwQjtvQkFDMUIscUJBQXFCO29CQUNyQiwwQkFBMEI7aUJBQzNCO2dCQUNELE9BQU8sRUFBRSwwQkFBMEI7YUFDcEM7U0FDRjtLQUNGO0lBQ0QsU0FBUztJQUNULE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxPQUFPO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUN6QixPQUFPLEVBQUUsZUFBZTthQUN6QjtTQUNGO0tBQ0Y7SUFDRCxjQUFjO0lBQ2QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLE9BQU87U0FDaEI7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUU7b0JBQ04seUJBQXlCO29CQUN6Qiw2QkFBNkI7b0JBQzdCLHFDQUFxQztpQkFDdEM7Z0JBQ0QsT0FBTyxFQUFFLHlCQUF5QjthQUNuQztTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=