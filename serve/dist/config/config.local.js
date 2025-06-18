"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tenant_1 = require("../modules/base/db/tenant");
/**
 * 本地开发 npm run dev 读取的配置文件
 */
exports.default = {
    typeorm: {
        dataSource: {
            default: {
                // type: 'postgres',
                // host: '120.79.208.255',
                // port: 30014,
                // username: 'ipd',
                // password: '123456',
                // database: 'ipd',
                type: 'postgres',
                host: '120.79.208.255',
                port: 30012,
                username: 'pgipd',
                password: '7x#QmP9!Ks2$vE@5',
                database: 'pgipd',
                // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
                synchronize: true,
                // 打印日志
                logging: false,
                // 字符集
                charset: 'utf8mb4',
                // 是否开启缓存
                cache: true,
                // 实体路径
                entities: ['**/modules/*/entity'],
                // 订阅者
                subscribers: [tenant_1.TenantSubscriber],
            },
        },
    },
    cool: {
        // 实体与路径，跟生成代码、前端请求、swagger文档相关 注意：线上不建议开启，以免暴露敏感信息
        eps: true,
        // 是否自动导入模块数据库
        initDB: true,
        // 判断是否初始化的方式
        initJudge: 'db',
        // 是否自动导入模块菜单
        initMenu: true,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9jb25maWcubG9jYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzREFBNkQ7QUFFN0Q7O0dBRUc7QUFDSCxrQkFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQLFVBQVUsRUFBRTtZQUNWLE9BQU8sRUFBRTtnQkFDUCxvQkFBb0I7Z0JBQ3BCLDBCQUEwQjtnQkFDMUIsZUFBZTtnQkFDZixtQkFBbUI7Z0JBQ25CLHNCQUFzQjtnQkFDdEIsbUJBQW1CO2dCQUNuQixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixnQ0FBZ0M7Z0JBQ2hDLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixPQUFPO2dCQUNQLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE1BQU07Z0JBQ04sT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFNBQVM7Z0JBQ1QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsT0FBTztnQkFDUCxRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDakMsTUFBTTtnQkFDTixXQUFXLEVBQUUsQ0FBQyx5QkFBZ0IsQ0FBQzthQUNoQztTQUNGO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixtREFBbUQ7UUFDbkQsR0FBRyxFQUFFLElBQUk7UUFDVCxjQUFjO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixhQUFhO1FBQ2IsU0FBUyxFQUFFLElBQUk7UUFDZixhQUFhO1FBQ2IsUUFBUSxFQUFFLElBQUk7S0FDRDtDQUNBLENBQUMifQ==