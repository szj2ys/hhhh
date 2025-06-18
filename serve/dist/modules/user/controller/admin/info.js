"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserInfoController = void 0;
const core_1 = require("@cool-midway/core");
const info_1 = require("../../entity/info");
/**
 * 用户信息
 */
let AdminUserInfoController = class AdminUserInfoController extends core_1.BaseController {
};
exports.AdminUserInfoController = AdminUserInfoController;
exports.AdminUserInfoController = AdminUserInfoController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: info_1.UserInfoEntity,
        pageQueryOp: {
            fieldEq: ['a.status', 'a.gender', 'a.loginType'],
            keyWordLikeFields: ['a.nickName', 'a.phone'],
        },
    })
], AdminUserInfoController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXIvY29udHJvbGxlci9hZG1pbi9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDRDQUFtRTtBQUNuRSw0Q0FBbUQ7QUFFbkQ7O0dBRUc7QUFTSSxJQUFNLHVCQUF1QixHQUE3QixNQUFNLHVCQUF3QixTQUFRLHFCQUFjO0NBQUcsQ0FBQTtBQUFqRCwwREFBdUI7a0NBQXZCLHVCQUF1QjtJQVJuQyxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUscUJBQWM7UUFDdEIsV0FBVyxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7WUFDaEQsaUJBQWlCLEVBQUUsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO1NBQzdDO0tBQ0YsQ0FBQztHQUNXLHVCQUF1QixDQUEwQiJ9