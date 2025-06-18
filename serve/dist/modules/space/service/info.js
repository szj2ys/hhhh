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
exports.SpaceInfoService = void 0;
const info_1 = require("./../entity/info");
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const info_2 = require("../../plugin/service/info");
/**
 * 文件信息
 */
let SpaceInfoService = class SpaceInfoService extends core_2.BaseService {
    /**
     * 新增
     */
    async add(param) {
        const result = await this.pluginService.invoke('upload', 'getMode');
        const config = await this.pluginService.getConfig('upload');
        if (result.mode == core_2.MODETYPE.LOCAL) {
            param.key = param.url.replace(config.domain, '');
        }
        return super.add(param);
    }
};
exports.SpaceInfoService = SpaceInfoService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.SpaceInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], SpaceInfoService.prototype, "spaceInfoEntity", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_2.PluginService)
], SpaceInfoService.prototype, "pluginService", void 0);
exports.SpaceInfoService = SpaceInfoService = __decorate([
    (0, core_1.Provide)()
], SpaceInfoService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NwYWNlL3NlcnZpY2UvaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBbUQ7QUFDbkQseUNBQWlEO0FBQ2pELDRDQUEwRDtBQUMxRCwrQ0FBc0Q7QUFDdEQscUNBQXFDO0FBQ3JDLG9EQUEwRDtBQUUxRDs7R0FFRztBQUVJLElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQWlCLFNBQVEsa0JBQVc7SUFPL0M7O09BRUc7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUs7UUFDYixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxlQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUE7QUFsQlksNENBQWdCO0FBRTNCO0lBREMsSUFBQSwyQkFBaUIsRUFBQyxzQkFBZSxDQUFDOzhCQUNsQixvQkFBVTt5REFBa0I7QUFHN0M7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTSxvQkFBYTt1REFBQzsyQkFMbEIsZ0JBQWdCO0lBRDVCLElBQUEsY0FBTyxHQUFFO0dBQ0csZ0JBQWdCLENBa0I1QiJ9