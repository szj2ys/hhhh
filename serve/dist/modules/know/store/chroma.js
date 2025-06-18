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
exports.KnowChromaStore = void 0;
const core_1 = require("@midwayjs/core");
const base_1 = require("./base");
const chroma_1 = require("@langchain/community/vectorstores/chroma");
/**
 * 向量数据库
 */
let KnowChromaStore = class KnowChromaStore extends base_1.KnowStoreBase {
    /**
     *
     * @param collection
     * @returns
     */
    async getStore(collectionName) {
        const vectorStore = await chroma_1.Chroma.fromExistingCollection(this.embedding, {
            url: this.chromaConfig.url,
            collectionMetadata: {
                'hnsw:space': this.chromaConfig.distance,
            },
            collectionName,
        });
        vectorStore.index.createCollection;
        return vectorStore;
    }
    /**
     * 创建 | 删除 | 获取集合
     * @param name
     * @param type
     */
    async collection(name, type) {
        let store = await this.getStore(name);
        if (type == 'delete') {
            await store.index.deleteCollection({ name });
        }
        return store;
    }
    /**
     * 插入 | 更新
     * @param collection
     * @param datas
     */
    async upsert(collection, datas) {
        const store = await this.getStore(collection);
        const documents = datas.map(item => {
            return {
                pageContent: item.content,
                metadata: {
                    collection,
                    _id: item.id,
                    ...item,
                },
            };
        });
        await store.addDocuments(documents, {
            ids: documents.map(item => item.metadata._id),
        });
    }
    /**
     * 删除
     * @param collection
     * @param ids
     */
    async remove(collection, ids) {
        const store = await this.getStore(collection);
        await store.collection.delete({
            where: {
                _id: {
                    $in: ids.map(id => id),
                },
            },
        });
    }
};
exports.KnowChromaStore = KnowChromaStore;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], KnowChromaStore.prototype, "app", void 0);
__decorate([
    (0, core_1.Config)('module.know.chroma'),
    __metadata("design:type", Object)
], KnowChromaStore.prototype, "chromaConfig", void 0);
exports.KnowChromaStore = KnowChromaStore = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Prototype)
], KnowChromaStore);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb21hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMva25vdy9zdG9yZS9jaHJvbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBT3dCO0FBQ3hCLGlDQUF1RDtBQUV2RCxxRUFBa0U7QUFFbEU7O0dBRUc7QUFHSSxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFnQixTQUFRLG9CQUFhO0lBWWhEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQXNCO1FBQ25DLE1BQU0sV0FBVyxHQUFHLE1BQU0sZUFBTSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEUsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRztZQUMxQixrQkFBa0IsRUFBRTtnQkFDbEIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUTthQUN6QztZQUNELGNBQWM7U0FDZixDQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBQ25DLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFZLEVBQUUsSUFBaUM7UUFDOUQsSUFBSSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQWtCLEVBQUUsS0FBdUI7UUFDdEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakMsT0FBTztnQkFDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3pCLFFBQVEsRUFBRTtvQkFDUixVQUFVO29CQUNWLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDWixHQUFHLElBQUk7aUJBQ1I7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFO1lBQ2xDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7U0FDOUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQWtCLEVBQUUsR0FBYTtRQUM1QyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUM1QixLQUFLLEVBQUU7Z0JBQ0wsR0FBRyxFQUFFO29CQUNILEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUN2QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUEvRVksMENBQWU7QUFFMUI7SUFEQyxJQUFBLFVBQUcsR0FBRTs7NENBQ2tCO0FBR3hCO0lBREMsSUFBQSxhQUFNLEVBQUMsb0JBQW9CLENBQUM7O3FEQU0zQjswQkFWUyxlQUFlO0lBRjNCLElBQUEsY0FBTyxHQUFFO0lBQ1QsSUFBQSxZQUFLLEVBQUMsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7R0FDZCxlQUFlLENBK0UzQiJ9