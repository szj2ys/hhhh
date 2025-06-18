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
exports.NodeKnow = void 0;
const core_1 = require("@midwayjs/core");
const node_1 = require("../../runner/node");
const retriever_1 = require("../../../know/service/retriever");
const _ = require("lodash");
/**
 * 知识库节点
 */
let NodeKnow = class NodeKnow extends node_1.FlowNode {
    /**
     * 执行
     * @param context
     * @returns
     */
    async run(context) {
        const { knowIds, size, minScore, graphLevel, graphSize } = this.config.options;
        const params = this.inputParams;
        const { text } = params;
        const documents = await this.knowRetrieverService.search(knowIds, text, {
            size,
            minScore,
            graphLevel,
            graphSize,
        });
        context.set(`${this.getPrefix()}.documents`, documents, 'output');
        const relations = item => {
            const contents = item['relations'];
            if (_.isEmpty(contents)) {
                return '';
            }
            return;
        };
        const str = documents
            .map((item, index) => `序号${index + 1}：\n\n 内容：${item.pageContent} \n\n ${relations}`)
            .join('/n/r');
        context.set(`${this.getPrefix()}.text`, str, 'output');
        return {
            success: true,
            result: {
                documents,
                text: str,
            },
        };
    }
};
exports.NodeKnow = NodeKnow;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", retriever_1.KnowRetrieverService)
], NodeKnow.prototype, "knowRetrieverService", void 0);
exports.NodeKnow = NodeKnow = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], NodeKnow);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mbG93L25vZGVzL2tub3cvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW1FO0FBQ25FLDRDQUE2QztBQUU3QywrREFBdUU7QUFDdkUsNEJBQTRCO0FBRTVCOztHQUVHO0FBR0ksSUFBTSxRQUFRLEdBQWQsTUFBTSxRQUFTLFNBQVEsZUFBUTtJQUlwQzs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFvQjtRQUM1QixNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN0QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDeEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDdEUsSUFBSTtZQUNKLFFBQVE7WUFDUixVQUFVO1lBQ1YsU0FBUztTQUNWLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUN4QixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUM7WUFDRCxPQUFPO1FBQ1QsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxHQUFHLEdBQUcsU0FBUzthQUNsQixHQUFHLENBQ0YsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDZCxLQUFLLEtBQUssR0FBRyxDQUFDLFlBQVksSUFBSSxDQUFDLFdBQVcsU0FBUyxTQUFTLEVBQUUsQ0FDakU7YUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2RCxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUU7Z0JBQ04sU0FBUztnQkFDVCxJQUFJLEVBQUUsR0FBRzthQUNWO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBM0NZLDRCQUFRO0FBRW5CO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ2EsZ0NBQW9CO3NEQUFDO21CQUZoQyxRQUFRO0lBRnBCLElBQUEsY0FBTyxHQUFFO0lBQ1QsSUFBQSxZQUFLLEVBQUMsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7R0FDZCxRQUFRLENBMkNwQiJ9