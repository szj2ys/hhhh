"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeVariable = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
const ts = require("typescript");
const core_2 = require("@cool-midway/core");
/**
 * 变量
 */
let NodeVariable = class NodeVariable extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     */
    async run(context) {
        const { inputParams, outputParams } = this.config;
        const datas = context.getData('output');
        let result = {};
        // 输入
        if (!context.isDebugOne()) {
            for (const param of inputParams) {
                const value = param.value
                    ? param.value
                    : datas.get(`${this.getParamPrefix(param)}.${param.name}`);
                result[param.field] = value;
            }
            this.inputParams = result;
        }
        else {
            result = this.inputParams;
        }
        // 执行代码进行转换
        result = await this.exec(this.config.options.code, result);
        // 输出
        for (const param of outputParams) {
            context.set(`${this.getPrefix()}.${param.field}`, result[param.field], 'output');
        }
        return {
            success: true,
            result,
        };
    }
    /**
     * 执行代码
     * @param content
     * @param params
     * @returns
     */
    async exec(content, params) {
        let funcMain;
        const script = `
        ${this.convertToJs(content)} 
        funcMain = main;
    `;
        eval(script);
        if (!funcMain) {
            throw new core_2.CoolCommException('未找到main函数，请检查代码后重试');
        }
        return await funcMain(params);
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
exports.NodeVariable = NodeVariable;
exports.NodeVariable = NodeVariable = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeVariable);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL3ZhcmlhYmxlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUEyRDtBQUMzRCw0Q0FBNkM7QUFHN0MsaUNBQWlDO0FBQ2pDLDRDQUFzRDtBQUV0RDs7R0FFRztBQUdJLElBQU0sWUFBWSxHQUFsQixNQUFNLFlBQWEsU0FBUSxlQUFRO0lBQ3hDOzs7T0FHRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBb0I7UUFDNUIsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFxQixDQUFDO1FBQzVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLO1FBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1lBQzFCLEtBQUssTUFBTSxLQUFLLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLO29CQUN2QixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUs7b0JBQ2IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDNUIsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO1FBQ0QsV0FBVztRQUNYLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNELEtBQUs7UUFDTCxLQUFLLE1BQU0sS0FBSyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxFQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUNuQixRQUFRLENBQ1QsQ0FBQztRQUNKLENBQUM7UUFDRCxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNO1NBQ1AsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBZSxFQUFFLE1BQVc7UUFDckMsSUFBSSxRQUFRLENBQUM7UUFDYixNQUFNLE1BQU0sR0FBRztVQUNULElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDOztLQUU5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2QsTUFBTSxJQUFJLHdCQUFpQixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELE9BQU8sTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxXQUFXLENBQUMsT0FBZTtRQUN6QixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQzNCLHFCQUFxQixFQUFFLElBQUk7WUFDM0IsTUFBTSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUTtZQUM5QixNQUFNLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQzlCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsY0FBYyxFQUFFLElBQUk7WUFDcEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsWUFBWSxFQUFFLElBQUk7WUFDbEIsTUFBTSxFQUFFLElBQUk7WUFDWixXQUFXLEVBQUUsSUFBSTtZQUNqQixhQUFhLEVBQUUsS0FBSztTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQTdFWSxvQ0FBWTt1QkFBWixZQUFZO0lBRnhCLElBQUEsY0FBTyxHQUFFO0lBQ1QsSUFBQSxZQUFLLEVBQUMsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7R0FDZCxZQUFZLENBNkV4QiJ9