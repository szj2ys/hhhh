"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCode = void 0;
const _ = require("lodash");
/**
 * 代码执行基类
 */
class BaseCode {
    /**
     * 主函数
     */
    async main(params) { }
    /**
     * 执行sql
     * @param sql sql语句
     * @param params 参数
     * @param dataSource 数据源
     */
    async execSql(sql, params = [], dataSource = 'default') {
        const ormManager = this.typeORMDataSourceManager.getDataSource(dataSource);
        return await ormManager.query(sql, params);
    }
    /**
     * 获得typeorm的Repository
     * @param entityName
     * @returns
     */
    async getRepository(entityName) {
        const getEntityByName = async () => {
            const dataSourceNames = this.typeORMDataSourceManager.getDataSourceNames();
            for (const dataSourceName of dataSourceNames) {
                const entityMetadatas = await this.typeORMDataSourceManager.getDataSource(dataSourceName)
                    .entityMetadatas;
                const find = _.find(entityMetadatas, { name: entityName });
                if (find) {
                    return find.target;
                }
            }
        };
        const entity = await getEntityByName();
        const dataSource = this.typeORMDataSourceManager.getDataSourceNameByModel(entity);
        const ormManager = this.typeORMDataSourceManager.getDataSource(dataSource);
        return ormManager.getRepository(entityName);
    }
    /**
     * 调用service
     * @param service 服务
     * @param method 方法
     * @param args 参数
     * @returns
     */
    async invokeService(service, method, ...args) {
        const serviceInstance = await this.app
            .getApplicationContext()
            .getAsync(service);
        return serviceInstance[method](...args);
    }
    /**
     * 调用插件
     * @param key 插件的key
     * @param method 插件的方法
     * @param args 参数
     * @returns
     */
    async invokePlugin(key, method, ...args) {
        return this.pluginService.invoke(key, method, ...args);
    }
}
exports.BaseCode = BaseCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Zsb3cvbm9kZXMvY29kZS9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDRCQUE0QjtBQUs1Qjs7R0FFRztBQUVILE1BQWEsUUFBUTtJQStCbkI7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQVcsSUFBRyxDQUFDO0lBRTFCOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxVQUFVLEdBQUcsU0FBUztRQUM1RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sTUFBTSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBa0I7UUFDcEMsTUFBTSxlQUFlLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDakMsTUFBTSxlQUFlLEdBQ25CLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3JELEtBQUssTUFBTSxjQUFjLElBQUksZUFBZSxFQUFFLENBQUM7Z0JBQzdDLE1BQU0sZUFBZSxHQUNuQixNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO3FCQUM5RCxlQUFlLENBQUM7Z0JBQ3JCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzNELElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sZUFBZSxFQUFFLENBQUM7UUFDdkMsTUFBTSxVQUFVLEdBQ2QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0UsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsR0FBRyxJQUFJO1FBQzFELE1BQU0sZUFBZSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUc7YUFDbkMscUJBQXFCLEVBQUU7YUFDdkIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBVyxFQUFFLE1BQWMsRUFBRSxHQUFHLElBQUk7UUFDckQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGO0FBakdELDRCQWlHQyJ9