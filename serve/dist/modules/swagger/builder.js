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
exports.SwaggerBuilder = void 0;
const core_1 = require("@cool-midway/core");
const core_2 = require("@midwayjs/core");
const _ = require("lodash");
/**
 * 构建文档
 */
let SwaggerBuilder = class SwaggerBuilder {
    constructor() {
        this.json = {};
    }
    /**
     * 初始化
     */
    async init() {
        if (this.epsConfig) {
            this.build();
        }
    }
    /**
     * 构建文档
     */
    async build() {
        const epsData = {
            app: this.eps.app || [],
            admin: this.eps.admin || [],
            module: this.eps.module || {},
        };
        this.json = this.convertToSwagger(epsData);
    }
    /**
     * Epss转换为Swagger
     * @param dataJson
     * @returns
     */
    convertToSwagger(dataJson) {
        const swagger = {
            ...this.swaggerBase,
            paths: {},
            tags: Object.keys(dataJson.module)
                .filter(item => item != 'swagger')
                .map(moduleKey => {
                return {
                    key: moduleKey,
                    name: dataJson.module[moduleKey].name || '',
                    description: dataJson.module[moduleKey].description || '',
                };
            }),
        };
        // 添加组件
        function addComponentSchemas(data) {
            if (_.isEmpty(data.name))
                return;
            const schema = {
                type: 'object',
                properties: {},
                required: [],
            };
            data.columns.forEach(column => {
                const swaggerType = mapTypeToSwagger(column.type);
                schema.properties[column.propertyName] = {
                    type: swaggerType,
                    description: column.comment,
                };
                if (!column.nullable) {
                    schema.required.push(column.propertyName);
                }
            });
            swagger.components.schemas[data.name] = schema;
            return data.name;
        }
        // 转换类型
        function mapTypeToSwagger(type) {
            const typeMapping = {
                string: 'string',
                number: 'number',
                bigint: 'integer',
                datetime: 'string', // assuming datetime is formatted as ISO8601 string
            };
            return typeMapping[type] || 'string';
        }
        // 添加请求体
        function addRequest(path, schemas, data) {
            if (path == '/info' || path == '/list' || path == '/page') {
                if (path == '/info') {
                    data.parameters = [
                        {
                            name: 'id',
                            in: 'query',
                            description: 'ID',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                        },
                    ];
                }
                else {
                    data.requestBody = {
                        description: '动态请求体',
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: path == '/page'
                                        ? {
                                            page: {
                                                type: 'integer',
                                                description: '第几页',
                                                default: 1,
                                            },
                                            size: {
                                                type: 'integer',
                                                description: '每页大小',
                                                default: 20,
                                            },
                                        }
                                        : {},
                                },
                            },
                        },
                    };
                }
                data.responses = {
                    '200': {
                        description: '成功响应',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        code: {
                                            type: 'integer',
                                            description: '状态码',
                                        },
                                        message: {
                                            type: 'string',
                                            description: '响应消息',
                                        },
                                        data: {
                                            $ref: `#/components/schemas/${schemas}`,
                                        },
                                    },
                                },
                            },
                        },
                    },
                };
            }
            if (path == '/add' || path == '/update') {
                data.requestBody = {
                    description: schemas,
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: `#/components/schemas/${schemas}`,
                            },
                        },
                    },
                };
                data.responses = {
                    '200': {
                        description: '成功响应',
                        content: {
                            'application/json': {
                                example: {
                                    code: 1000,
                                    message: 'success',
                                    data: {
                                        id: 6,
                                    },
                                },
                            },
                        },
                    },
                };
            }
            if (path == '/delete') {
                data.requestBody = {
                    description: schemas,
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    ids: {
                                        type: 'array',
                                        description: 'ID数组',
                                        items: {
                                            type: 'integer',
                                        },
                                    },
                                },
                            },
                        },
                    },
                };
                data.responses = {
                    '200': {
                        description: '成功响应',
                        content: {
                            'application/json': {
                                example: {
                                    code: 1000,
                                    message: 'success',
                                },
                            },
                        },
                    },
                };
            }
        }
        // 处理每个模块下的API接口
        function processModuleApis(moduleApis, moduleName) {
            moduleApis.forEach(module => {
                const schemas = addComponentSchemas({
                    name: module.name,
                    columns: module.columns,
                });
                if (Array.isArray(module.api)) {
                    module.api.forEach(api => {
                        const fullPath = `${api.prefix == '/' ? '' : api.prefix}${api.path}`;
                        const method = api.method.toLowerCase();
                        if (!swagger.paths[fullPath]) {
                            swagger.paths[fullPath] = {};
                        }
                        swagger.paths[fullPath][method] = {
                            summary: `【${module.info.type.description || module.info.type.name}】` +
                                api.summary || '',
                            security: api.ignoreToken
                                ? []
                                : [
                                    {
                                        ApiKeyAuth: [],
                                    },
                                ],
                            tags: [moduleName || '其他'],
                            requestBody: method == 'post'
                                ? {
                                    description: '请求体',
                                    required: true,
                                    content: {
                                        'application/json': {
                                            schema: {
                                                type: 'object',
                                                properties: {},
                                            },
                                        },
                                    },
                                }
                                : {},
                            responses: schemas
                                ? {
                                    '200': {
                                        description: 'Success response',
                                        content: {
                                            'application/json': {
                                                schema: {
                                                    $ref: `#/components/schemas/${schemas}`,
                                                },
                                            },
                                        },
                                    },
                                }
                                : {},
                        };
                        addRequest(api.path, schemas, swagger.paths[fullPath][method]);
                    });
                }
            });
        }
        // 遍历app和admin中的所有模块
        Object.keys(dataJson.app).forEach(moduleKey => {
            var _a;
            if (Array.isArray(dataJson.app[moduleKey])) {
                processModuleApis(dataJson.app[moduleKey], (_a = dataJson.module[moduleKey]) === null || _a === void 0 ? void 0 : _a.name);
            }
        });
        Object.keys(dataJson.admin).forEach(moduleKey => {
            var _a;
            if (Array.isArray(dataJson.admin[moduleKey])) {
                processModuleApis(dataJson.admin[moduleKey], (_a = dataJson.module[moduleKey]) === null || _a === void 0 ? void 0 : _a.name);
            }
        });
        return swagger;
    }
};
exports.SwaggerBuilder = SwaggerBuilder;
__decorate([
    (0, core_2.Config)('module.swagger.base'),
    __metadata("design:type", Object)
], SwaggerBuilder.prototype, "swaggerBase", void 0);
__decorate([
    (0, core_2.Inject)(),
    __metadata("design:type", core_1.CoolEps)
], SwaggerBuilder.prototype, "eps", void 0);
__decorate([
    (0, core_2.Config)('cool.eps'),
    __metadata("design:type", Boolean)
], SwaggerBuilder.prototype, "epsConfig", void 0);
exports.SwaggerBuilder = SwaggerBuilder = __decorate([
    (0, core_2.Provide)(),
    (0, core_2.Scope)(core_2.ScopeEnum.Singleton)
], SwaggerBuilder);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3N3YWdnZXIvYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBNEM7QUFDNUMseUNBQTJFO0FBQzNFLDRCQUE0QjtBQUU1Qjs7R0FFRztBQUdJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFBcEI7UUFPTCxTQUFJLEdBQUcsRUFBRSxDQUFDO0lBMlNaLENBQUM7SUF0U0M7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSTtRQUNSLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sT0FBTyxHQUFHO1lBQ2QsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUU7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDM0IsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUU7U0FDOUIsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0JBQWdCLENBQUMsUUFBUTtRQUN2QixNQUFNLE9BQU8sR0FBRztZQUNkLEdBQUcsSUFBSSxDQUFDLFdBQVc7WUFDbkIsS0FBSyxFQUFFLEVBQUU7WUFDVCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDO2lCQUNqQyxHQUFHLENBQUMsU0FB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