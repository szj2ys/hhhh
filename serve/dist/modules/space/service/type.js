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
exports.SpaceTypeService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const type_1 = require("../entity/type");
const info_1 = require("../entity/info");
/**
 * 文件分类
 */
let SpaceTypeService = class SpaceTypeService extends core_2.BaseService {
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        await super.delete(ids);
        // 删除该分类下的文件信息
        await this.spaceInfoEntity.delete({ classifyId: (0, typeorm_2.In)(ids) });
    }
};
exports.SpaceTypeService = SpaceTypeService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(type_1.SpaceTypeEntity),
    __metadata("design:type", typeorm_2.Repository)
], SpaceTypeService.prototype, "spaceTypeEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.SpaceInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], SpaceTypeService.prototype, "spaceInfoEntity", void 0);
exports.SpaceTypeService = SpaceTypeService = __decorate([
    (0, core_1.Provide)()
], SpaceTypeService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3NwYWNlL3NlcnZpY2UvdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsNENBQWdEO0FBQ2hELCtDQUFzRDtBQUN0RCxxQ0FBeUM7QUFDekMseUNBQWlEO0FBQ2pELHlDQUFpRDtBQUVqRDs7R0FFRztBQUVJLElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQWlCLFNBQVEsa0JBQVc7SUFPL0M7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFRO1FBQ25CLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixjQUFjO1FBQ2QsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFBLFlBQUUsRUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGLENBQUE7QUFoQlksNENBQWdCO0FBRTNCO0lBREMsSUFBQSwyQkFBaUIsRUFBQyxzQkFBZSxDQUFDOzhCQUNsQixvQkFBVTt5REFBa0I7QUFHN0M7SUFEQyxJQUFBLDJCQUFpQixFQUFDLHNCQUFlLENBQUM7OEJBQ2xCLG9CQUFVO3lEQUFrQjsyQkFMbEMsZ0JBQWdCO0lBRDVCLElBQUEsY0FBTyxHQUFFO0dBQ0csZ0JBQWdCLENBZ0I1QiJ9