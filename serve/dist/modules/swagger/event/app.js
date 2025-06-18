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
exports.SwaggerAppEvent = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const builder_1 = require("../builder");
/**
 * 修改jwt.secret
 */
let SwaggerAppEvent = class SwaggerAppEvent {
    async onServerReady() {
        this.swaggerBuilder.init().then(() => {
            this.coreLogger.info('\x1B[36m [cool:module:swagger] midwayjs cool module swagger build success\x1B[0m');
        });
    }
};
exports.SwaggerAppEvent = SwaggerAppEvent;
__decorate([
    (0, core_2.Logger)(),
    __metadata("design:type", Object)
], SwaggerAppEvent.prototype, "coreLogger", void 0);
__decorate([
    (0, core_2.App)(),
    __metadata("design:type", Object)
], SwaggerAppEvent.prototype, "app", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", builder_1.SwaggerBuilder)
], SwaggerAppEvent.prototype, "swaggerBuilder", void 0);
__decorate([
    (0, core_1.Event)('onServerReady'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SwaggerAppEvent.prototype, "onServerReady", null);
exports.SwaggerAppEvent = SwaggerAppEvent = __decorate([
    (0, core_1.CoolEvent)()
], SwaggerAppEvent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvc3dhZ2dlci9ldmVudC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXFEO0FBQ3JELHlDQUE4RDtBQUU5RCx3Q0FBNEM7QUFFNUM7O0dBRUc7QUFFSSxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0lBV3BCLEFBQU4sS0FBSyxDQUFDLGFBQWE7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNsQixrRkFBa0YsQ0FDbkYsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUFsQlksMENBQWU7QUFFMUI7SUFEQyxJQUFBLGFBQU0sR0FBRTs7bURBQ1c7QUFHcEI7SUFEQyxJQUFBLFVBQUcsR0FBRTs7NENBQ3FCO0FBRzNCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ08sd0JBQWM7dURBQUM7QUFHekI7SUFETCxJQUFBLFlBQUssRUFBQyxlQUFlLENBQUM7Ozs7b0RBT3RCOzBCQWpCVSxlQUFlO0lBRDNCLElBQUEsZ0JBQVMsR0FBRTtHQUNDLGVBQWUsQ0FrQjNCIn0=