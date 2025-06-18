"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDemoGoodsController = void 0;
const core_1 = require("@cool-midway/core");
const goods_1 = require("../../entity/goods");
const info_1 = require("../../../user/entity/info");
const goods_2 = require("../../service/goods");
/**
 * 商品模块-商品信息
 */
let AdminDemoGoodsController = class AdminDemoGoodsController extends core_1.BaseController {
};
exports.AdminDemoGoodsController = AdminDemoGoodsController;
exports.AdminDemoGoodsController = AdminDemoGoodsController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: goods_1.DemoGoodsEntity,
        service: goods_2.DemoGoodsService,
        pageQueryOp: {
            keyWordLikeFields: ['a.description'],
            fieldEq: ['a.status'],
            fieldLike: ['a.title'],
            select: ['a.*', 'b.nickName as userName'],
            join: [
                {
                    entity: info_1.UserInfoEntity,
                    alias: 'b',
                    condition: 'a.id = b.id',
                },
            ],
        },
    })
], AdminDemoGoodsController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYWRtaW4vZ29vZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsNENBQW1FO0FBQ25FLDhDQUFxRDtBQUNyRCxvREFBMkQ7QUFDM0QsK0NBQXVEO0FBRXZEOztHQUVHO0FBbUJJLElBQU0sd0JBQXdCLEdBQTlCLE1BQU0sd0JBQXlCLFNBQVEscUJBQWM7Q0FBRyxDQUFBO0FBQWxELDREQUF3QjttQ0FBeEIsd0JBQXdCO0lBbEJwQyxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUsdUJBQWU7UUFDdkIsT0FBTyxFQUFFLHdCQUFnQjtRQUN6QixXQUFXLEVBQUU7WUFDWCxpQkFBaUIsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUNwQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDckIsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSx3QkFBd0IsQ0FBQztZQUN6QyxJQUFJLEVBQUU7Z0JBQ0o7b0JBQ0UsTUFBTSxFQUFFLHFCQUFjO29CQUN0QixLQUFLLEVBQUUsR0FBRztvQkFDVixTQUFTLEVBQUUsYUFBYTtpQkFDekI7YUFDRjtTQUNGO0tBQ0YsQ0FBQztHQUNXLHdCQUF3QixDQUEwQiJ9