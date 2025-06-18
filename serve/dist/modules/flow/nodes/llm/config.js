"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLLM = void 0;
/**
 * 配置模板
 */
exports.ConfigLLM = {
    // zhipu
    zhipu: {
        // 通用配置
        comm: {
            apiKey: 'api key',
        },
        // 专有配置
        options: [
            {
                field: 'model',
                title: '智谱AI',
                select: [
                    'glm-4-0520',
                    'glm-4',
                    'glm-4-air',
                    'glm-4-airx',
                    'glm-4-flash',
                    'glm-4-plus',
                ],
                default: 'glm-4-plus',
            },
            {
                field: 'temperature',
                type: 'number',
                title: '温度',
                default: 0.7,
                enable: true,
                max: 1,
                min: 0.1,
                supports: [],
            },
        ],
    },
    // tongyi
    tongyi: {
        // 通用配置
        comm: {
            alibabaApiKey: 'api key',
        },
        // 专有配置
        options: [
            {
                field: 'model',
                title: '通义千问',
                select: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
                default: 'qwen-turbo',
            },
            {
                field: 'temperature',
                type: 'number',
                title: '温度',
                default: 0.7,
                enable: true,
                max: 1,
                min: 0.1,
                supports: [],
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
                title: 'MINIMAX',
                select: [
                    'abab6.5-chat',
                    'abab6.5s-chat',
                    'abab5.5s-chat',
                    'abab5.5-chat',
                ],
                default: 'abab6.5-chat',
            },
            {
                field: 'temperature',
                type: 'number',
                title: '温度',
                default: 0.7,
                enable: true,
                max: 1,
                min: 0.1,
                supports: [],
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
                title: 'Open AI',
                select: [
                    'gpt-3.5-turbo',
                    'gpt-3.5-turbo-16k',
                    'gpt-4-turbo',
                    'gpt-4-turbo-preview',
                    'gpt-4o-mini',
                ],
                default: 'gpt-3.5-turbo',
            },
            {
                field: 'temperature',
                type: 'number',
                title: '温度',
                default: 0.7,
                enable: true,
                max: 1,
                min: 0.1,
                supports: [],
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
                title: 'Ollama 本地大模型',
                select: ['qwen2:7b', 'qwen2:72b', 'llama3:8b', 'llama3:70b'],
                default: 'qwen2:7b',
            },
            {
                field: 'temperature',
                type: 'number',
                title: '温度',
                default: 0.7,
                enable: true,
                max: 1,
                min: 0.1,
                supports: [],
            },
            {
                field: 'keepAlive',
                type: 'string',
                title: '留存',
                default: '-1s',
                enable: true,
                tips: '-1s表示永久留存，0s表示不留存，其他数字表示留存时间，单位为秒',
                supports: [],
            },
        ],
    },
    // deepseek
    deepseek: {
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
                title: 'Deepseek AI',
                select: ['deepseek-chat', 'deepseek-reasoner'],
                default: 'deepseek-chat',
            },
            {
                field: 'temperature',
                type: 'number',
                title: '温度',
                default: 0.7,
                enable: true,
                max: 1,
                min: 0.1,
                supports: [],
            },
        ],
    },
    // azure
    azure: {
        // 通用配置
        comm: {
            azureOpenAIApiKey: 'API密钥',
            azureOpenAIApiInstanceName: '实例名称',
            azureOpenAIApiDeploymentName: '部署名称',
            azureOpenAIApiVersion: 'API版本',
        },
        // 专有配置
        options: [
            {
                field: 'model',
                title: 'Azure Open AI',
                select: ['gpt-3.5-turbo-instruct'],
                default: 'gpt-3.5-turbo-instruct',
            },
            {
                field: 'temperature',
                type: 'number',
                title: '温度',
                default: 0.7,
                enable: true,
                max: 1,
                min: 0.1,
                supports: [],
            },
        ],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9ub2Rlcy9sbG0vY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOztHQUVHO0FBQ1UsUUFBQSxTQUFTLEdBQW9DO0lBQ3hELFFBQVE7SUFDUixLQUFLLEVBQUU7UUFDTCxPQUFPO1FBQ1AsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxPQUFPO1FBQ1AsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFO29CQUNOLFlBQVk7b0JBQ1osT0FBTztvQkFDUCxXQUFXO29CQUNYLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRSxZQUFZO2FBQ3RCO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxJQUFJO2dCQUNYLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE1BQU0sRUFBRSxJQUFJO2dCQUNaLEdBQUcsRUFBRSxDQUFDO2dCQUNOLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFFBQVEsRUFBRSxFQUFFO2FBQ2I7U0FDRjtLQUNGO0lBQ0QsU0FBUztJQUNULE1BQU0sRUFBRTtRQUNOLE9BQU87UUFDUCxJQUFJLEVBQUU7WUFDSixhQUFhLEVBQUUsU0FBUztTQUN6QjtRQUNELE9BQU87UUFDUCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztnQkFDL0MsT0FBTyxFQUFFLFlBQVk7YUFDdEI7WUFDRDtnQkFDRSxLQUFLLEVBQUUsYUFBYTtnQkFDcEIsSUFBSSxFQUFFLFFBQVE7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