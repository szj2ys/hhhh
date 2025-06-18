"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePluginHook = void 0;
/**
 * hook基类
 */
class BasePluginHook {
    /**
     * 初始化
     */
    async init(pluginInfo, ctx, app) {
        this.pluginInfo = pluginInfo;
        this.ctx = ctx;
        this.app = app;
    }
}
exports.BasePluginHook = BasePluginHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3BsdWdpbi9ob29rcy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBOztHQUVHO0FBQ0gsTUFBYSxjQUFjO0lBT3pCOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FDUixVQUFzQixFQUN0QixHQUFvQixFQUNwQixHQUF3QjtRQUV4QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQW5CRCx3Q0FtQkMifQ==