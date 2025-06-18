"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../../comm/path");
const path_2 = require("path");
/**
 * 模块配置
 */
exports.default = () => {
    return {
        // 模块名称
        name: '知识库',
        // 模块描述
        description: '知识库，检索，向量存储等',
        // 中间件，只对本模块有效
        middlewares: [],
        // 中间件，全局有效
        globalMiddlewares: [],
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 0,
        // 向量数据存储，默认为：faiss
        store: 'pg',
        // chroma 配置
        chroma: {
            // 服务地址
            url: 'http://127.0.0.1:8000',
            // 距离计算方式 可选 l2、cosine、ip
            distance: 'l2',
            // 重试次数，向量化失败时重试
            retry: 10,
            // 重试间隔，单位：ms
            retryInterval: 1000,
        },
        faiss: {
            directory: (0, path_2.join)((0, path_1.pDataPath)(), 'faiss'),
        },
        // PG 配置
        pg: {
            // 距离计算方式
            distanceStrategy: 'cosine',
            // 表名
            tableName: 'know_pg_store',
        },
        // 集合前缀
        prefix: '',
        // 重试次数，向量化失败时重试
        retry: 3,
        // 重试间隔，单位：ms
        retryInterval: 1000,
        // 索引数量，非返回数量
        indexCount: 60,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwwQ0FBNEM7QUFDNUMsK0JBQTRCO0FBRzVCOztHQUVHO0FBQ0gsa0JBQWUsR0FBRyxFQUFFO0lBQ2xCLE9BQU87UUFDTCxPQUFPO1FBQ1AsSUFBSSxFQUFFLEtBQUs7UUFDWCxPQUFPO1FBQ1AsV0FBVyxFQUFFLGNBQWM7UUFDM0IsY0FBYztRQUNkLFdBQVcsRUFBRSxFQUFFO1FBQ2YsV0FBVztRQUNYLGlCQUFpQixFQUFFLEVBQUU7UUFDckIsdUJBQXVCO1FBQ3ZCLEtBQUssRUFBRSxDQUFDO1FBQ1IsbUJBQW1CO1FBQ25CLEtBQUssRUFBRSxJQUFrQjtRQUN6QixZQUFZO1FBQ1osTUFBTSxFQUFFO1lBQ04sT0FBTztZQUNQLEdBQUcsRUFBRSx1QkFBdUI7WUFDNUIseUJBQXlCO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZ0JBQWdCO1lBQ2hCLEtBQUssRUFBRSxFQUFFO1lBQ1QsYUFBYTtZQUNiLGFBQWEsRUFBRSxJQUFJO1NBQ3BCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsU0FBUyxFQUFFLElBQUEsV0FBSSxFQUFDLElBQUEsZ0JBQVMsR0FBRSxFQUFFLE9BQU8sQ0FBQztTQUN0QztRQUNELFFBQVE7UUFDUixFQUFFLEVBQUU7WUFDRixTQUFTO1lBQ1QsZ0JBQWdCLEVBQUUsUUFBNEI7WUFDOUMsS0FBSztZQUNMLFNBQVMsRUFBRSxlQUFlO1NBQzNCO1FBQ0QsT0FBTztRQUNQLE1BQU0sRUFBRSxFQUFFO1FBQ1YsZ0JBQWdCO1FBQ2hCLEtBQUssRUFBRSxDQUFDO1FBQ1IsYUFBYTtRQUNiLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGFBQWE7UUFDYixVQUFVLEVBQUUsRUFBRTtLQUNDLENBQUM7QUFDcEIsQ0FBQyxDQUFDIn0=