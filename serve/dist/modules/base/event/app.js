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
exports.BaseAppEvent = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
/**
 * 接收事件
 */
let BaseAppEvent = class BaseAppEvent {
    async onServerReady() {
        if (!process['pkg'])
            return;
        const port = this.app.getConfig('koa.port') || 8001;
        this.logger.info(`Server is running at http://127.0.0.1:${port}`);
        const url = `http://127.0.0.1:${port}`;
        // 使用 child_process 打开浏览器
        const { exec } = require('child_process');
        let command;
        switch (process.platform) {
            case 'darwin': // macOS
                command = `open ${url}`;
                break;
            case 'win32': // Windows
                command = `start ${url}`;
                break;
            default: // Linux
                command = `xdg-open ${url}`;
                break;
        }
        console.log('url=>', url);
        exec(command, (error) => {
            if (!error) {
                this.logger.info(`Application has opened in browser at ${url}`);
            }
        });
    }
};
exports.BaseAppEvent = BaseAppEvent;
__decorate([
    (0, core_2.App)(),
    __metadata("design:type", Object)
], BaseAppEvent.prototype, "app", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", Object)
], BaseAppEvent.prototype, "logger", void 0);
__decorate([
    (0, core_1.Event)('onServerReady'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppEvent.prototype, "onServerReady", null);
exports.BaseAppEvent = BaseAppEvent = __decorate([
    (0, core_1.CoolEvent)()
], BaseAppEvent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFzZS9ldmVudC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXFEO0FBQ3JELHlDQUEwRTtBQUUxRTs7R0FFRztBQUVJLElBQU0sWUFBWSxHQUFsQixNQUFNLFlBQVk7SUFRakIsQUFBTixLQUFLLENBQUMsYUFBYTtRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU87UUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sR0FBRyxHQUFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQztRQUV2Qyx5QkFBeUI7UUFDekIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxQyxJQUFJLE9BQU8sQ0FBQztRQUVaLFFBQVEsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLEtBQUssUUFBUSxFQUFFLFFBQVE7Z0JBQ3JCLE9BQU8sR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixNQUFNO1lBQ1IsS0FBSyxPQUFPLEVBQUUsVUFBVTtnQkFDdEIsT0FBTyxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLE1BQU07WUFDUixTQUFTLFFBQVE7Z0JBQ2YsT0FBTyxHQUFHLFlBQVksR0FBRyxFQUFFLENBQUM7Z0JBQzVCLE1BQU07UUFDVixDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNsRSxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQXJDWSxvQ0FBWTtBQUV2QjtJQURDLElBQUEsVUFBRyxHQUFFOzt5Q0FDa0I7QUFHeEI7SUFEQyxJQUFBLGFBQU0sR0FBRTs7NENBQ087QUFHVjtJQURMLElBQUEsWUFBSyxFQUFDLGVBQWUsQ0FBQzs7OztpREE2QnRCO3VCQXBDVSxZQUFZO0lBRHhCLElBQUEsZ0JBQVMsR0FBRTtHQUNDLFlBQVksQ0FxQ3hCIn0=