"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./middleware/app");
/**
 * 模块配置
 */
exports.default = () => {
    return {
        // 模块名称
        name: '用户模块',
        // 模块描述
        description: 'APP、小程序、公众号等用户',
        // 中间件，只对本模块有效
        middlewares: [],
        // 中间件，全局有效
        globalMiddlewares: [app_1.UserMiddleware],
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 0,
        // 短信
        sms: {
            // 验证码有效期，单位秒
            timeout: 60 * 3,
        },
        // jwt
        jwt: {
            // token 过期时间，单位秒
            expire: 60 * 60 * 24,
            // 刷新token 过期时间，单位秒
            refreshExpire: 60 * 60 * 24 * 30,
            // jwt 秘钥
            secret: 'ff005d3c-32df-4217-a8df-1edb98daafc5x',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdXNlci9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwwQ0FBa0Q7QUFFbEQ7O0dBRUc7QUFDSCxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsT0FBTztRQUNMLE9BQU87UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU87UUFDUCxXQUFXLEVBQUUsZ0JBQWdCO1FBQzdCLGNBQWM7UUFDZCxXQUFXLEVBQUUsRUFBRTtRQUNmLFdBQVc7UUFDWCxpQkFBaUIsRUFBRSxDQUFDLG9CQUFjLENBQUM7UUFDbkMsdUJBQXVCO1FBQ3ZCLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSztRQUNMLEdBQUcsRUFBRTtZQUNILGFBQWE7WUFDYixPQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7U0FDaEI7UUFDRCxNQUFNO1FBQ04sR0FBRyxFQUFFO1lBQ0gsaUJBQWlCO1lBQ2pCLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDcEIsbUJBQW1CO1lBQ25CLGFBQWEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO1lBQ2hDLFNBQVM7WUFDVCxNQUFNLEVBQUUsdUNBQXVDO1NBQ2hEO0tBQ2MsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==