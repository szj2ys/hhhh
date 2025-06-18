"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempDataSource = void 0;
const typeorm_1 = require("typeorm");
class TempDataSource extends typeorm_1.DataSource {
    /**
     * 重新构造元数据
     */
    async buildMetadatas() {
        await super.buildMetadatas();
    }
}
exports.TempDataSource = TempDataSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFFckMsTUFBYSxjQUFlLFNBQVEsb0JBQVU7SUFDNUM7O09BRUc7SUFDSCxLQUFLLENBQUMsY0FBYztRQUNsQixNQUFNLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUFQRCx3Q0FPQyJ9