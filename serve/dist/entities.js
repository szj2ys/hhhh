"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
// 自动生成的文件，请勿手动修改
const entity0 = require("./modules/user/entity/wx");
const entity1 = require("./modules/user/entity/info");
const entity2 = require("./modules/user/entity/address");
const entity3 = require("./modules/task/entity/log");
const entity4 = require("./modules/task/entity/info");
const entity5 = require("./modules/space/entity/type");
const entity6 = require("./modules/space/entity/info");
const entity7 = require("./modules/recycle/entity/data");
const entity8 = require("./modules/plugin/entity/info");
const entity9 = require("./modules/know/entity/config");
const entity10 = require("./modules/know/entity/graph/relation");
const entity11 = require("./modules/know/entity/graph/node");
const entity12 = require("./modules/know/entity/data/type");
const entity13 = require("./modules/know/entity/data/source");
const entity14 = require("./modules/know/entity/data/info");
const entity15 = require("./modules/flow/entity/session");
const entity16 = require("./modules/flow/entity/result");
const entity17 = require("./modules/flow/entity/log");
const entity18 = require("./modules/flow/entity/info");
const entity19 = require("./modules/flow/entity/data");
const entity20 = require("./modules/flow/entity/config");
const entity21 = require("./modules/dict/entity/type");
const entity22 = require("./modules/dict/entity/info");
const entity23 = require("./modules/demo/entity/goods");
const entity24 = require("./modules/base/entity/base");
const entity25 = require("./modules/base/entity/sys/user_role");
const entity26 = require("./modules/base/entity/sys/user");
const entity27 = require("./modules/base/entity/sys/role_menu");
const entity28 = require("./modules/base/entity/sys/role_department");
const entity29 = require("./modules/base/entity/sys/role");
const entity30 = require("./modules/base/entity/sys/param");
const entity31 = require("./modules/base/entity/sys/menu");
const entity32 = require("./modules/base/entity/sys/log");
const entity33 = require("./modules/base/entity/sys/department");
const entity34 = require("./modules/base/entity/sys/conf");
exports.entities = [
    ...Object.values(entity0),
    ...Object.values(entity1),
    ...Object.values(entity2),
    ...Object.values(entity3),
    ...Object.values(entity4),
    ...Object.values(entity5),
    ...Object.values(entity6),
    ...Object.values(entity7),
    ...Object.values(entity8),
    ...Object.values(entity9),
    ...Object.values(entity10),
    ...Object.values(entity11),
    ...Object.values(entity12),
    ...Object.values(entity13),
    ...Object.values(entity14),
    ...Object.values(entity15),
    ...Object.values(entity16),
    ...Object.values(entity17),
    ...Object.values(entity18),
    ...Object.values(entity19),
    ...Object.values(entity20),
    ...Object.values(entity21),
    ...Object.values(entity22),
    ...Object.values(entity23),
    ...Object.values(entity24),
    ...Object.values(entity25),
    ...Object.values(entity26),
    ...Object.values(entity27),
    ...Object.values(entity28),
    ...Object.values(entity29),
    ...Object.values(entity30),
    ...Object.values(entity31),
    ...Object.values(entity32),
    ...Object.values(entity33),
    ...Object.values(entity34),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZW50aXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUJBQWlCO0FBQ2pCLG9EQUFvRDtBQUNwRCxzREFBc0Q7QUFDdEQseURBQXlEO0FBQ3pELHFEQUFxRDtBQUNyRCxzREFBc0Q7QUFDdEQsdURBQXVEO0FBQ3ZELHVEQUF1RDtBQUN2RCx5REFBeUQ7QUFDekQsd0RBQXdEO0FBQ3hELHdEQUF3RDtBQUN4RCxpRUFBaUU7QUFDakUsNkRBQTZEO0FBQzdELDREQUE0RDtBQUM1RCw4REFBOEQ7QUFDOUQsNERBQTREO0FBQzVELDBEQUEwRDtBQUMxRCx5REFBeUQ7QUFDekQsc0RBQXNEO0FBQ3RELHVEQUF1RDtBQUN2RCx1REFBdUQ7QUFDdkQseURBQXlEO0FBQ3pELHVEQUF1RDtBQUN2RCx1REFBdUQ7QUFDdkQsd0RBQXdEO0FBQ3hELHVEQUF1RDtBQUN2RCxnRUFBZ0U7QUFDaEUsMkRBQTJEO0FBQzNELGdFQUFnRTtBQUNoRSxzRUFBc0U7QUFDdEUsMkRBQTJEO0FBQzNELDREQUE0RDtBQUM1RCwyREFBMkQ7QUFDM0QsMERBQTBEO0FBQzFELGlFQUFpRTtBQUNqRSwyREFBMkQ7QUFDOUMsUUFBQSxRQUFRLEdBQUc7SUFDdEIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN6QixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3pCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDekIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN6QixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3pCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDekIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN6QixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3pCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDekIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN6QixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDMUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0NBQzNCLENBQUMifQ==