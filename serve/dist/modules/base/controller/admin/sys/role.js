"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSysRoleController = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const role_1 = require("../../../entity/sys/role");
const role_2 = require("../../../service/sys/role");
/**
 * 系统角色
 */
let BaseSysRoleController = class BaseSysRoleController extends core_2.BaseController {
};
exports.BaseSysRoleController = BaseSysRoleController;
exports.BaseSysRoleController = BaseSysRoleController = __decorate([
    (0, core_1.Provide)(),
    (0, core_2.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: role_1.BaseSysRoleEntity,
        service: role_2.BaseSysRoleService,
        // 新增的时候插入当前用户ID
        insertParam: async (ctx) => {
            return {
                userId: ctx.admin.userId,
            };
        },
        pageQueryOp: {
            keyWordLikeFields: ['a.name', 'a.label'],
            where: async (ctx) => {
                const { userId, roleIds, username } = ctx.admin;
                return [
                    // 超级管理员的角色不展示
                    ['a.label != :label', { label: 'admin' }],
                    // 如果不是超管，只能看到自己新建的或者自己有的角色
                    [
                        `(a.userId=:userId or a.id in (${roleIds.join(',')}))`,
                        { userId },
                        username !== 'admin',
                    ],
                ];
            },
        },
    })
], BaseSysRoleController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hZG1pbi9zeXMvcm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsNENBQW1FO0FBRW5FLG1EQUE2RDtBQUM3RCxvREFBK0Q7QUFFL0Q7O0dBRUc7QUE2QkksSUFBTSxxQkFBcUIsR0FBM0IsTUFBTSxxQkFBc0IsU0FBUSxxQkFBYztDQUFHLENBQUE7QUFBL0Msc0RBQXFCO2dDQUFyQixxQkFBcUI7SUE1QmpDLElBQUEsY0FBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLHdCQUFpQjtRQUN6QixPQUFPLEVBQUUseUJBQWtCO1FBQzNCLGdCQUFnQjtRQUNoQixXQUFXLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFO1lBQ2xDLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTTthQUN6QixDQUFDO1FBQ0osQ0FBQztRQUNELFdBQVcsRUFBRTtZQUNYLGlCQUFpQixFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztZQUN4QyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFO2dCQUM1QixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNoRCxPQUFPO29CQUNMLGNBQWM7b0JBQ2QsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztvQkFDekMsMkJBQTJCO29CQUMzQjt3QkFDRSxpQ0FBaUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSTt3QkFDdEQsRUFBRSxNQUFNLEVBQUU7d0JBQ1YsUUFBUSxLQUFLLE9BQU87cUJBQ3JCO2lCQUNGLENBQUM7WUFDSixDQUFDO1NBQ0Y7S0FDRixDQUFDO0dBQ1cscUJBQXFCLENBQTBCIn0=