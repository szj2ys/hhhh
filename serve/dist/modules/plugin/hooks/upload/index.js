"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = exports.CoolPlugin = void 0;
const interface_1 = require("./interface");
const base_1 = require("../base");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const uuid_1 = require("uuid");
const core_1 = require("@cool-midway/core");
const _ = require("lodash");
const path_1 = require("../../../../comm/path");
/**
 * 文件上传
 */
class CoolPlugin extends base_1.BasePluginHook {
    /**
     * 获得上传模式
     * @returns
     */
    async getMode() {
        return {
            mode: interface_1.MODETYPE.LOCAL,
            type: interface_1.MODETYPE.LOCAL,
        };
    }
    /**
     * 获得原始操作对象
     * @returns
     */
    async getMetaFileObj() {
        return;
    }
    /**
     * 下载并上传
     * @param url
     * @param fileName
     */
    async downAndUpload(url, fileName) {
        const { domain } = this.pluginInfo.config;
        // 从url获取扩展名
        const extend = path.extname(url);
        const download = require('download');
        // 数据
        const data = url.includes('http')
            ? await download(url)
            : fs.readFileSync(url);
        // 创建文件夹
        const dirPath = path.join((0, path_1.pUploadPath)(), `${moment().format('YYYYMMDD')}`);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const uuidStr = (0, uuid_1.v1)();
        const name = `${moment().format('YYYYMMDD')}/${fileName ? fileName : uuidStr + extend}`;
        fs.writeFileSync(`${dirPath}/${fileName ? fileName : (0, uuid_1.v1)() + extend}`, data);
        return `${domain}/upload/${name}`;
    }
    /**
     * 指定Key(路径)上传，本地文件上传到存储服务
     * @param filePath 文件路径
     * @param key 路径一致会覆盖源文件
     */
    async uploadWithKey(filePath, key) {
        const { domain } = this.pluginInfo.config;
        const data = fs.readFileSync(filePath);
        fs.writeFileSync(path.join(this.app.getBaseDir(), '..', key), data);
        return domain + key;
    }
    /**
     * 上传文件
     * @param ctx
     * @param key 文件路径
     */
    async upload(ctx) {
        const { domain } = this.pluginInfo.config;
        try {
            const { key } = ctx.fields;
            if (key &&
                (key.includes('..') ||
                    key.includes('./') ||
                    key.includes('\\') ||
                    key.includes('//'))) {
                throw new core_1.CoolCommException('非法的key值');
            }
            if (_.isEmpty(ctx.files)) {
                throw new core_1.CoolCommException('上传文件为空');
            }
            const basePath = (0, path_1.pUploadPath)();
            const file = ctx.files[0];
            const extension = file.filename.split('.').pop();
            const name = moment().format('YYYYMMDD') + '/' + (key || `${(0, uuid_1.v1)()}.${extension}`);
            const target = path.join(basePath, name);
            const dirPath = path.join(basePath, moment().format('YYYYMMDD'));
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            const data = fs.readFileSync(file.data);
            fs.writeFileSync(target, data);
            return domain + '/upload/' + name;
        }
        catch (err) {
            console.error(err);
            throw new core_1.CoolCommException('上传失败' + err.message);
        }
    }
}
exports.CoolPlugin = CoolPlugin;
// 导出插件实例， Plugin名称不可修改
exports.Plugin = CoolPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wbHVnaW4vaG9va3MvdXBsb2FkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFtRDtBQUNuRCxrQ0FBeUM7QUFDekMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsK0JBQWtDO0FBQ2xDLDRDQUFzRDtBQUN0RCw0QkFBNEI7QUFDNUIsZ0RBQW9EO0FBRXBEOztHQUVHO0FBQ0gsTUFBYSxVQUFXLFNBQVEscUJBQWM7SUFDNUM7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLG9CQUFRLENBQUMsS0FBSztZQUNwQixJQUFJLEVBQUUsb0JBQVEsQ0FBQyxLQUFLO1NBQ3JCLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGNBQWM7UUFDbEIsT0FBTztJQUNULENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFXLEVBQUUsUUFBaUI7UUFDaEQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzFDLFlBQVk7UUFDWixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxLQUFLO1FBQ0wsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDL0IsQ0FBQyxDQUFDLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixRQUFRO1FBQ1IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLGtCQUFXLEdBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUM1QixFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFBLFNBQUksR0FBRSxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUN6QyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLE1BQ2xDLEVBQUUsQ0FBQztRQUNILEVBQUUsQ0FBQyxhQUFhLENBQ2QsR0FBRyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUEsU0FBSSxHQUFFLEdBQUcsTUFBTSxFQUFFLEVBQ3JELElBQUksQ0FDTCxDQUFDO1FBQ0YsT0FBTyxHQUFHLE1BQU0sV0FBVyxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBYSxFQUFFLEdBQVE7UUFDekMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBUTtRQUNuQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDMUMsSUFBSSxDQUFDO1lBQ0gsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDM0IsSUFDRSxHQUFHO2dCQUNILENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNsQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDbEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNyQixDQUFDO2dCQUNELE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN6QixNQUFNLElBQUksd0JBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUNELE1BQU0sUUFBUSxHQUFHLElBQUEsa0JBQVcsR0FBRSxDQUFDO1lBRS9CLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDakQsTUFBTSxJQUFJLEdBQ1IsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUEsU0FBSSxHQUFFLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN4RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUM1QixFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQixPQUFPLE1BQU0sR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixNQUFNLElBQUksd0JBQWlCLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBdEdELGdDQXNHQztBQUVELHVCQUF1QjtBQUNWLFFBQUEsTUFBTSxHQUFHLFVBQVUsQ0FBQyJ9