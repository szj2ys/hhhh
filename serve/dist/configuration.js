"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConfiguration = void 0;
const orm = require("@midwayjs/typeorm");
const core_1 = require("@midwayjs/core");
const koa = require("@midwayjs/koa");
const crossDomain = require("@midwayjs/cross-domain");
const validate = require("@midwayjs/validate");
const info = require("@midwayjs/info");
const staticFile = require("@midwayjs/static-file");
const cron = require("@midwayjs/cron");
const DefaultConfig = require("./config/config.default");
const LocalConfig = require("./config/config.local");
const ProdConfig = require("./config/config.prod");
const cool = require("@cool-midway/core");
const upload = require("@midwayjs/upload");
const socketio = require("@midwayjs/socketio");
// import * as task from '@cool-midway/task';
// import * as rpc from '@cool-midway/rpc';
let MainConfiguration = class MainConfiguration {
    async onReady() { }
};
exports.MainConfiguration = MainConfiguration;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], MainConfiguration.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_1.MidwayWebRouterService)
], MainConfiguration.prototype, "webRouterService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], MainConfiguration.prototype, "logger", void 0);
exports.MainConfiguration = MainConfiguration = __decorate([
    (0, core_1.Configuration)({
        imports: [
            // https://koajs.com/
            koa,
            // 是否开启跨域(注：顺序不能乱放！！！) http://www.midwayjs.org/docs/extensions/cross_domain
            crossDomain,
            // 静态文件托管 https://midwayjs.org/docs/extensions/static_file
            staticFile,
            // orm https://midwayjs.org/docs/extensions/orm
            orm,
            // 参数验证 https://midwayjs.org/docs/extensions/validate
            validate,
            // 本地任务 http://www.midwayjs.org/docs/extensions/cron
            cron,
            // 文件上传
            upload,
            cool,
            // rpc 微服务 远程调用
            // rpc,
            // 任务与队列
            // task,
            // socketio，https://midwayjs.org/docs/extensions/socketio
            socketio,
            {
                component: info,
                enabledEnvironment: ['local', 'prod'],
            },
        ],
        importConfigs: [
            {
                default: DefaultConfig,
                local: LocalConfig,
                prod: ProdConfig,
            },
        ],
    })
], MainConfiguration);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF5QztBQUN6Qyx5Q0FPd0I7QUFDeEIscUNBQXFDO0FBQ3JDLHNEQUFzRDtBQUN0RCwrQ0FBK0M7QUFDL0MsdUNBQXVDO0FBQ3ZDLG9EQUFvRDtBQUNwRCx1Q0FBdUM7QUFDdkMseURBQXlEO0FBQ3pELHFEQUFxRDtBQUNyRCxtREFBbUQ7QUFDbkQsMENBQTBDO0FBQzFDLDJDQUEyQztBQUMzQywrQ0FBK0M7QUFDL0MsNkNBQTZDO0FBQzdDLDJDQUEyQztBQXNDcEMsSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBaUI7SUFVNUIsS0FBSyxDQUFDLE9BQU8sS0FBSSxDQUFDO0NBQ25CLENBQUE7QUFYWSw4Q0FBaUI7QUFFNUI7SUFEQyxJQUFBLFVBQUcsR0FBRTs7OENBQ2tCO0FBR3hCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1MsNkJBQXNCOzJEQUFDO0FBR3pDO0lBREMsSUFBQSxhQUFNLEdBQUU7O2lEQUNPOzRCQVJMLGlCQUFpQjtJQXBDN0IsSUFBQSxvQkFBYSxFQUFDO1FBQ2IsT0FBTyxFQUFFO1lBQ1AscUJBQXFCO1lBQ3JCLEdBQUc7WUFDSCwyRUFBMkU7WUFDM0UsV0FBVztZQUNYLDBEQUEwRDtZQUMxRCxVQUFVO1lBQ1YsK0NBQStDO1lBQy9DLEdBQUc7WUFDSCxxREFBcUQ7WUFDckQsUUFBUTtZQUNSLG9EQUFvRDtZQUNwRCxJQUFJO1lBQ0osT0FBTztZQUNQLE1BQU07WUFDTixJQUFJO1lBQ0osZUFBZTtZQUNmLE9BQU87WUFDUCxRQUFRO1lBQ1IsUUFBUTtZQUNSLHlEQUF5RDtZQUN6RCxRQUFRO1lBQ1I7Z0JBQ0UsU0FBUyxFQUFFLElBQUk7Z0JBQ2Ysa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO2FBQ3RDO1NBQ0Y7UUFDRCxhQUFhLEVBQUU7WUFDYjtnQkFDRSxPQUFPLEVBQUUsYUFBYTtnQkFDdEIsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLElBQUksRUFBRSxVQUFVO2FBQ2pCO1NBQ0Y7S0FDRixDQUFDO0dBQ1csaUJBQWlCLENBVzdCIn0=