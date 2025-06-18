"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
const tenant_1 = require("../modules/base/db/tenant");
/**
 * 本地开发 npm run prod 读取的配置文件
 */
exports.default = {
    typeorm: {
        dataSource: {
            default: {
                type: 'postgres',
                host: '120.79.208.255',
                port: 30012,
                username: 'pgipd',
                password: '7x#QmP9!Ks2$vE@5',
                database: 'pgipd',
                // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
                synchronize: false,
                // 打印日志
                logging: false,
                // 字符集
                charset: 'utf8mb4',
                // 是否开启缓存
                cache: true,
                // 实体路径
                entities: entities_1.entities,
                // 订阅者
                subscribers: [tenant_1.TenantSubscriber],
            },
        },
    },
    cool: {
        // 实体与路径，跟生成代码、前端请求、swagger文档相关 注意：线上不建议开启，以免暴露敏感信息
        eps: false,
        // 是否自动导入模块数据库
        initDB: false,
        // 判断是否初始化的方式
        initJudge: 'db',
        // 是否自动导入模块菜单
        initMenu: false,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5wcm9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMENBQXVDO0FBQ3ZDLHNEQUE2RDtBQUU3RDs7R0FFRztBQUNILGtCQUFlO0lBQ2IsT0FBTyxFQUFFO1FBQ1AsVUFBVSxFQUFFO1lBQ1YsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxVQUFVO2dCQUNoQixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixJQUFJLEVBQUUsS0FBSztnQkFDWCxRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLGdDQUFnQztnQkFDaEMsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE9BQU87Z0JBQ1AsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsTUFBTTtnQkFDTixPQUFPLEVBQUUsU0FBUztnQkFDbEIsU0FBUztnQkFDVCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPO2dCQUNQLFFBQVEsRUFBUixtQkFBUTtnQkFDUixNQUFNO2dCQUNOLFdBQVcsRUFBRSxDQUFDLHlCQUFnQixDQUFDO2FBQ2hDO1NBQ0Y7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLG1EQUFtRDtRQUNuRCxHQUFHLEVBQUUsS0FBSztRQUNWLGNBQWM7UUFDZCxNQUFNLEVBQUUsS0FBSztRQUNiLGFBQWE7UUFDYixTQUFTLEVBQUUsSUFBSTtRQUNmLGFBQWE7UUFDYixRQUFRLEVBQUUsS0FBSztLQUNGO0NBQ0EsQ0FBQyJ9