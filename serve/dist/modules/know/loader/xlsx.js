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
exports.XLSXLoader = void 0;
const core_1 = require("@midwayjs/core");
const XLSX = require("xlsx");
const fs = require("fs");
const documents_1 = require("@langchain/core/documents");
const base_1 = require("langchain/document_loaders/base");
let XLSXLoader = class XLSXLoader extends base_1.BaseDocumentLoader {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }
    async load() {
        // 读取Excel文件
        const file = fs.readFileSync(this.filePath);
        const workbook = XLSX.read(file, { type: 'buffer' });
        const documents = [];
        // 遍历所有表
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            // 将Excel数据转换为JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            // 将JSON数据转换为文档格式
            const content = JSON.stringify(jsonData, null, 2);
            // 创建文档对象
            const document = new documents_1.Document({
                pageContent: content,
                metadata: {
                    source: this.filePath,
                    sheetName: sheetName,
                },
            });
            documents.push(document);
        });
        return documents;
    }
    async loadAndSplit() {
        return this.load();
    }
};
exports.XLSXLoader = XLSXLoader;
exports.XLSXLoader = XLSXLoader = __decorate([
    (0, core_1.Provide)()
    /**
     * Excel文件加载器，实现BaseDocumentLoader接口
     */
    ,
    __metadata("design:paramtypes", [String])
], XLSXLoader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvbG9hZGVyL3hsc3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlEO0FBQ2pELDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIseURBQXFEO0FBQ3JELDBEQUFxRTtBQUVyRSxJQUlNLFVBQVUsR0FKaEIsTUFJTSxVQUFXLFNBQVEseUJBQWtCO0lBR3pDLFlBQVksUUFBZ0I7UUFDMUIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUk7UUFDUixZQUFZO1FBQ1osTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUVyRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFckIsUUFBUTtRQUNSLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFN0Msa0JBQWtCO1lBQ2xCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXJELGlCQUFpQjtZQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFbEQsU0FBUztZQUNULE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVEsQ0FBQztnQkFDNUIsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLFFBQVEsRUFBRTtvQkFDUixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3JCLFNBQVMsRUFBRSxTQUFTO2lCQUNyQjthQUNGLENBQUMsQ0FBQztZQUVILFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVk7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztDQUNGLENBQUE7QUFFUSxnQ0FBVTtxQkE3Q2IsVUFBVTtJQUpmLElBQUEsY0FBTyxHQUFFO0lBQ1Y7O09BRUc7OztHQUNHLFVBQVUsQ0EyQ2YifQ==