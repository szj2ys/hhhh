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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPluginInfoController = void 0;
const core_1 = require("@cool-midway/core");
const info_1 = require("../../entity/info");
const core_2 = require("@midwayjs/core");
const info_2 = require("../../service/info");
/**
 * 插件信息
 */
let AdminPluginInfoController = class AdminPluginInfoController extends core_1.BaseController {
    async install(files, fields) {
        return this.ok(await this.pluginService.install(files[0].data, fields.force));
    }
};
exports.AdminPluginInfoController = AdminPluginInfoController;
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", info_2.PluginService)
], AdminPluginInfoController.prototype, "pluginService", void 0);
__decorate([
    (0, core_1.CoolTag)(core_1.TagTypes.IGNORE_TOKEN),
    (0, core_2.Post)('/install', { summary: '安装插件' }),
    __param(0, (0, core_2.Files)()),
    __param(1, (0, core_2.Fields)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminPluginInfoController.prototype, "install", null);
exports.AdminPluginInfoController = AdminPluginInfoController = __decorate([
    (0, core_1.CoolUrlTag)({
        key: core_1.TagTypes.IGNORE_TOKEN,
        value: [],
    }),
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: info_1.PluginInfoEntity,
        service: info_2.PluginService,
        pageQueryOp: {
            select: [
                'a.id',
                'a.name',
                'a.keyName',
                'a.hook',
                'a.version',
                'a.status',
                'a.readme',
                'a.author',
                'a.logo',
                'a.description',
                'a.pluginJson',
                'a.config',
                'a.createTime',
                'a.updateTime',
            ],
            addOrderBy: {
                id: 'DESC',
            },
        },
    })
], AdminPluginInfoController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3BsdWdpbi9jb250cm9sbGVyL2FkbWluL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBTTJCO0FBQzNCLDRDQUFxRDtBQUNyRCx5Q0FBbUU7QUFDbkUsNkNBQW1EO0FBRW5EOztHQUVHO0FBK0JJLElBQU0seUJBQXlCLEdBQS9CLE1BQU0seUJBQTBCLFNBQVEscUJBQWM7SUFNckQsQUFBTixLQUFLLENBQUMsT0FBTyxDQUFVLEtBQUssRUFBWSxNQUFNO1FBQzVDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FDWixNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUM5RCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFYWSw4REFBeUI7QUFFcEM7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTSxvQkFBYTtnRUFBQztBQUl2QjtJQUZMLElBQUEsY0FBTyxFQUFDLGVBQVEsQ0FBQyxZQUFZLENBQUM7SUFDOUIsSUFBQSxXQUFJLEVBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLFdBQUEsSUFBQSxZQUFLLEdBQUUsQ0FBQTtJQUFTLFdBQUEsSUFBQSxhQUFNLEdBQUUsQ0FBQTs7Ozt3REFJdEM7b0NBVlUseUJBQXlCO0lBOUJyQyxJQUFBLGlCQUFVLEVBQUM7UUFDVixHQUFHLEVBQUUsZUFBUSxDQUFDLFlBQVk7UUFDMUIsS0FBSyxFQUFFLEVBQUU7S0FDVixDQUFDO0lBQ0QsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLHVCQUFnQjtRQUN4QixPQUFPLEVBQUUsb0JBQWE7UUFDdEIsV0FBVyxFQUFFO1lBQ1gsTUFBTSxFQUFFO2dCQUNOLE1BQU07Z0JBQ04sUUFBUTtnQkFDUixXQUFXO2dCQUNYLFFBQVE7Z0JBQ1IsV0FBVztnQkFDWCxVQUFVO2dCQUNWLFVBQVU7Z0JBQ1YsVUFBVTtnQkFDVixRQUFRO2dCQUNSLGVBQWU7Z0JBQ2YsY0FBYztnQkFDZCxVQUFVO2dCQUNWLGNBQWM7Z0JBQ2QsY0FBYzthQUNmO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLEVBQUUsRUFBRSxNQUFNO2FBQ1g7U0FDRjtLQUNGLENBQUM7R0FDVyx5QkFBeUIsQ0FXckMifQ==