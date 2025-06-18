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
exports.BaseEntity = exports.transformerJson = exports.transformerTime = void 0;
const typeorm_1 = require("typeorm");
const moment = require("moment");
const core_1 = require("@cool-midway/core");
/**
 * 时间转换器
 */
exports.transformerTime = {
    to(value) {
        return value
            ? moment(value).format('YYYY-MM-DD HH:mm:ss')
            : moment().format('YYYY-MM-DD HH:mm:ss');
    },
    from(value) {
        return value;
    },
};
/**
 * Json转换器
 */
exports.transformerJson = {
    to: value => value,
    from: value => {
        // 确保从数据库返回的是对象
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                return value;
            }
        }
        return value;
    },
};
/**
 * 实体基类
 */
class BaseEntity extends core_1.CoolBaseEntity {
}
exports.BaseEntity = BaseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', {
        comment: 'ID',
    }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        comment: '创建时间',
        type: 'varchar',
        transformer: exports.transformerTime,
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        comment: '更新时间',
        type: 'varchar',
        transformer: exports.transformerTime,
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updateTime", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '租户ID', nullable: true }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "tenantId", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvZW50aXR5L2Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdFO0FBQ2hFLGlDQUFpQztBQUNqQyw0Q0FBbUQ7QUFFbkQ7O0dBRUc7QUFDVSxRQUFBLGVBQWUsR0FBRztJQUM3QixFQUFFLENBQUMsS0FBSztRQUNOLE9BQU8sS0FBSztZQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1lBQzdDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsSUFBSSxDQUFDLEtBQUs7UUFDUixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRixDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLGVBQWUsR0FBRztJQUM3QixFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLO0lBQ2xCLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtRQUNaLGVBQWU7UUFDZixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQztnQkFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1gsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGLENBQUM7QUFDRjs7R0FFRztBQUNILE1BQXNCLFVBQVcsU0FBUSxxQkFBYztDQTBCdEQ7QUExQkQsZ0NBMEJDO0FBckJDO0lBSEMsSUFBQSxnQ0FBc0IsRUFBQyxXQUFXLEVBQUU7UUFDbkMsT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDOztzQ0FDUztBQVFYO0lBTkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsTUFBTTtRQUNmLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUFFLHVCQUFlO0tBQzdCLENBQUM7OEJBQ1UsSUFBSTs4Q0FBQztBQVFqQjtJQU5DLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFBRSx1QkFBZTtLQUM3QixDQUFDOzhCQUNVLElBQUk7OENBQUM7QUFJakI7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs0Q0FDM0IifQ==