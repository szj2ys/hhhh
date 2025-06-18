"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEnd = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
/**
 * 结束
 */
let NodeEnd = class NodeEnd extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     */
    async run(context) {
        const { outputParams } = this.config;
        const datas = context.getData('output');
        let result = {};
        // let stream: FlowStream;
        for (const param of outputParams) {
            result[param.field] = datas.get(`${this.getParamPrefix(param)}.${param.name}`);
            // // 如果是流，则设置流
            // if (result[param.field] instanceof FlowStream) {
            //   stream = result[param.field];
            // }
        }
        return {
            success: true,
            result,
        };
    }
};
exports.NodeEnd = NodeEnd;
exports.NodeEnd = NodeEnd = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeEnd);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2VuZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBMkQ7QUFFM0QsNENBQTZDO0FBRzdDOztHQUVHO0FBR0ksSUFBTSxPQUFPLEdBQWIsTUFBTSxPQUFRLFNBQVEsZUFBUTtJQUNuQzs7O09BR0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQW9CO1FBQzVCLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFxQixDQUFDO1FBQzVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQiwwQkFBMEI7UUFDMUIsS0FBSyxNQUFNLEtBQUssSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQzdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQzlDLENBQUM7WUFDRixlQUFlO1lBQ2YsbURBQW1EO1lBQ25ELGtDQUFrQztZQUNsQyxJQUFJO1FBQ04sQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSTtZQUNiLE1BQU07U0FDUCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUF4QlksMEJBQU87a0JBQVAsT0FBTztJQUZuQixJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEsWUFBSyxFQUFDLGdCQUFTLENBQUMsU0FBUyxDQUFDO0dBQ2QsT0FBTyxDQXdCbkIifQ==