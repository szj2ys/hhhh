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
exports.Utils = void 0;
const core_1 = require("@midwayjs/core");
const moment = require("moment");
const path = require("path");
/**
 * 帮助类
 */
let Utils = class Utils {
    /**
     * 获得dist路径
     */
    getDistPath() {
        const runPath = __dirname;
        const distIndex = runPath.lastIndexOf('/dist/') !== -1
            ? runPath.lastIndexOf('/dist/')
            : runPath.lastIndexOf('\\dist\\');
        if (distIndex !== -1) {
            return path.join(runPath.substring(0, distIndex), 'dist');
        }
        return path.join(runPath, 'dist');
    }
    /**
     * 获得请求IP
     */
    async getReqIP(ctx) {
        var _a;
        const req = ctx.req;
        return (req.headers['x-forwarded-for'] ||
            ((_a = req.socket.remoteAddress) === null || _a === void 0 ? void 0 : _a.replace('::ffff:', '')) ||
            '');
    }
    /**
     * 去除对象的空值属性
     * @param obj
     */
    async removeEmptyP(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] === null || obj[key] === '' || obj[key] === 'undefined') {
                delete obj[key];
            }
        });
    }
    /**
     * 线程阻塞毫秒数
     * @param ms
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * 获得最近几天的日期集合
     * @param recently
     */
    getRecentlyDates(recently, format = 'YYYY-MM-DD') {
        moment.locale('zh-cn');
        const dates = [];
        for (let i = 0; i < recently; i++) {
            dates.push(moment().subtract(i, 'days').format(format));
        }
        return dates.reverse();
    }
    /**
     * 获得最近几个月的月数
     * @param recently
     */
    getRecentlyMonths(recently, format = 'YYYY-MM') {
        moment.locale('zh-cn');
        const dates = [];
        const date = moment(Date.now()).format('YYYY-MM');
        for (let i = 0; i < recently; i++) {
            dates.push(moment(date).subtract(i, 'months').format(format));
        }
        return dates.reverse();
    }
    /**
     * 根据开始和结束时间，获得时间段内的日期集合
     * @param start
     * @param end
     */
    getBetweenDays(start, end, format = 'YYYY-MM-DD') {
        moment.locale('zh-cn');
        const dates = [];
        const startTime = moment(start).format(format);
        const endTime = moment(end).format(format);
        const days = moment(endTime).diff(moment(startTime), 'days');
        for (let i = 0; i <= days; i++) {
            dates.push(moment(startTime).add(i, 'days').format(format));
        }
        return dates;
    }
    /**
     * 根据开始和结束时间，获得时间段内的月份集合
     * @param start
     * @param end
     */
    getBetweenMonths(start, end, format = 'YYYY-MM') {
        moment.locale('zh-cn');
        const dates = [];
        const startTime = moment(start).format(format);
        const endTime = moment(end).format(format);
        const months = moment(endTime).diff(moment(startTime), 'months');
        for (let i = 0; i <= months; i++) {
            dates.push(moment(startTime).add(i, 'months').format(format));
        }
        return dates;
    }
    /**
     * 根据开始和结束时间，获得时间段内的小时集合
     * @param start
     * @param end
     */
    getBetweenHours(start, end, format = 'YYYY-MM-DD HH') {
        moment.locale('zh-cn');
        const dates = [];
        const startTime = moment(start).format(format);
        const endTime = moment(end).format(format);
        const hours = moment(endTime).diff(moment(startTime), 'hours');
        for (let i = 0; i <= hours; i++) {
            dates.push(moment(startTime).add(i, 'hours').format(format));
        }
        return dates;
    }
    /**
     * 字段转驼峰法
     * @param obj
     * @returns
     */
    toCamelCase(obj) {
        const camelCaseObject = {};
        for (const i in obj) {
            const camelCase = i.replace(/([-_][a-z])/gi, $1 => {
                return $1.toUpperCase().replace('-', '').replace('_', '');
            });
            camelCaseObject[camelCase] = obj[i];
        }
        return camelCaseObject;
    }
    /**
     * 匹配URL
     * @param pattern
     * @param url
     * @returns
     */
    matchUrl(pattern, url) {
        // 将 pattern 和 url 按 `/` 分割
        const patternParts = pattern.split('/').filter(Boolean);
        const urlParts = url.split('/').filter(Boolean);
        // 如果长度不匹配且 pattern 不包含 **，直接返回 false
        if (patternParts.length !== urlParts.length && !pattern.includes('**')) {
            return false;
        }
        for (let i = 0; i < patternParts.length; i++) {
            const patternPart = patternParts[i];
            const urlPart = urlParts[i];
            // 如果 patternPart 是 **，匹配剩余的所有部分
            if (patternPart === '**') {
                return true;
            }
            // 如果 patternPart 以 : 开头，说明是参数，直接匹配任意非空值
            if (patternPart.startsWith(':')) {
                if (!urlPart) {
                    return false;
                }
                continue;
            }
            // 如果 patternPart 是 *，匹配任意非空部分
            if (patternPart === '*') {
                if (!urlPart) {
                    return false;
                }
            }
            else if (patternPart !== urlPart) {
                return false;
            }
        }
        // 如果 pattern 和 url 的部分数量一致，则匹配成功
        return patternParts.length === urlParts.length;
    }
    /**
     * 从文本中提取 JSON 字符串并转换为对象
     * @param {string} text - 可能包含 JSON 的文本
     * @returns {Object|Array|null} - 解析出的 JSON 对象，如果没有找到有效 JSON 则返回 null
     */
    extractJSONFromText(text) {
        if (!text || typeof text !== 'string') {
            return null;
        }
        try {
            // 尝试直接解析整个文本
            return JSON.parse(text);
        }
        catch (e) {
            // 整个文本不是有效的 JSON，尝试提取 JSON 部分
        }
        // 查找可能的 JSON 开始位置（{ 或 [）
        const possibleStarts = [];
        for (let i = 0; i < text.length; i++) {
            if (text[i] === '{' || text[i] === '[') {
                possibleStarts.push(i);
            }
        }
        // 从每个可能的起始位置尝试提取 JSON
        for (const startIndex of possibleStarts) {
            let openBraces = 0;
            let openBrackets = 0;
            let inString = false;
            let escapeNext = false;
            for (let i = startIndex; i < text.length; i++) {
                const char = text[i];
                // 处理转义字符
                if (inString && !escapeNext && char === '\\') {
                    escapeNext = true;
                    continue;
                }
                // 处理字符串边界
                if (!escapeNext && char === '"') {
                    inString = !inString;
                }
                if (!inString) {
                    // 只在不在字符串内部时才计算括号
                    if (char === '{')
                        openBraces++;
                    else if (char === '}')
                        openBraces--;
                    else if (char === '[')
                        openBrackets++;
                    else if (char === ']')
                        openBrackets--;
                }
                escapeNext = false;
                // 检查是否找到了完整的 JSON 结构
                if ((openBraces === 0 && text[startIndex] === '{' && char === '}') ||
                    (openBrackets === 0 && text[startIndex] === '[' && char === ']')) {
                    const jsonStr = text.substring(startIndex, i + 1);
                    try {
                        const result = JSON.parse(jsonStr);
                        return result;
                    }
                    catch (e) {
                        // 这个候选 JSON 无效，继续尝试下一个
                        break;
                    }
                }
            }
        }
        return null; // 没有找到有效的 JSON
    }
};
exports.Utils = Utils;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], Utils.prototype, "baseDir", void 0);
exports.Utils = Utils = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton)
], Utils);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBbUU7QUFFbkUsaUNBQWlDO0FBQ2pDLDZCQUE2QjtBQUU3Qjs7R0FFRztBQUdJLElBQU0sS0FBSyxHQUFYLE1BQU0sS0FBSztJQUloQjs7T0FFRztJQUNILFdBQVc7UUFDVCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDMUIsTUFBTSxTQUFTLEdBQ2IsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQy9CLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBWTs7UUFDekIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixPQUFPLENBQ0wsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzthQUM5QixNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSwwQ0FBRSxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ2hELEVBQUUsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMs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