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
exports.DictInfoService = void 0;
const type_1 = require("./../entity/type");
const info_1 = require("./../entity/info");
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
/**
 * 字典信息
 */
let DictInfoService = class DictInfoService extends core_2.BaseService {
    /**
     * 获得字典数据
     * @param types
     */
    async data(types) {
        const result = {};
        let typeData = await this.dictTypeEntity.find();
        if (!_.isEmpty(types)) {
            typeData = await this.dictTypeEntity.findBy({ key: (0, typeorm_2.In)(types) });
        }
        if (_.isEmpty(typeData)) {
            return {};
        }
        const data = await this.dictInfoEntity
            .createQueryBuilder('a')
            .select([
            'a.id',
            'a.name',
            'a.typeId',
            'a.parentId',
            'a.orderNum',
            'a.value',
        ])
            .where('a.typeId in(:...typeIds)', {
            typeIds: typeData.map(e => {
                return e.id;
            }),
        })
            .orderBy('a.orderNum', 'ASC')
            .addOrderBy('a.createTime', 'ASC')
            .getMany();
        for (const item of typeData) {
            result[item.key] = _.filter(data, { typeId: item.id }).map(e => {
                const value = e.value ? Number(e.value) : e.value;
                return {
                    ...e,
                    // @ts-ignore
                    value: isNaN(value) ? e.value : value,
                };
            });
        }
        return result;
    }
    /**
     * 获得字典key
     * @returns
     */
    async types() {
        return await this.dictTypeEntity.find();
    }
    /**
     * 获得单个或多个字典值
     * @param value 字典值或字典值数组
     * @param key 字典类型
     * @returns
     */
    async getValues(value, key) {
        // 获取字典类型
        const type = await this.dictTypeEntity.findOneBy({ key });
        if (!type) {
            return null; // 或者适当的错误处理
        }
        // 根据typeId获取所有相关的字典信息
        const dictValues = await this.dictInfoEntity.find({
            where: { typeId: type.id },
        });
        // 如果value是字符串，直接查找
        if (typeof value === 'string') {
            return this.findValueInDictValues(value, dictValues);
        }
        // 如果value是数组，遍历数组，对每个元素进行查找
        return value.map(val => this.findValueInDictValues(val, dictValues));
    }
    /**
     * 在字典值数组中查找指定的值
     * @param value 要查找的值
     * @param dictValues 字典值数组
     * @returns
     */
    findValueInDictValues(value, dictValues) {
        let result = dictValues.find(dictValue => dictValue.value === value);
        if (!result) {
            result = dictValues.find(dictValue => dictValue.id === parseInt(value));
        }
        return result ? result.name : null; // 或者适当的错误处理
    }
    /**
     * 修改之后
     * @param data
     * @param type
     */
    async modifyAfter(data, type) {
        if (type === 'delete') {
            for (const id of data) {
                await this.delChildDict(id);
            }
        }
    }
    /**
     * 删除子字典
     * @param id
     */
    async delChildDict(id) {
        const delDict = await this.dictInfoEntity.findBy({ parentId: id });
        if (_.isEmpty(delDict)) {
            return;
        }
        const delDictIds = delDict.map(e => {
            return e.id;
        });
        await this.dictInfoEntity.delete(delDictIds);
        for (const dictId of delDictIds) {
            await this.delChildDict(dictId);
        }
    }
};
exports.DictInfoService = DictInfoService;
__decorate([
    (0, typeorm_1.InjectEntityModel)(info_1.DictInfoEntity),
    __metadata("design:type", typeorm_2.Repository)
], DictInfoService.prototype, "dictInfoEntity", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(type_1.DictTypeEntity),
    __metadata("design:type", typeorm_2.Repository)
], DictInfoService.prototype, "dictTypeEntity", void 0);
__decorate([
    (0, core_1.Config)('typeorm.dataSource.default.type'),
    __metadata("design:type", String)
], DictInfoService.prototype, "ormType", void 0);
exports.DictInfoService = DictInfoService = __decorate([
    (0, core_1.Provide)()
], DictInfoService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RpY3Qvc2VydmljZS9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFrRDtBQUNsRCwyQ0FBa0Q7QUFDbEQseUNBQWlEO0FBQ2pELDRDQUFnRDtBQUNoRCwrQ0FBc0Q7QUFDdEQscUNBQXlDO0FBQ3pDLDRCQUE0QjtBQUU1Qjs7R0FFRztBQUVJLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWdCLFNBQVEsa0JBQVc7SUFVOUM7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFlO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN0QixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFBLFlBQUUsRUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ3hCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWM7YUFDbkMsa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ3ZCLE1BQU0sQ0FBQztZQUNOLE1BQU07WUFDTixRQUFRO1lBQ1IsVUFBVTtZQUNWLFlBQVk7WUFDWixZQUFZO1lBQ1osU0FBUztTQUNWLENBQUM7YUFDRCxLQUFLLENBQUMsMEJBQTBCLEVBQUU7WUFDakMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFD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