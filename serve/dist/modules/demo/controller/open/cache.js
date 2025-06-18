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
exports.OpenDemoCacheController = void 0;
const cache_1 = require("../../service/cache");
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const cache_manager_1 = require("@midwayjs/cache-manager");
/**
 * 缓存
 */
let OpenDemoCacheController = class OpenDemoCacheController extends core_2.BaseController {
    /**
     * 设置缓存
     * @returns
     */
    async set() {
        await this.midwayCache.set('a', 1);
        // 缓存10秒
        await this.midwayCache.set('a', 1, 10 * 1000);
        return this.ok(await this.midwayCache.get('a'));
    }
    /**
     * 获得缓存
     * @returns
     */
    async get() {
        return this.ok(await this.demoCacheService.get());
    }
};
exports.OpenDemoCacheController = OpenDemoCacheController;
__decorate([
    (0, core_1.InjectClient)(cache_manager_1.CachingFactory, 'default'),
    __metadata("design:type", Object)
], OpenDemoCacheController.prototype, "midwayCache", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", cache_1.DemoCacheService)
], OpenDemoCacheController.prototype, "demoCacheService", void 0);
__decorate([
    (0, core_1.Post)('/set', { summary: '设置缓存' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoCacheController.prototype, "set", null);
__decorate([
    (0, core_1.Get)('/get', { summary: '获得缓存' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenDemoCacheController.prototype, "get", null);
exports.OpenDemoCacheController = OpenDemoCacheController = __decorate([
    (0, core_2.CoolController)()
], OpenDemoCacheController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvb3Blbi9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBdUQ7QUFDdkQseUNBQTBFO0FBQzFFLDRDQUFtRTtBQUNuRSwyREFBc0U7QUFFdEU7O0dBRUc7QUFFSSxJQUFNLHVCQUF1QixHQUE3QixNQUFNLHVCQUF3QixTQUFRLHFCQUFjO0lBT3pEOzs7T0FHRztJQUVHLEFBQU4sS0FBSyxDQUFDLEdBQUc7UUFDUCxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxRQUFRO1FBQ1IsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFFRyxBQUFOLEtBQUssQ0FBQyxHQUFHO1FBQ1AsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNGLENBQUE7QUEzQlksMERBQXVCO0FBRWxDO0lBREMsSUFBQSxtQkFBWSxFQUFDLDhCQUFjLEVBQUUsU0FBUyxDQUFDOzs0REFDZjtBQUd6QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNTLHdCQUFnQjtpRUFBQztBQU83QjtJQURMLElBQUEsV0FBSSxFQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7OztrREFNakM7QUFPSztJQURMLElBQUEsVUFBRyxFQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7OztrREFHaEM7a0NBMUJVLHVCQUF1QjtJQURuQyxJQUFBLHFCQUFjLEdBQUU7R0FDSix1QkFBdUIsQ0EyQm5DIn0=