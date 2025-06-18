"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availablePort = availablePort;
const child_process_1 = require("child_process");
/**
 * 同步检查端口是否可用（通过系统命令）
 * @param {number} port - 要检查的端口
 * @returns {boolean} - 是否可用
 */
function isPortAvailableSync(port) {
    try {
        if (process.platform === 'win32') {
            // Windows 使用 netstat 检查端口，排除 TIME_WAIT 状态
            const result = (0, child_process_1.execSync)(`netstat -ano | findstr :${port}`, {
                encoding: 'utf-8',
            });
            // 如果端口只处于 TIME_WAIT 状态，则认为端口可用
            return !result || result.toLowerCase().includes('time_wait');
        }
        else {
            // Linux/Mac 使用 lsof 检查端口，只检查 LISTEN 状态
            const result = (0, child_process_1.execSync)(`lsof -i :${port} -sTCP:LISTEN`, {
                encoding: 'utf-8',
            });
            return !result;
        }
    }
    catch (error) {
        // 命令执行失败，端口可用
        return true;
    }
}
/**
 * 查找可用端口（同步）
 * @param {number} startPort - 起始端口
 * @returns {number} - 可用的端口
 */
function availablePort(startPort) {
    if (!process['pkg'])
        return startPort;
    let port = startPort;
    while (port <= 8010) {
        if (isPortAvailableSync(port)) {
            if (port !== startPort) {
                console.warn('\x1b[33m%s\x1b[0m', `Port ${startPort} is occupied, using port ${port}`);
            }
            return port;
        }
        port++;
    }
    return 8001;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tL3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFrQ0Esc0NBZ0JDO0FBbERELGlEQUF5QztBQUV6Qzs7OztHQUlHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxJQUFZO0lBQ3ZDLElBQUksQ0FBQztRQUNILElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUNqQywwQ0FBMEM7WUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBQSx3QkFBUSxFQUFDLDJCQUEyQixJQUFJLEVBQUUsRUFBRTtnQkFDekQsUUFBUSxFQUFFLE9BQU87YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsK0JBQStCO1lBQy9CLE9BQU8sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvRCxDQUFDO2FBQU0sQ0FBQztZQUNOLHVDQUF1QztZQUN2QyxNQUFNLE1BQU0sR0FBRyxJQUFBLHdCQUFRLEVBQUMsWUFBWSxJQUFJLGVBQWUsRUFBRTtnQkFDdkQsUUFBUSxFQUFFLE9BQU87YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNqQixDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixhQUFhLENBQUMsU0FBaUI7SUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFBRSxPQUFPLFNBQVMsQ0FBQztJQUN0QyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUM7SUFDckIsT0FBTyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzlCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUN2QixPQUFPLENBQUMsSUFBSSxDQUNWLG1CQUFtQixFQUNuQixRQUFRLFNBQVMsNEJBQTRCLElBQUksRUFBRSxDQUNwRCxDQUFDO1lBQ0osQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyJ9