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
exports.DemoCacheService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
/**
 * 缓存
 */
let DemoCacheService = class DemoCacheService {
    // 数据缓存5秒
    async get() {
        console.log('执行方法');
        return {
            a: 1,
            b: 2,
        };
    }
};
exports.DemoCacheService = DemoCacheService;
__decorate([
    (0, core_2.CoolCache)(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoCacheService.prototype, "get", null);
exports.DemoCacheService = DemoCacheService = __decorate([
    (0, core_1.Provide)()
], DemoCacheService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL3NlcnZpY2UvY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXlDO0FBQ3pDLDRDQUE4QztBQUU5Qzs7R0FFRztBQUVJLElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQWdCO0lBQzNCLFNBQVM7SUFFSCxBQUFOLEtBQUssQ0FBQyxHQUFHO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixPQUFPO1lBQ0wsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQVZZLDRDQUFnQjtBQUdyQjtJQURMLElBQUEsZ0JBQVMsRUFBQyxJQUFJLENBQUM7Ozs7MkNBT2Y7MkJBVFUsZ0JBQWdCO0lBRDVCLElBQUEsY0FBTyxHQUFFO0dBQ0csZ0JBQWdCLENBVTVCIn0=