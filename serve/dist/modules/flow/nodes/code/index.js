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
exports.NodeCode = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
const core_2 = require("@cool-midway/core");
const ts = require("typescript");
const cache_manager_1 = require("@midwayjs/cache-manager");
const typeorm_1 = require("@midwayjs/typeorm");
const info_1 = require("../../../plugin/service/info");
const base_1 = require("./base");
/**
 * 代码执行器
 */
let NodeCode = class NodeCode extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     */
    async run(context) {
        const { outputParams, options } = this.config;
        // 获得输入参数
        const params = this.inputParams;
        const execResult = await this.exec(options.code, params);
        for (const param of outputParams) {
            context.set(`${this.getPrefix()}.${param.field}`, execResult[param.field], 'output');
        }
        return {
            success: true,
            result: execResult,
        };
    }
    /**
     * 执行代码
     * @param content
     * @param params
     * @returns
     */
    async exec(content, params) {
        // @ts-ignore
        let CoolClass;
        // @ts-ignore
        let Base = base_1.BaseCode;
        const script = `
        ${this.convertToJs(content)} 
        CoolClass = Cool;
    `;
        eval(script);
        if (!CoolClass) {
            throw new core_2.CoolCommException('未找到Cool类，请检查代码后重试');
        }
        const cool = new CoolClass();
        cool.app = this.app;
        cool.cache = this.cache;
        cool.pluginService = this.pluginService;
        cool.typeORMDataSourceManager = this.typeORMDataSourceManager;
        cool.context = this.context;
        cool.node = this;
        if (!cool.main) {
            throw new core_2.CoolCommException('未找到main函数，请检查代码后重试');
        }
        return await cool.main(params);
    }
    /**
     * 转换为js
     * @param content
     * @returns
     */
    convertToJs(content) {
        return ts.transpile(content, {
            emitDecoratorMetadata: true,
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2018,
            removeComments: true,
            experimentalDecorators: true,
            noImplicitThis: true,
            noUnusedLocals: true,
            stripInternal: true,
            skipLibCheck: true,
            pretty: true,
            declaration: true,
            noImplicitAny: false,
        });
    }
};
exports.NodeCode = NodeCode;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", typeorm_1.TypeORMDataSourceManager)
], NodeCode.prototype, "typeORMDataSourceManager", void 0);
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], NodeCode.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.PluginService)
], NodeCode.prototype, "pluginService", void 0);
__decorate([
    (0, core_1.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], NodeCode.prototype, "cache", void 0);
exports.NodeCode = NodeCode = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeCode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2NvZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBUXdCO0FBQ3hCLDRDQUE2QztBQUU3Qyw0Q0FBc0Q7QUFDdEQsaUNBQWlDO0FBQ2pDLDJEQUFzRTtBQUN0RSwrQ0FBNkQ7QUFDN0QsdURBQTZEO0FBQzdELGlDQUFrQztBQUVsQzs7R0FFRztBQUdJLElBQU0sUUFBUSxHQUFkLE1BQU0sUUFBUyxTQUFRLGVBQVE7SUFhcEM7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFvQjtRQUM1QixNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUMsU0FBUztRQUNULE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDaEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekQsS0FBSyxNQUFNLEtBQUssSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUNULEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFDcEMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFDdkIsUUFBUSxDQUNULENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLFVBQVU7U0FDbkIsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBZSxFQUFFLE1BQVc7UUFDckMsYUFBYTtRQUNiLElBQUksU0FBUyxDQUFDO1FBQ2QsYUFBYTtRQUNiLElBQUksSUFBSSxHQUFHLGVBQVEsQ0FBQztRQUNwQixNQUFNLE1BQU0sR0FBRztVQUNULElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDOztLQUU5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsTUFBTSxJQUFJLHdCQUFpQixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELE1BQU0sSUFBSSxHQUFhLElBQUksU0FBUyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztRQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFDRCxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDM0IscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixNQUFNLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRO1lBQzlCLE1BQU0sRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU07WUFDOUIsY0FBYyxFQUFFLElBQUk7WUFDcEIsc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixjQUFjLEVBQUUsSUFBSTtZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsSUFBSTtZQUNuQixZQUFZLEVBQUUsSUFBSTtZQUNsQixNQUFNLEVBQUUsSUFBSTtZQUNaLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGFBQWEsRUFBRSxLQUFLO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBeEZZLDRCQUFRO0FBRW5CO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ2lCLGtDQUF3QjswREFBQztBQUduRDtJQURDLElBQUEsVUFBRyxHQUFFOztxQ0FDa0I7QUFHeEI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTSxvQkFBYTsrQ0FBQztBQUc3QjtJQURDLElBQUEsbUJBQVksRUFBQyw4QkFBYyxFQUFFLFNBQVMsQ0FBQzs7dUNBQ3JCO21CQVhSLFFBQVE7SUFGcEIsSUFBQSxjQUFPLEdBQUU7SUFDVCxJQUFBLFlBQUssRUFBQyxnQkFBUyxDQUFDLFNBQVMsQ0FBQztHQUNkLFFBQVEsQ0F3RnBCIn0=