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
exports.BaseSysMenuController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const menu_1 = require("../../../entity/sys/menu");
const menu_2 = require("../../../service/sys/menu");
/**
 * 菜单
 */
let BaseSysMenuController = class BaseSysMenuController extends core_2.BaseController {
    async parse(entity, controller, module) {
        return this.ok(await this.baseSysMenuService.parse(entity, controller, module));
    }
    async create(body) {
        await this.baseSysMenuService.create(body);
        return this.ok();
    }
    async export(ids) {
        return this.ok(await this.baseSysMenuService.export(ids));
    }
    async import(menus) {
        await this.baseSysMenuService.import(menus);
        return this.ok();
    }
};
exports.BaseSysMenuController = BaseSysMenuController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", menu_2.BaseSysMenuService)
], BaseSysMenuController.prototype, "baseSysMenuService", void 0);
__decorate([
    (0, core_1.Post)('/parse', { summary: '解析' }),
    __param(0, (0, core_1.Body)('entity')),
    __param(1, (0, core_1.Body)('controller')),
    __param(2, (0, core_1.Body)('module')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BaseSysMenuController.prototype, "parse", null);
__decorate([
    (0, core_1.Post)('/create', { summary: '创建代码' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseSysMenuController.prototype, "create", null);
__decorate([
    (0, core_1.Post)('/export', { summary: '导出' }),
    __param(0, (0, core_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BaseSysMenuController.prototype, "export", null);
__decorate([
    (0, core_1.Post)('/import', { summary: '导入' }),
    __param(0, (0, core_1.Body)('menus')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BaseSysMenuController.prototype, "import", null);
exports.BaseSysMenuController = BaseSysMenuController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: menu_1.BaseSysMenuEntity,
        service: menu_2.BaseSysMenuService,
    })
], BaseSysMenuController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hZG1pbi9zeXMvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkQ7QUFDN0QsNENBQW1FO0FBQ25FLG1EQUE2RDtBQUM3RCxvREFBK0Q7QUFFL0Q7O0dBRUc7QUFPSSxJQUFNLHFCQUFxQixHQUEzQixNQUFNLHFCQUFzQixTQUFRLHFCQUFjO0lBS2pELEFBQU4sS0FBSyxDQUFDLEtBQUssQ0FDTyxNQUFjLEVBQ1YsVUFBa0IsRUFDdEIsTUFBYztRQUU5QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQ1osTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQ2hFLENBQUM7SUFDSixDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsTUFBTSxDQUFTLElBQUk7UUFDdkIsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxNQUFNLENBQWMsR0FBYTtRQUNyQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLE1BQU0sQ0FBZ0IsS0FBWTtRQUN0QyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNGLENBQUE7QUEvQlksc0RBQXFCO0FBRWhDO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1cseUJBQWtCO2lFQUFDO0FBR2pDO0lBREwsSUFBQSxXQUFJLEVBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBRS9CLFdBQUEsSUFBQSxXQUFJLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDZCxXQUFBLElBQUEsV0FBSSxFQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2xCLFdBQUEsSUFBQSxXQUFJLEVBQUMsUUFBUSxDQUFDLENBQUE7Ozs7a0RBS2hCO0FBR0s7SUFETCxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDdkIsV0FBQSxJQUFBLFdBQUksR0FBRSxDQUFBOzs7O21EQUduQjtBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3JCLFdBQUEsSUFBQSxXQUFJLEVBQUMsS0FBSyxDQUFDLENBQUE7Ozs7bURBRXhCO0FBR0s7SUFETCxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDckIsV0FBQSxJQUFBLFdBQUksRUFBQyxPQUFPLENBQUMsQ0FBQTs7OzttREFHMUI7Z0NBOUJVLHFCQUFxQjtJQU5qQyxJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSx3QkFBaUI7UUFDekIsT0FBTyxFQUFFLHlCQUFrQjtLQUM1QixDQUFDO0dBQ1cscUJBQXFCLENBK0JqQyJ9