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
exports.FlowDataService = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const data_1 = require("../entity/data");
const info_1 = require("../entity/info");
/**
 * 流程数据
 */
let FlowDataService = class FlowDataService extends core_1.BaseService {
    async init() {
        await super.init();
        this.setEntity(this.flowDataEntity);
    }
    /**
     * 设置数据
     * @param flowId
     * @param objectId
     * @param data
     */
    async set(flowId, objectId, data) {
        const check = await this.flowDataEntity.findOneBy({
            flowId: (0, typeorm_2.Equal)(flowId),
            objectId: (0, typeorm_2.Equal)(objectId),
        });
        if (check) {
            await this.flowDataEntity.update(check.id, { data });
        }
        else {
            await this.flowDataEntity.save({ flowId, objectId, data });
        }
    }
    /**
     * 获取数据
     * @param flowId
     * @param objectId
     */
    async get(flowId, objectId) {
        const data = await this.flowDataEntity.findOneBy({
            flowId: (0, typeorm_2.Equal)(flowId),
            objectId: (0, typeorm_2.Equal)(objectId),
        });
        return data === null || data === void 0 ? void 0 : data.data;
    }
    /**
     * 获取数据
     * @param flowId
     * @param objectId
     */
    async getByLabel(label, objectId) {
        const flow = await this.flowInfoEntity.findOneBy({
            label: (0, typeorm_2.Equal)(label),
        });
        if (!flow) {
            return null;
        }
        const data = await this.flowDataEntity.findOneBy({
            flowId: (0, typeorm_2.Equal)(flow.id),
            objectId: (0, typeorm_2.Equal)(objectId),
        });
        return data === null || data === void 0 ? void 0 : data.data;
    }
};
exports.FlowDataService = FlowDataService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(data_1.FlowDataEntity),
    __metadata("design:type", typeorm_2.Repository)
], FlowDataService.prototype, "flowDataEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.FlowInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], FlowDataService.prototype, "flowInfoEntity", void 0);
__decorate([
    (0, core_2.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlowDataService.prototype, "init", null);
exports.FlowDataService = FlowDataService = __decorate([
    (0, core_2.Provide)()
], FlowDataService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvc2VydmljZS9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFnRDtBQUNoRCx5Q0FBK0M7QUFDL0MsK0NBQXNEO0FBQ3RELHFDQUE0QztBQUM1Qyx5Q0FBZ0Q7QUFDaEQseUNBQWdEO0FBRWhEOztHQUVHO0FBRUksSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZ0IsU0FBUSxrQkFBVztJQVF4QyxBQUFOLEtBQUssQ0FBQyxJQUFJO1FBQ1IsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxJQUFTO1FBQ25ELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDaEQsTUFBTSxFQUFFLElBQUEsZUFBSyxFQUFDLE1BQU0sQ0FBQztZQUNyQixRQUFRLEVBQUUsSUFBQSxlQUFLLEVBQUMsUUFBUSxDQUFDO1NBQzFCLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM3RCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUN4QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQy9DLE1BQU0sRUFBRSxJQUFBLGVBQUssRUFBQyxNQUFNLENBQUM7WUFDckIsUUFBUSxFQUFFLElBQUEsZUFBSyxFQUFDLFFBQVEsQ0FBQztTQUMxQixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUM5QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQy9DLEtBQUssRUFBRSxJQUFBLGVBQUssRUFBQyxLQUFLLENBQUM7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUMvQyxNQUFNLEVBQUUsSUFBQSxlQUFLLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN0QixRQUFRLEVBQUUsSUFBQSxlQUFLLEVBQUMsUUFBUSxDQUFDO1NBQzFCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLElBQUksQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQTtBQTlEWSwwQ0FBZTtBQUUxQjtJQURDLElBQUEsMkJBQWlCLEVBQUMscUJBQWMsQ0FBQzs4QkFDbEIsb0JBQVU7dURBQWlCO0FBRzNDO0lBREMsSUFBQSwyQkFBaUIsRUFBQyxxQkFBYyxDQUFDOzhCQUNsQixvQkFBVTt1REFBaUI7QUFHckM7SUFETCxJQUFBLFdBQUksR0FBRTs7OzsyQ0FJTjswQkFYVSxlQUFlO0lBRDNCLElBQUEsY0FBTyxHQUFFO0dBQ0csZUFBZSxDQThEM0IifQ==