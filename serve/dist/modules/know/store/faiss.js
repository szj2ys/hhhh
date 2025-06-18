// import {
//   Provide,
//   Scope,
//   ScopeEnum,
//   App,
//   IMidwayApplication,
//   Config,
// } from '@midwayjs/core';
// import { KnowStoreBase, KnowVectorData } from './base';
// import { KnowDataInfoEntity } from '../entity/data/info';
// import { FaissStore } from '@langchain/community/vectorstores/faiss';
// import { Document } from '@langchain/core/documents';
// import * as path from 'path';
// import * as fs from 'fs';
// /**
//  * FAISS向量数据库
//  */
// @Provide()
// @Scope(ScopeEnum.Prototype)
// export class KnowFaissStore extends KnowStoreBase {
//   @App()
//   app: IMidwayApplication;
//   @Config('module.know.faiss')
//   faissConfig: {
//     // 向量存储目录
//     directory: string;
//   };
//   /**
//    * 获取集合文件路径
//    * @param collection 集合名称
//    */
//   private getCollectionPath(collection: string) {
//     return path.join(this.faissConfig.directory, collection);
//   }
//   /**
//    * 获取存储器
//    * @param collection 集合名称
//    * @returns FaissStore实例
//    */
//   async getStore(collection: string) {
//     const collectionPath = this.getCollectionPath(collection);
//     try {
//       // 尝试加载已存在的向量存储
//       return await FaissStore.load(collectionPath, this.embedding);
//     } catch (error) {
//       // 如果不存在则创建新的
//       const store = new FaissStore(this.embedding, {});
//       const docs = [new Document({ pageContent: 'x', metadata: { id: 0 } })];
//       await store.addDocuments(docs, { ids: ['id_0'] });
//       // 确保目录存在
//       await fs.promises.mkdir(path.dirname(collectionPath), {
//         recursive: true,
//       });
//       await store.save(collectionPath);
//       // 删除初始化文档
//       await store.delete({ ids: ['id_0'] });
//       await store.save(collectionPath);
//       return store;
//     }
//   }
//   /**
//    * 创建 | 删除 | 获取集合
//    * @param name 集合名称
//    * @param type 操作类型
//    */
//   async collection(name: string, type: 'create' | 'delete' | 'get') {
//     const collectionPath = this.getCollectionPath(name);
//     if (type === 'delete') {
//       try {
//         // 删除集合对应的文件
//         await fs.promises.rm(collectionPath, { recursive: true, force: true });
//         return null;
//       } catch (error) {
//         // 忽略删除错误
//         return null;
//       }
//     }
//     return await this.getStore(name);
//   }
//   /**
//    * 插入 | 更新数据
//    * @param collection 集合名称
//    * @param datas 数据列表
//    */
//   async upsert(collection: string, datas: KnowVectorData[]) {
//     const store = await this.getStore(collection);
//     // 如果是更新操作，先删除已存在的文档
//     const existingIds = datas.filter(item => item.id).map(item => item.id);
//     if (existingIds.length > 0) {
//       try {
//         await store.delete({ ids: existingIds });
//       } catch (error) {
//         // 忽略删除错误
//       }
//     }
//     // 准备新文档
//     const documents = datas.map(
//       item =>
//         new Document({
//           pageContent: item.content.data,
//           metadata: {
//             collection,
//             _id: item.id,
//             ...item,
//           },
//         })
//     );
//     // 添加新文档，使用ID
//     await store.addDocuments(documents, {
//       ids: documents.map(doc => doc.metadata._id),
//     });
//     // 保存到集合对应的文件
//     await store.save(this.getCollectionPath(collection));
//   }
//   /**
//    * 删除数据
//    * @param collection 集合名称
//    * @param ids ID列表
//    */
//   async remove(collection: string, ids: string[]) {
//     try {
//       const store = await this.getStore(collection);
//       // 直接使用FAISS的删除功能
//       await store.delete({
//         ids: ids.map(id => id),
//       });
//       // 保存到集合对应的文件
//       await store.save(this.getCollectionPath(collection));
//     } catch (err) {}
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFpc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L3N0b3JlL2ZhaXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVc7QUFDWCxhQUFhO0FBQ2IsV0FBVztBQUNYLGVBQWU7QUFDZixTQUFTO0FBQ1Qsd0JBQXdCO0FBQ3hCLFlBQVk7QUFDWiwyQkFBMkI7QUFDM0IsMERBQTBEO0FBQzFELDREQUE0RDtBQUM1RCx3RUFBd0U7QUFDeEUsd0RBQXdEO0FBQ3hELGdDQUFnQztBQUNoQyw0QkFBNEI7QUFFNUIsTUFBTTtBQUNOLGdCQUFnQjtBQUNoQixNQUFNO0FBQ04sYUFBYTtBQUNiLDhCQUE4QjtBQUM5QixzREFBc0Q7QUFDdEQsV0FBVztBQUNYLDZCQUE2QjtBQUU3QixpQ0FBaUM7QUFDakMsbUJBQW1CO0FBQ25CLGdCQUFnQjtBQUNoQix5QkFBeUI7QUFDekIsT0FBTztBQUVQLFFBQVE7QUFDUixnQkFBZ0I7QUFDaEIsOEJBQThCO0FBQzlCLFFBQVE7QUFDUixvREFBb0Q7QUFDcEQsZ0VBQWdFO0FBQ2hFLE1BQU07QUFFTixRQUFRO0FBQ1IsYUFBYTtBQUNiLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSLHlDQUF5QztBQUN6QyxpRUFBaUU7QUFDakUsWUFBWTtBQUNaLHdCQUF3QjtBQUN4QixzRUFBc0U7QUFDdEUsd0JBQXdCO0FBQ3hCLHNCQUFzQjtBQUN0QiwwREFBMEQ7QUFDMUQsZ0ZBQWdGO0FBQ2hGLDJEQUEyRDtBQUMzRCxrQkFBa0I7QUFDbEIsZ0VBQWdFO0FBQ2hFLDJCQUEyQjtBQUMzQixZQUFZO0FBQ1osMENBQTBDO0FBQzFDLG1CQUFtQjtBQUNuQiwrQ0FBK0M7QUFDL0MsMENBQTBDO0FBQzFDLHNCQUFzQjtBQUN0QixRQUFRO0FBQ1IsTUFBTTtBQUVOLFFBQVE7QUFDUixzQkFBc0I7QUFDdEIsd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4QixRQUFRO0FBQ1Isd0VBQXdFO0FBQ3hFLDJEQUEyRDtBQUUzRCwrQkFBK0I7QUFDL0IsY0FBYztBQUNkLHVCQUF1QjtBQUN2QixrRkFBa0Y7QUFDbEYsdUJBQXVCO0FBQ3ZCLDBCQUEwQjtBQUMxQixvQkFBb0I7QUFDcEIsdUJBQXVCO0FBQ3ZCLFVBQVU7QUFDVixRQUFRO0FBRVIsd0NBQXdDO0FBQ3hDLE1BQU07QUFFTixRQUFRO0FBQ1IsaUJBQWlCO0FBQ2pCLDhCQUE4QjtBQUM5Qix5QkFBeUI7QUFDekIsUUFBUTtBQUNSLGdFQUFnRTtBQUNoRSxxREFBcUQ7QUFFckQsMkJBQTJCO0FBQzNCLDhFQUE4RTtBQUM5RSxvQ0FBb0M7QUFDcEMsY0FBYztBQUNkLG9EQUFvRDtBQUNwRCwwQkFBMEI7QUFDMUIsb0JBQW9CO0FBQ3BCLFVBQVU7QUFDVixRQUFRO0FBRVIsZUFBZTtBQUNmLG1DQUFtQztBQUNuQyxnQkFBZ0I7QUFDaEIseUJBQXlCO0FBQ3pCLDRDQUE0QztBQUM1Qyx3QkFBd0I7QUFDeEIsMEJBQTBCO0FBQzFCLDRCQUE0QjtBQUM1Qix1QkFBdUI7QUFDdkIsZUFBZTtBQUNmLGFBQWE7QUFDYixTQUFTO0FBRVQsb0JBQW9CO0FBQ3BCLDRDQUE0QztBQUM1QyxxREFBcUQ7QUFDckQsVUFBVTtBQUVWLG9CQUFvQjtBQUNwQiw0REFBNEQ7QUFDNUQsTUFBTTtBQUVOLFFBQVE7QUFDUixZQUFZO0FBQ1osOEJBQThCO0FBQzlCLHVCQUF1QjtBQUN2QixRQUFRO0FBQ1Isc0RBQXNEO0FBQ3RELFlBQVk7QUFDWix1REFBdUQ7QUFFdkQsMEJBQTBCO0FBQzFCLDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFDbEMsWUFBWTtBQUVaLHNCQUFzQjtBQUN0Qiw4REFBOEQ7QUFDOUQsdUJBQXVCO0FBQ3ZCLE1BQU07QUFDTixJQUFJIn0=