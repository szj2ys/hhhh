"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 模块配置
 */
exports.default = options => {
    var _a;
    return {
        // 模块名称
        name: '插件模块',
        // 模块描述
        description: '插件查看、安装、卸载、配置等',
        // 中间件，只对本模块有效
        middlewares: [],
        // 中间件，全局有效
        globalMiddlewares: [],
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 0,
        // 基础插件配置
        hooks: {
            // 文件上传
            upload: {
                // 地址前缀
                domain: `http://127.0.0.1:${(_a = options === null || options === void 0 ? void 0 : options.app) === null || _a === void 0 ? void 0 : _a.getConfig('koa.port')}`,
                // domain: `http://120.79.208.255:${options?.app?.getConfig('koa.port')}`,
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvcGx1Z2luL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztHQUVHO0FBQ0gsa0JBQWUsT0FBTyxDQUFDLEVBQUU7O0lBQ3ZCLE9BQU87UUFDTCxPQUFPO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPO1FBQ1AsV0FBVyxFQUFFLGdCQUFnQjtRQUM3QixjQUFjO1FBQ2QsV0FBVyxFQUFFLEVBQUU7UUFDZixXQUFXO1FBQ1gsaUJBQWlCLEVBQUUsRUFBRTtRQUNyQix1QkFBdUI7UUFDdkIsS0FBSyxFQUFFLENBQUM7UUFDUixTQUFTO1FBQ1QsS0FBSyxFQUFFO1lBQ0wsT0FBTztZQUNQLE1BQU0sRUFBRTtnQkFDTixPQUFPO2dCQUNQLE1BQU0sRUFBRSxvQkFBb0IsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsR0FBRywwQ0FBRSxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2pFLDBFQUEwRTthQUMzRTtTQUNGO0tBQ2MsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==