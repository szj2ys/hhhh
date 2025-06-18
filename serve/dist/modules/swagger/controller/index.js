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
exports.SwaggerIndexController = void 0;
const core_1 = require("@midwayjs/core");
const builder_1 = require("../builder");
const core_2 = require("@cool-midway/core");
/**
 * 欢迎界面
 */
let SwaggerIndexController = class SwaggerIndexController extends core_2.BaseController {
    async index() {
        if (!this.epsConfig) {
            return this.fail('Eps未开启');
        }
        await this.ctx.render('swagger', {});
    }
    async json() {
        if (!this.epsConfig) {
            return this.fail('Eps未开启');
        }
        return this.swaggerBuilder.json;
    }
};
exports.SwaggerIndexController = SwaggerIndexController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], SwaggerIndexController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", builder_1.SwaggerBuilder)
], SwaggerIndexController.prototype, "swaggerBuilder", void 0);
__decorate([
    (0, core_1.Config)('cool.eps'),
    __metadata("design:type", Boolean)
], SwaggerIndexController.prototype, "epsConfig", void 0);
__decorate([
    (0, core_1.Get)('/', { summary: 'swagger界面' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SwaggerIndexController.prototype, "index", null);
__decorate([
    (0, core_1.Get)('/json', { summary: '获得Swagger JSON数据' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SwaggerIndexController.prototype, "json", null);
exports.SwaggerIndexController = SwaggerIndexController = __decorate([
    (0, core_1.Controller)('/swagger')
], SwaggerIndexController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zd2FnZ2VyL2NvbnRyb2xsZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlFO0FBRWpFLHdDQUE0QztBQUM1Qyw0Q0FBbUQ7QUFFbkQ7O0dBRUc7QUFFSSxJQUFNLHNCQUFzQixHQUE1QixNQUFNLHNCQUF1QixTQUFRLHFCQUFjO0lBVzNDLEFBQU4sS0FBSyxDQUFDLEtBQUs7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUNELE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFHWSxBQUFOLEtBQUssQ0FBQyxJQUFJO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7SUFDbEMsQ0FBQztDQUNGLENBQUE7QUF6Qlksd0RBQXNCO0FBRWpDO0lBREMsSUFBQSxhQUFNLEdBQUU7O21EQUNJO0FBR2I7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTyx3QkFBYzs4REFBQztBQUcvQjtJQURDLElBQUEsYUFBTSxFQUFDLFVBQVUsQ0FBQzs7eURBQ0E7QUFHTjtJQURaLElBQUEsVUFBRyxFQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQzs7OzttREFNbEM7QUFHWTtJQURaLElBQUEsVUFBRyxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxDQUFDOzs7O2tEQU03QztpQ0F4QlUsc0JBQXNCO0lBRGxDLElBQUEsaUJBQVUsRUFBQyxVQUFVLENBQUM7R0FDVixzQkFBc0IsQ0F5QmxDIn0=