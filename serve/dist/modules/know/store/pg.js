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
exports.KnowPgStore = void 0;
const core_1 = require("@midwayjs/core");
const base_1 = require("./base");
const documents_1 = require("@langchain/core/documents");
const pgvector_1 = require("@langchain/community/vectorstores/pgvector");
const core_2 = require("@cool-midway/core");
/**
 * PG向量数据库
 */
let KnowPgStore = class KnowPgStore extends base_1.KnowStoreBase {
    /**
     * 获取存储器
     * @param collection 集合名称
     * @returns VectorStore实例
     */
    async getStore(collection) {
        await this.collection(collection, 'get');
        return this.store;
    }
    /**
     * 操作集合
     * @param name 集合名称
     * @param type 操作类型
     */
    async collection(name, type) {
        if (type == 'get' || 'create') {
            if (this.connConfig.type != 'postgres') {
                throw new core_2.CoolCommException('PG向量数据库只支持postgres数据库');
            }
            if (this.store) {
                return this.store;
            }
            const config = {
                postgresConnectionOptions: {
                    type: this.connConfig.type,
                    host: this.connConfig.host,
                    port: this.connConfig.port,
                    user: this.connConfig.username,
                    password: this.connConfig.password,
                    database: this.connConfig.database,
                },
                tableName: 'know_pg_store',
                columns: {
                    idColumnName: 'id',
                    vectorColumnName: 'vector',
                    contentColumnName: 'content',
                    metadataColumnName: 'metadata',
                },
                ...this.pgConfig,
            };
            this.store = await pgvector_1.PGVectorStore.initialize(this.embedding, config);
            return this.store;
        }
        if (type == 'delete') {
            await this.store.delete({
                filter: {
                    collection: name,
                },
            });
        }
    }
    /**
     * 更新
     * @param collection 集合名称
     * @param datas 数据
     */
    async upsert(collection, datas) {
        // 先删除已存在的文档
        const existingIds = datas.filter(item => item.id).map(item => item.id);
        if (existingIds.length > 0) {
            await this.remove(collection, existingIds);
        }
        // 准备新文档
        const documents = datas.map(item => new documents_1.Document({
            pageContent: item.content,
            metadata: {
                _id: item.id,
                ...item,
                collection,
            },
        }));
        // 添加新文档
        await this.store.addDocuments(documents, {
            ids: documents.map(item => item.metadata._id),
        });
    }
    /**
     * 删除
     * @param collection 集合名称
     * @param ids 数据ID
     */
    async remove(collection, ids) {
        const store = await this.getStore(collection);
        await store.delete({
            ids: ids,
        });
    }
};
exports.KnowPgStore = KnowPgStore;
__decorate([
    (0, core_1.Config)('typeorm.dataSource.default'),
    __metadata("design:type", Object)
], KnowPgStore.prototype, "connConfig", void 0);
__decorate([
    (0, core_1.Config)('module.know.pg'),
    __metadata("design:type", Object)
], KnowPgStore.prototype, "pgConfig", void 0);
exports.KnowPgStore = KnowPgStore = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton)
], KnowPgStore);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L3N0b3JlL3BnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtRTtBQUNuRSxpQ0FBdUQ7QUFHdkQseURBQXFEO0FBQ3JELHlFQUdvRDtBQUNwRCw0Q0FBc0Q7QUFHdEQ7O0dBRUc7QUFHSSxJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFZLFNBQVEsb0JBQWE7SUFtQjVDOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQWtCO1FBQy9CLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFZLEVBQUUsSUFBaUM7UUFDOUQsSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEIsQ0FBQztZQUNELE1BQU0sTUFBTSxHQUFHO2dCQUNiLHlCQUF5QixFQUFFO29CQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJO29CQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJO29CQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJO29CQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRO29CQUM5QixR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