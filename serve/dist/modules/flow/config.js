"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 模块配置
 */
exports.default = () => {
    return {
        // 模块名称
        name: '流程编排',
        // 模块描述
        description: '流程管理、编排、调试、执行',
        // 中间件，只对本模块有效
        middlewares: [],
        // 中间件，全局有效
        globalMiddlewares: [],
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 0,
        // 清理
        clear: {
            // 清理流程结果, 保留2天
            result: 2,
            // 清理流程日志, 保留10天
            log: 10,
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvZmxvdy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7R0FFRztBQUNILGtCQUFlLEdBQUcsRUFBRTtJQUNsQixPQUFPO1FBQ0wsT0FBTztRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTztRQUNQLFdBQVcsRUFBRSxlQUFlO1FBQzVCLGNBQWM7UUFDZCxXQUFXLEVBQUUsRUFBRTtRQUNmLFdBQVc7UUFDWCxpQkFBaUIsRUFBRSxFQUFFO1FBQ3JCLHVCQUF1QjtRQUN2QixLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUs7UUFDTCxLQUFLLEVBQUU7WUFDTCxlQUFlO1lBQ2YsTUFBTSxFQUFFLENBQUM7WUFDVCxnQkFBZ0I7WUFDaEIsR0FBRyxFQUFFLEVBQUU7U0FDUjtLQUNjLENBQUM7QUFDcEIsQ0FBQyxDQUFDIn0=