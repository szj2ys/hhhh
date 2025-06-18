"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pCachePath = exports.pSqlitePath = exports.pPluginPath = exports.pUploadPath = exports.pDataPath = void 0;
const path = require("path");
const os = require("os");
const md5 = require("md5");
const fs = require("fs");
/**
 * 获得配置文件中的 keys
 * @returns
 */
const getKeys = () => {
    var _a;
    const configFile = path.join(__dirname, '../config/config.default.js');
    const configContent = fs.readFileSync(configFile, 'utf8');
    const keys = (_a = configContent.match(/keys: '([^']+)'/)) === null || _a === void 0 ? void 0 : _a[1];
    return keys;
};
/**
 * 项目数据目录
 * @returns
 */
const pDataPath = () => {
    const dirPath = path.join(os.homedir(), '.ipd-admin', md5(getKeys()));
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    return dirPath;
};
exports.pDataPath = pDataPath;
/**
 * 上传目录
 * @returns
 */
const pUploadPath = () => {
    const uploadPath = path.join((0, exports.pDataPath)(), 'upload');
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    return uploadPath;
};
exports.pUploadPath = pUploadPath;
/**
 * 插件目录
 * @returns
 */
const pPluginPath = () => {
    const pluginPath = path.join((0, exports.pDataPath)(), 'plugin');
    if (!fs.existsSync(pluginPath)) {
        fs.mkdirSync(pluginPath, { recursive: true });
    }
    return pluginPath;
};
exports.pPluginPath = pPluginPath;
/**
 * sqlite 数据库文件
 */
const pSqlitePath = () => {
    return path.join((0, exports.pDataPath)(), 'cool.sqlite');
};
exports.pSqlitePath = pSqlitePath;
/**
 * 缓存目录
 * @returns
 */
const pCachePath = () => {
    return path.join((0, exports.pDataPath)(), 'cache');
};
exports.pCachePath = pCachePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tL3BhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QiwyQkFBMkI7QUFDM0IseUJBQXlCO0FBRXpCOzs7R0FHRztBQUNILE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTs7SUFDbkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUN2RSxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRCxNQUFNLElBQUksR0FBRyxNQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsMENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFFRjs7O0dBR0c7QUFDSSxNQUFNLFNBQVMsR0FBRyxHQUFHLEVBQUU7SUFDNUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUM1QixFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFOVyxRQUFBLFNBQVMsYUFNcEI7QUFFRjs7O0dBR0c7QUFDSSxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7SUFDOUIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLGlCQUFTLEdBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQU5XLFFBQUEsV0FBVyxlQU10QjtBQUVGOzs7R0FHRztBQUNJLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUM5QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsaUJBQVMsR0FBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDL0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBTlcsUUFBQSxXQUFXLGVBTXRCO0FBRUY7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7SUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsaUJBQVMsR0FBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQztBQUZXLFFBQUEsV0FBVyxlQUV0QjtBQUVGOzs7R0FHRztBQUNJLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtJQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxpQkFBUyxHQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRlcsUUFBQSxVQUFVLGNBRXJCIn0=