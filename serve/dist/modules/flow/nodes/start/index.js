"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeStart = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
const core_2 = require("@cool-midway/core");
const _ = require("lodash");
/**
 * 开始节点
 */
let NodeStart = class NodeStart extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     */
    async run(context) {
        const { inputParams } = this.config;
        // 获得请求参数(带值的)
        const requestParams = context.getRequestParams();
        const reuslt = {};
        // 校验并设置输出参数
        for (const param of inputParams) {
            let value = requestParams[param.name];
            if (param.required && this.isEmptyValue(value)) {
                throw new core_2.CoolCommException(`参数 ${param.name} 为必填`);
            }
            const checkType = this.checkType(value, param.type);
            if (value !== undefined && !checkType) {
                throw new core_2.CoolCommException(`参数 ${param.name} 类型错误`);
            }
            else {
                value = this.transformValue(value, param.type);
            }
            reuslt[param.field] = value;
            context.set(`${this.getPrefix()}.${param.name}`, value, 'output');
        }
        return {
            success: true,
            result: reuslt,
        };
    }
    /**
     * 判断是否为空值
     * @param value
     * @returns
     */
    isEmptyValue(value) {
        // 检查是否是 null 或 undefined
        if (_.isNil(value)) {
            return true;
        }
        // 特别对待非容器类型（如数字和布尔值）
        if (_.isNumber(value) || _.isBoolean(value)) {
            return false;
        }
        // 对字符串、数组、对象使用 _.isEmpty
        return _.isEmpty(value);
    }
    /**
     * 转换值
     * @param value
     * @param type
     */
    transformValue(value, type) {
        if (type == 'number') {
            return Number(value);
        }
        return value;
    }
    /**
     * 字段类型
     * @param value
     * @returns
     */
    checkType(value, type) {
        if (type == 'image') {
            return (Array.isArray(value) &&
                value.every(e => typeof e === 'string' && e.startsWith('http')));
        }
        if (type == 'file') {
            return (Array.isArray(value) &&
                value.every(e => typeof e === 'string' && e.startsWith('http')));
        }
        if (type == 'text') {
            return typeof value === 'string';
        }
        if (type == 'number') {
            return !isNaN(value);
        }
        return true;
    }
};
exports.NodeStart = NodeStart;
exports.NodeStart = NodeStart = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeStart);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL3N0YXJ0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUEyRDtBQUMzRCw0Q0FBNkM7QUFFN0MsNENBQXNEO0FBQ3RELDRCQUE0QjtBQUU1Qjs7R0FFRztBQUdJLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBVSxTQUFRLGVBQVE7SUFDckM7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFvQjtRQUM1QixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxjQUFjO1FBQ2QsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLFlBQVk7UUFDWixLQUFLLE1BQU0sS0FBSyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDL0MsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdEMsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUM7WUFDdkQsQ0FBQztpQkFBTSxDQUFDO2dC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