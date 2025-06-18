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
exports.FlowNode = void 0;
const _ = require("lodash");
const core_1 = require("@midwayjs/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const result_1 = require("../entity/result");
const moment = require("moment");
/**
 * 节点
 */
let FlowNode = class FlowNode {
    /**
     * 调用
     * @param config
     */
    async invoke(context) {
        let result;
        const startTime = moment();
        try {
            this.context = context;
            this.inputParams = this.getInputParams(context);
            result = await this.run(context);
        }
        catch (e) {
            this.logger.error(e);
            result = { success: false, error: e.message };
        }
        const endTime = moment();
        const duration = endTime.diff(startTime, 'milliseconds');
        const flowResultEntity = this.dataSource.getRepository(result_1.FlowResultEntity);
        await flowResultEntity.save({
            requestId: context.getRequestId(),
            node: {
                id: this.id,
                type: this.type,
                label: this.label,
                desc: this.desc,
            },
            nodeType: this.type,
            input: this.inputParams,
            output: result,
            duration,
        });
        context.setNodeRunInfo(this.id, {
            duration,
            success: result.success,
            result,
        });
        if (this.type == 'end') {
            context.setFlowResult(result);
        }
        return result;
    }
    /**
     * 获得前缀
     * @returns
     */
    getPrefix() {
        return `${this.type}.${this.id}`;
    }
    /**
     * 获得参数前缀
     * @param param
     * @returns
     */
    getParamPrefix(param) {
        return `${param.nodeType}.${param.nodeId}`;
    }
    /**
     * 获取输入参数
     * @param context
     */
    getInputParams(context) {
        if (context.isDebugOne() || this.type == 'start') {
            return context.getRequestParams();
        }
        const { inputParams } = this.config;
        // 如果是开始节点，参数从请求中获取 context.getRequestParams() 转换为 Map<string, any>
        let datas = context.getData('output');
        let params = {};
        let imageParams = {};
        let fileParams = {};
        if (_.isEmpty(inputParams)) {
            return params;
        }
        for (const param of inputParams) {
            if (param.field) {
                if (param.type == 'text') {
                    params[param.field] = datas.get(`${this.getParamPrefix(param)}.${param.name}`);
                }
                if (param.type == 'image') {
                    const value = datas.get(`${this.getParamPrefix(param)}.${param.name}`);
                    if (value) {
                        imageParams[param.field] = value;
                    }
                }
                else if (param.type == 'file') {
                    const value = datas.get(`${this.getParamPrefix(param)}.${param.name}`);
                    if (value) {
                        fileParams[param.field] = value;
                    }
                }
                else {
                    params[param.field] = datas.get(`${this.getParamPrefix(param)}.${param.name}`);
                }
            }
        }
        this.inputParams = params;
        this.imageParams = imageParams;
        this.fileParams = fileParams;
        return params;
    }
};
exports.FlowNode = FlowNode;
__decorate([
    (0, typeorm_1.InjectDataSource)(),
    __metadata("design:type", typeorm_2.DataSource)
], FlowNode.prototype, "dataSource", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], FlowNode.prototype, "logger", void 0);
exports.FlowNode = FlowNode = __decorate([
    (0, core_1.Provide)()
], FlowNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvcnVubmVyL25vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNEJBQTRCO0FBRzVCLHlDQUEwRDtBQUMxRCwrQ0FBcUQ7QUFDckQscUNBQXFDO0FBQ3JDLDZDQUFvRDtBQUNwRCxpQ0FBaUM7QUEwQ2pDOztHQUVHO0FBRUksSUFBZSxRQUFRLEdBQXZCLE1BQWUsUUFBUTtJQTJCNUI7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFvQjtRQUMvQixJQUFJLE1BQWtCLENBQUM7UUFDdkIsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEQsQ0FBQztRQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMseUJBQWdCLENBQUMsQ0FBQztRQUN6RSxNQUFNLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUMxQixTQUFTLEVBQUUsT0FBTyxDQUFDLFlBQVksRUFBRTtZQUNqQyxJQUFJLEVBQUU7Z0JBQ0osRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNoQjtZQUNELFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDdkIsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRO1NBQ1QsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQzlCLFFBQVE7WUFDUixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdkIsTUFBTTtTQUNQLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN2QixPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGNBQWMsQ0FBQyxLQUEyQztRQUN4RCxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGNBQWMsQ0FBQyxPQUFvQjtRQUMzQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ2pELE9BQU8sT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUNELE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLG1FQUFtRTtRQUNuRSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBcUIsQ0FBQztRQUMxRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUMzQixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBQ0QsS0FBSyxNQUFNLEtBQUssSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUNoQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQzdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQzlDLENBQUM7Z0JBQ0osQ0FBQztnQkFDRCxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQzFCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQ3JCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQzlDLENBQUM7b0JBQ0YsSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFDVixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDbkMsQ0FBQztnQkFDSCxDQUFDO3FCQUFNLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDaEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FDckIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FDOUMsQ0FBQztvQkFDRixJQUFJLEtBQUssRUFBRSxDQUFDO3dCQUNWLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUNsQyxDQUFDO2dCQUNILENBQUM7cUJBQU0sQ0FBQztvQkFDTixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQzdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQzlDLENBQUM7Z0JBQ0osQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQU9GLENBQUE7QUE3SXFCLDRCQUFRO0FBRTVCO0lBREMsSUFBQSwwQkFBZ0IsR0FBRTs4QkFDUCxvQkFBVTs0Q0FBQztBQUd2QjtJQURDLElBQUEsYUFBTSxHQUFFOzt3Q0FDTzttQkFMSSxRQUFRO0lBRDdCLElBQUEsY0FBTyxHQUFFO0dBQ1ksUUFBUSxDQTZJN0IifQ==