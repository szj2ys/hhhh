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
exports.KnowStore = exports.StoreType = void 0;
const core_1 = require("@midwayjs/core");
const type_1 = require("../service/data/type");
// import { KnowFaissStore } from './faiss';
/**
 * 存储器类型
 */
exports.StoreType = {
    // Chroma 存储， 云端存储， 需要安装 Chroma 服务
    chroma: 'knowChromaStore',
    // Faiss 存储， 本地存储， 需要安装 Faiss 服务
    // faiss: 'knowFaissStore',
    // PG 存储， 本地存储， 需要安装 PG 服务
    pg: 'knowPgStore',
};
/**
 * 存储器
 */
let KnowStore = class KnowStore {
    /**
     * 获得存储器
     * @param collectionId
     */
    async get(collectionId) {
        const embedding = await this.knowDataTypeService.getEmbedding(collectionId);
        const store = await this.app
            .getApplicationContext()
            .getAsync(exports.StoreType[this.store]);
        store.set(embedding);
        return store;
    }
};
exports.KnowStore = KnowStore;
__decorate([
    (0, core_1.Config)('module.know.store'),
    __metadata("design:type", String)
], KnowStore.prototype, "store", void 0);
__decorate([
    (0, core_1.Config)('module.know.prefix'),
    __metadata("design:type", String)
], KnowStore.prototype, "prefix", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", type_1.KnowDataTypeService)
], KnowStore.prototype, "knowDataTypeService", void 0);
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], KnowStore.prototype, "app", void 0);
exports.KnowStore = KnowStore = __decorate([
    (0, core_1.Provide)()
], KnowStore);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQU13QjtBQUV4QiwrQ0FBMkQ7QUFDM0QsNENBQTRDO0FBRTVDOztHQUVHO0FBQ1UsUUFBQSxTQUFTLEdBQUc7SUFDdkIsa0NBQWtDO0lBQ2xDLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsZ0NBQWdDO0lBQ2hDLDJCQUEyQjtJQUMzQiwwQkFBMEI7SUFDMUIsRUFBRSxFQUFFLGFBQWE7Q0FDVCxDQUFDO0FBS1g7O0dBRUc7QUFFSSxJQUFNLFNBQVMsR0FBZixNQUFNLFNBQVM7SUFhcEI7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFvQjtRQUM1QixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRzthQUN6QixxQkFBcUIsRUFBRTthQUN2QixRQUFRLENBQWdCLGlCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRixDQUFBO0FBekJZLDhCQUFTO0FBRXBCO0lBREMsSUFBQSxhQUFNLEVBQUMsbUJBQW1CLENBQUM7O3dDQUNWO0FBR2xCO0lBREMsSUFBQSxhQUFNLEVBQUMsb0JBQW9CLENBQUM7O3lDQUNkO0FBR2Y7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDWSwwQkFBbUI7c0RBQUM7QUFHekM7SUFEQyxJQUFBLFVBQUcsR0FBRTs7c0NBQ2tCO29CQVhiLFNBQVM7SUFEckIsSUFBQSxjQUFPLEdBQUU7R0FDRyxTQUFTLENBeUJyQiJ9