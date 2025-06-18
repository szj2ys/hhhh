"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllConfig = exports.Config = void 0;
const config_1 = require("./embed/config");
const config_2 = require("./rerank/config");
// 配置
exports.Config = {
    // 向量化模型
    embed: config_1.ConfigEmbedd,
    // 重排模型
    rerank: config_2.ConfigRerank,
};
/**
 * 所有配置
 */
exports.AllConfig = [
    {
        title: '向量化模型Embed',
        type: 'embed',
    },
    {
        title: '重排模型Rerank',
        type: 'rerank',
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQThDO0FBQzlDLDRDQUErQztBQWtCL0MsS0FBSztBQUNRLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLFFBQVE7SUFDUixLQUFLLEVBQUUscUJBQVk7SUFDbkIsT0FBTztJQUNQLE1BQU0sRUFBRSxxQkFBWTtDQUNyQixDQUFDO0FBS0Y7O0dBRUc7QUFDVSxRQUFBLFNBQVMsR0FBRztJQUN2QjtRQUNFLEtBQUssRUFBRSxZQUFZO1FBQ25CLElBQUksRUFBRSxPQUFPO0tBQ2Q7SUFDRDtRQUNFLEtBQUssRUFBRSxZQUFZO1FBQ25CLElBQUksRUFBRSxRQUFRO0tBQ2Y7Q0FDRixDQUFDIn0=