"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 模块配置
 */
exports.default = ({ app }) => {
    return {
        // 模块名称
        name: 'Swagger',
        // 模块描述
        description: '处理和生成swagger文档',
        // 中间件，只对本模块有效
        middlewares: [],
        // 中间件，全局有效
        globalMiddlewares: [],
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 0,
        // swagger基本配置
        base: {
            openapi: '3.1.0',
            info: {
                title: ' Admin 在线API文档',
                version: '1.x',
                description: '本文档是由Admin内部自动构建完成',
                contact: {
                    name: '开发文档',
                    url: '',
                },
            },
            // 请求地址
            servers: [
                {
                    url: `http://127.0.0.1:${(app === null || app === void 0 ? void 0 : app.getConfig('koa.port')) || 8001}`,
                    description: '本地后台地址',
                },
            ],
            paths: {},
            components: {
                schemas: {},
                securitySchemes: {
                    ApiKeyAuth: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'header',
                    },
                },
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvc3dhZ2dlci9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7R0FFRztBQUNILGtCQUFlLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3pCLE9BQU87UUFDTCxPQUFPO1FBQ1AsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPO1FBQ1AsV0FBVyxFQUFFLGdCQUFnQjtRQUM3QixjQUFjO1FBQ2QsV0FBVyxFQUFFLEVBQUU7UUFDZixXQUFXO1FBQ1gsaUJBQWlCLEVBQUUsRUFBRTtRQUNyQix1QkFBdUI7UUFDdkIsS0FBSyxFQUFFLENBQUM7UUFDUixjQUFjO1FBQ2QsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxnQkFBZ0I7Z0JBQ3ZCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFdBQVcsRUFBRSxvQkFBb0I7Z0JBQ2pDLE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsTUFBTTtvQkFDWixHQUFHLEVBQUUsRUFBRTtpQkFDUjthQUNGO1lBQ0QsT0FBTztZQUNQLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxHQUFHLEVBQUUsb0JBQW9CLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSSxJQUFJLEVBQUU7b0JBQzdELFdBQVcsRUFBRSxRQUFRO2lCQUN0QjthQUNGO1lBQ0QsS0FBSyxFQUFFLEVBQUU7WUFDVCxVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsZUFBZSxFQUFFO29CQUNmLFVBQVUsRUFBRTt3QkFDVixJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsZUFBZTt3QkFDckIsRUFBRSxFQUFFLFFBQVE7cUJBQ2I7aUJBQ0Y7YUFDRjtTQUNGO0tBQ2MsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==