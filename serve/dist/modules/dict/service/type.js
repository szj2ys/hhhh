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
exports.DictTypeService = void 0;
const info_1 = require("./../entity/info");
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
/**
 * 描述
 */
let DictTypeService = class DictTypeService extends core_2.BaseService {
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        await super.delete(ids);
        await this.dictInfoEntity.delete({
            typeId: (0, typeorm_2.In)(ids),
        });
    }
};
exports.DictTypeService = DictTypeService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.DictInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], DictTypeService.prototype, "dictInfoEntity", void 0);
exports.DictTypeService = DictTypeService = __decorate([
    (0, core_1.Provide)()
], DictTypeService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RpY3Qvc2VydmljZS90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFrRDtBQUNsRCx5Q0FBeUM7QUFDekMsNENBQWdEO0FBQ2hELCtDQUFzRDtBQUN0RCxxQ0FBeUM7QUFFekM7O0dBRUc7QUFFSSxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFnQixTQUFRLGtCQUFXO0lBSTlDOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztRQUNkLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQy9CLE1BQU0sRUFBRSxJQUFBLFlBQUUsRUFBQyxHQUFHLENBQUM7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUFkWSwwQ0FBZTtBQUUxQjtJQURDLElBQUEsMkJBQWlCLEVBQUMscUJBQWMsQ0FBQzs4QkFDbEIsb0JBQVU7dURBQWlCOzBCQUZoQyxlQUFlO0lBRDNCLElBQUEsY0FBTyxHQUFFO0dBQ0csZUFBZSxDQWMzQiJ9