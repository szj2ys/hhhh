"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RerankModel = void 0;
const cohere_1 = require("./cohere");
const aliyun_1 = require("./aliyun");
const siliconflow_1 = require("./siliconflow");
/**
 * rerank模型，为了使结果更加准确，需要对结果进行重新排序
 */
exports.RerankModel = {
    // cohere
    cohere: cohere_1.KnowRerankCohere,
    // aliyun
    aliyun: aliyun_1.KnowRerankAliyun,
    // siliconflow
    siliconflow: siliconflow_1.KnowRerankSiliconflow,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L3JlcmFuay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBNEM7QUFDNUMscUNBQTRDO0FBQzVDLCtDQUFzRDtBQUV0RDs7R0FFRztBQUNVLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLFNBQVM7SUFDVCxNQUFNLEVBQUUseUJBQWdCO0lBQ3hCLFNBQVM7SUFDVCxNQUFNLEVBQUUseUJBQWdCO0lBQ3hCLGNBQWM7SUFDZCxXQUFXLEVBQUUsbUNBQXFCO0NBQ25DLENBQUMifQ==