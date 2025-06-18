"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@cool-midway/core");
const path = require("path");
const path_1 = require("../comm/path");
const port_1 = require("../comm/port");
// redis缓存
// import { redisStore } from 'cache-manager-ioredis-yet';
exports.default = {
    // 确保每个项目唯一，项目首次启动会自动生成
    keys: '85ce467f-da13-4555-b485-f0d51db96051',
    koa: {
        port: (0, port_1.availablePort)(8001),
    },
    bodyParser: {
        formLimit: '100mb',
        jsonLimit: '100mb',
        textLimit: '100mb',
    },
    // 开启异步上下文管理
    asyncContextManager: {
        enable: true,
    },
    // 静态文件配置
    staticFile: {
        buffer: true,
        dirs: {
            default: {
                prefix: '/',
                dir: path.join(__dirname, '..', '..', 'public'),
            },
            static: {
                prefix: '/upload',
                dir: (0, path_1.pUploadPath)(),
            },
        },
    },
    // 文件上传
    upload: {
        fileSize: '200mb',
        whitelist: null,
    },
    // 缓存 可切换成其他缓存如：redis http://www.midwayjs.org/docs/extensions/caching
    cacheManager: {
        clients: {
            default: {
                store: core_1.CoolCacheStore,
                options: {
                    path: (0, path_1.pCachePath)(),
                    ttl: 0,
                },
            },
        },
    },
    // cacheManager: {
    //   clients: {
    //     default: {
    //       store: redisStore,
    //       options: {
    //         port: 6379,
    //         host: '127.0.0.1',
    //         password: '',
    //         ttl: 0,
    //         db: 0,
    //       },
    //     },
    //   },
    // },
    cool: {
        // 已经插件化，本地文件上传查看 plugin/config.ts，其他云存储查看对应插件的使用
        file: {},
        // 是否开启多租户
        tenant: {
            // 是否开启多租户
            enable: false,
            // 需要过滤多租户的url, 支持通配符， 如/admin/**/* 表示admin模块下的所有接口都进行多租户过滤
            urls: [],
        },
        // 国际化配置
        i18n: {
            // 是否开启
            enable: false,
            // 语言
            languages: ['zh-cn', 'zh-tw', 'en'],
        },
        // crud配置
        crud: {
            // 插入模式，save不会校验字段(允许传入不存在的字段)，insert会校验字段
            upsert: 'save',
            // 软删除
            softDelete: true,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQW1EO0FBQ25ELDZCQUE2QjtBQUM3Qix1Q0FBdUQ7QUFDdkQsdUNBQTZDO0FBRTdDLFVBQVU7QUFDViwwREFBMEQ7QUFFMUQsa0JBQWU7SUFDYix1QkFBdUI7SUFDdkIsSUFBSSxFQUFFLHNDQUFzQztJQUM1QyxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsSUFBQSxvQkFBYSxFQUFDLElBQUksQ0FBQztLQUMxQjtJQUNELFVBQVUsRUFBRTtRQUNWLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLFNBQVMsRUFBRSxPQUFPO0tBQ25CO0lBQ0QsWUFBWTtJQUNaLG1CQUFtQixFQUFFO1FBQ25CLE1BQU0sRUFBRSxJQUFJO0tBQ2I7SUFDRCxTQUFTO0lBQ1QsVUFBVSxFQUFFO1FBQ1YsTUFBTSxFQUFFLElBQUk7UUFDWixJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDO2FBQ2hEO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixHQUFHLEVBQUUsSUFBQSxrQkFBVyxHQUFFO2FBQ25CO1NBQ0Y7S0FDRjtJQUNELE9BQU87SUFDUCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsT0FBTztRQUNqQixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELHFFQUFxRTtJQUNyRSxZQUFZLEVBQUU7UUFDWixPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLHFCQUFjO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLElBQUEsaUJBQVUsR0FBRTtvQkFDbEIsR0FBRyxFQUFFLENBQUM7aUJBQ1A7YUFDRjtTQUNGO0tBQ0Y7SUFDRCxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0IsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0Qiw2QkFBNkI7SUFDN0Isd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsV0FBVztJQUNYLFNBQVM7SUFDVCxPQUFPO0lBQ1AsS0FBSztJQUNMLElBQUksRUFBRTtRQUNKLGlEQUFpRDtRQUNqRCxJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVU7UUFDVixNQUFNLEVBQUU7WUFDTixVQUFVO1lBQ1YsTUFBTSxFQUFFLEtBQUs7WUFDYiwyREFBMkQ7WUFDM0QsSUFBSSxFQUFFLEVBQUU7U0FDVDtRQUNELFFBQVE7UUFDUixJQUFJLEVBQUU7WUFDSixPQUFPO1lBQ1AsTUFBTSxFQUFFLEtBQUs7WUFDYixLQUFLO1lBQ0wsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7U0FDcEM7UUFDRCxTQUFTO1FBQ1QsSUFBSSxFQUFFO1lBQ0osMENBQTBDO1lBQzFDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTTtZQUNOLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO0tBQ1k7Q0FDQSxDQUFDIn0=