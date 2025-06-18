"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("./middleware/task");
/**
 * 模块配置
 */
exports.default = () => {
    return {
        // 模块名称
        name: '任务调度',
        // 模块描述
        description: '任务调度模块，支持分布式任务，由redis整个集群的任务',
        // 中间件
        middlewares: [task_1.TaskMiddleware],
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 0,
        // 日志
        log: {
            // 日志保留时间，单位天
            keepDays: 20,
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdGFzay9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBbUQ7QUFFbkQ7O0dBRUc7QUFDSCxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsT0FBTztRQUNMLE9BQU87UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU87UUFDUCxXQUFXLEVBQUUsOEJBQThCO1FBQzNDLE1BQU07UUFDTixXQUFXLEVBQUUsQ0FBQyxxQkFBYyxDQUFDO1FBQzdCLHVCQUF1QjtRQUN2QixLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUs7UUFDTCxHQUFHLEVBQUU7WUFDSCxhQUFhO1lBQ2IsUUFBUSxFQUFFLEVBQUU7U0FDYjtLQUNjLENBQUM7QUFDcEIsQ0FBQyxDQUFDIn0=