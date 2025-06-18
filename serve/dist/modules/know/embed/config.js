"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigEmbedd = void 0;
/**
 * 配置模板
 */
exports.ConfigEmbedd = {
    // 智谱AI
    zhipu: {
        comm: {
            apiKey: 'API密钥',
        },
        options: [
            {
                field: 'model',
                title: '模型',
                select: ['embedding-3'],
                default: 'embedding-3',
            },
        ],
    },
    // doubao
    doubao: {
        comm: {
            apiKey: 'API密钥',
        },
        options: [
            {
                field: 'model',
                title: '模型',
                select: ['doubao-embedding-large-text-240915'],
                default: 'doubao-embedding-large-text-240915',
            },
        ],
    },
    // minimax
    minimax: {
        // 通用配置
        comm: {
            minimaxApiKey: 'minimax 的api key',
            minimaxGroupId: 'minimax 的group id',
        },
        // 专有配置
        options: [
            {
                field: 'model',
                title: '模型',
                select: ['embedding-2'],
                default: 'embedding-2',
            },
        ],
    },
    // tongyi
    tongyi: {
        // 通用配置
        comm: {
            apiKey: '通义千问的apiKey',
        },
        // 专有配置
        options: [
            {
                field: 'model',
                title: '模型',
                select: [
                    'text-embedding-v1',
                    'text-embedding-async-v1',
                    'text-embedding-v2',
                    'text-embedding-async-v2',
                ],
                default: 'text-embedding-v2',
            },
        ],
    },
    // openai
    openai: {
        // 通用配置
        comm: {
            apiKey: 'API密钥',
            configuration: {
                baseURL: '基础路径一般需要带/v1',
            },
        },
        // 专有配置
        options: [
            {
                field: 'model',
                title: '模型',
                select: [
                    'text-davinci-003',
                    'text-embedding-3-small',
                    'text-embedding-3-large',
                ],
                default: 'text-embedding-3-large',
            },
        ],
    },
    // ollama
    ollama: {
        // 通用配置
        comm: {
            baseUrl: '请求地址，如：http://localhost:11434',
        },
        // 专有配置
        options: [
            {
                field: 'model',
                title: '模型',
                select: ['nomic-embed-text'],
                default: 'nomic-embed-text',
            },
        ],
    },
    // siliconflow
    siliconflow: {
        comm: {
            apiKey: 'API密钥',
        },
        // 专有配置
        options: [
            {
                field: 'model',
                title: '硅基流动模型',
                select: [
                    'BAAI/bge-large-zh-v1.5',
                    'BAAI/bge-large-en-v1.5',
                    'netease-youdao/bce-embedding-base_v1',
                    'BAAI/bge-m3',
                    'Pro/BAAI/bge-m3',
                ],
                default: 'BAAI/bge-m3',
            },
        ],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9lbWJlZC9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUE7O0dBRUc7QUFDVSxRQUFBLFlBQVksR0FBa0M7SUFDekQsT0FBTztJQUNQLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxPQUFPO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsYUFBYTthQUN2QjtTQUNGO0tBQ0Y7SUFDRCxTQUFTO0lBQ1QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLE9BQU87U0FDaEI7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxNQUFNLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztnQkFDOUMsT0FBTyxFQUFFLG9DQUFvQzthQUM5QztTQUNGO0tBQ0Y7SUFDRCxVQUFVO0lBQ1YsT0FBTyxFQUFFO1FBQ1AsT0FBTztRQUNQLElBQUksRUFBRTtZQUNKLGFBQWEsRUFBRSxrQkFBa0I7WUFDakMsY0FBYyxFQUFFLG1CQUFtQjtTQUNwQztRQUNELE9BQU87UUFDUCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxhQUFhO2FBQ3ZCO1NBQ0Y7S0FDRjtJQUNELFNBQVM7SUFDVCxNQUFNLEVBQUU7UUFDTixPQUFPO1FBQ1AsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLGFBQWE7U0FDdEI7UUFDRCxPQUFPO1FBQ1AsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxFQUFFO29CQUNOLG1CQUFtQjtvQkFDbkIseUJBQXlCO29CQUN6QixtQkFBbUI7b0JBQ25CLHlCQUF5QjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFLG1CQUFtQjthQUM3QjtTQUNGO0tBQ0Y7SUFDRCxTQUFTO0lBQ1QsTUFBTSxFQUFFO1FBQ04sT0FBTztRQUNQLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxPQUFPO1lBQ2YsYUFBYSxFQUFFO2dCQUNiLE9BQU8sRUFBRSxjQUFjO2FBQ3hCO1NBQ0Y7UUFDRCxPQUFPO1FBQ1AsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxFQUFFO29CQUNOLGtCQUFrQjtvQkFDbEIsd0JBQXdCO29CQUN4Qix3QkFBd0I7aUJBQ3pCO2dCQUNELE9BQU8sRUFBRSx3QkFBd0I7YUFDbEM7U0FDRjtLQUNGO0lBQ0QsU0FBUztJQUNULE1BQU0sRUFBRTtRQUNOLE9BQU87UUFDUCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsK0JBQStCO1NBQ3pDO1FBQ0QsT0FBTztRQUNQLE9BQU8sRUFBRTtZQUNQO2dCQUNFLEtBQUssRUFBRSxPQUFPO2dCQUNkLEtBQUssRUFBRSxJQUFJO2dCQUNYLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUM1QixPQUFPLEVBQUUsa0JBQWtCO2FBQzVCO1NBQ0Y7S0FDRjtJQUNELGNBQWM7SUFDZCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsT0FBTztTQUNoQjtRQUNELE9BQU87UUFDUCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsUUFBUTtnQkFDZixNQUFNLEVBQUU7b0JBQ04sd0JBQXdCO29CQUN4Qix3QkFBd0I7b0JBQ3hCLHNDQUFzQztvQkFDdEMsYUFBYTtvQkFDYixpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRSxhQUFhO2FBQ3ZCO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==