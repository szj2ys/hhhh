"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZhipuSearch = void 0;
const tools_1 = require("@langchain/core/tools");
const axios_1 = require("axios");
const _ = require("lodash");
const zod_1 = require("zod");
/**
 * 智谱搜索
 */
class ZhipuSearch extends tools_1.Tool {
    static lc_name() {
        return '联网搜索';
    }
    constructor(fields) {
        super(fields);
        this.name = 'zhipu_search';
        this.description = 'A search engine optimized for comprehensive, accurate,read url content, and trusted results. Useful for when you need to answer questions about current events、network info. Input should be a search query.';
        this.schema = zod_1.z
            .object({ input: zod_1.z.string().optional() })
            .describe('search keyword')
            .transform(obj => obj.input);
        this.apiKey = fields.apiKey;
        if (this.apiKey === undefined) {
            throw new Error(`No Zhipu API key found. Either set an environment variable named "ZHIPU_API_KEY" or pass an API key as "apiKey".`);
        }
    }
    async _call(input, runManager) {
        const url = 'https://open.bigmodel.cn/api/paas/v4/tools';
        const data = {
            tool: 'web-search-pro',
            stream: false,
            messages: [
                {
                    role: 'user',
                    content: input,
                },
            ],
        };
        try {
            const response = await axios_1.default.post(url, data, {
                headers: {
                    Authorization: this.apiKey,
                },
                timeout: 300000, // 300秒
            });
            const results = response.data.choices[0].message.tool_calls;
            const searchResult = _.find(results, { type: 'search_result' });
            if (searchResult === null || searchResult === void 0 ? void 0 : searchResult.search_result) {
                const contents = searchResult === null || searchResult === void 0 ? void 0 : searchResult.search_result;
                const res = [];
                for (const content of contents) {
                    res.push(`title: ${content.title} \n content: ${content.content} \n link: ${content.link} \n media: ${content.media}`);
                }
                return res.map((item, index) => `${index + 1}. ${item}`).join('\n');
            }
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`智谱搜索API请求失败: ${error.message}`);
            }
            throw error;
        }
    }
}
exports.ZhipuSearch = ZhipuSearch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9ub2Rlcy90b29scy9zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQXlEO0FBQ3pELGlDQUEwQjtBQUMxQiw0QkFBNEI7QUFDNUIsNkJBQXdCO0FBWXhCOztHQUVHO0FBQ0gsTUFBYSxXQUFZLFNBQVEsWUFBSTtJQUNuQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFZRCxZQUFZLE1BQU07UUFDaEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBWmhCLFNBQUksR0FBVyxjQUFjLENBQUM7UUFDOUIsZ0JBQVcsR0FDVCw4TUFBOE0sQ0FBQztRQUVqTixXQUFNLEdBQUcsT0FBQzthQUNQLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQzthQUN4QyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7YUFDMUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBTTdCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUU1QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FDYixrSEFBa0gsQ0FDbkgsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBRVMsS0FBSyxDQUFDLEtBQUssQ0FDbkIsS0FBYSxFQUNiLFVBQXNDO1FBRXRDLE1BQU0sR0FBRyxHQUFHLDRDQUE0QyxDQUFDO1FBRXpELE1BQU0sSUFBSSxHQUFHO1lBQ1gsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixNQUFNLEVBQUUsS0FBSztZQUNiLFFBQVEsRUFBRTtnQkFDUjtvQkFDRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsS0FBSztpQkFDZjthQUNGO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO2dCQUMzQyxPQUFPLEVBQUU7b0JBQ1AsYUFBYSxFQUFFLElBQUksQ0FBQyxNQUFNO2lCQUMzQjtnQkFDRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU87YUFDekIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxPQUFPLEdBQVUsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNuRSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLGFBQWEsRUFBRSxDQUFDO2dCQUNoQyxNQUFNLFFBQVEsR0FBRyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsYUFBYSxDQUFDO2dCQUM3QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ2YsS0FBSyxNQUFNLE9BQU8sSUFBSSxRQUFRLEVBQUUsQ0FBQztvQkFDL0IsR0FBRyxDQUFDLElBQUksQ0FDTixVQUFVLE9BQU8sQ0FBQyxLQUFLLGdCQUFnQixPQUFPLENBQUMsT0FBTyxhQUFhLE9BQU8sQ0FBQyxJQUFJLGNBQWMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUM3RyxDQUFDO2dCQUNKLENBQUM7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RFLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLElBQUksZUFBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBckVELGtDQXFFQyJ9