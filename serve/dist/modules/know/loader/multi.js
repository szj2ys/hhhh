"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowMultiLoader = void 0;
const core_1 = require("@midwayjs/core");
const multi_file_1 = require("langchain/document_loaders/fs/multi_file");
const text_1 = require("langchain/document_loaders/fs/text");
const pdf_1 = require("@langchain/community/document_loaders/fs/pdf");
const csv_1 = require("@langchain/community/document_loaders/fs/csv");
const docx_1 = require("@langchain/community/document_loaders/fs/docx");
const pptx_1 = require("@langchain/community/document_loaders/fs/pptx");
const documents_1 = require("@langchain/core/documents");
const xlsx_1 = require("./xlsx"); // 兼容xlsx文件
const path = require("path");
const os = require("os");
/**
 * 多文档加载器
 */
let KnowMultiLoader = class KnowMultiLoader {
    /**
     * 加载文档
     * @param filePath
     */
    async load(filePath) {
        const loader = new multi_file_1.MultiFileLoader([filePath], {
            '.txt': path => new text_1.TextLoader(path),
            '.md': path => new text_1.TextLoader(path),
            '.pdf': path => new pdf_1.PDFLoader(path, { splitPages: false }),
            '.csv': path => new csv_1.CSVLoader(path),
            '.docx': path => new docx_1.DocxLoader(path),
            '.pptx': path => new pptx_1.PPTXLoader(path),
            '.xlsx': path => new xlsx_1.XLSXLoader(path),
        });
        const docs = await loader.load();
        // 如果是csv，则合成一个文档
        if (filePath.endsWith('.csv')) {
            let content = docs.map(item => item.pageContent).join('---sep---\n\n');
            return [new documents_1.Document({ pageContent: content, metadata: {} })];
        }
        return docs;
    }
    /**
     * 通过链接加载
     * @param link
     * @returns
     */
    async loadByLink(link) {
        const download = require('download');
        const fs = require('fs');
        const crypto = require('crypto');
        // 从URL中获取文件扩展名
        const urlObj = new URL(link);
        const pathname = urlObj.pathname;
        const ext = path.extname(pathname) || '.txt';
        // 创建临时文件名
        const tempFileName = path.join(os.tmpdir(), `${crypto.randomBytes(6).toString('hex')}${ext}`);
        try {
            // 下载文件到临时目录
            const data = await download(encodeURI(link));
            fs.writeFileSync(tempFileName, data);
            // 加载文件内容
            const docs = await this.load(tempFileName);
            return docs.map(item => item.pageContent)[0];
        }
        finally {
            // 删除临时文件
            if (fs.existsSync(tempFileName)) {
                fs.unlinkSync(tempFileName);
            }
        }
    }
};
exports.KnowMultiLoader = KnowMultiLoader;
exports.KnowMultiLoader = KnowMultiLoader = __decorate([
    (0, core_1.Provide)()
], KnowMultiLoader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9rbm93L2xvYWRlci9tdWx0aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMseUVBQTJFO0FBQzNFLDZEQUFnRTtBQUNoRSxzRUFBeUU7QUFDekUsc0VBQXlFO0FBQ3pFLHdFQUEyRTtBQUMzRSx3RUFBMkU7QUFDM0UseURBQXFEO0FBQ3JELGlDQUFvQyxDQUFDLFdBQVc7QUFDaEQsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUV6Qjs7R0FFRztBQUVJLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWU7SUFDMUI7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFhO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUksNEJBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksaUJBQVUsQ0FBQyxJQUFJLENBQUM7WUFDcEMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxpQkFBVSxDQUFDLElBQUksQ0FBQztZQUNuQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGVBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDMUQsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxlQUFTLENBQUMsSUFBSSxDQUFDO1lBQ25DLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksaUJBQVUsQ0FBQyxJQUFJLENBQUM7WUFDckMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxpQkFBVSxDQUFDLElBQUksQ0FBQztZQUNyQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGlCQUFVLENBQUMsSUFBSSxDQUFDO1NBQ3RDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLGlCQUFpQjtRQUNqQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2RSxPQUFPLENBQUMsSUFBSSxvQkFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQzNCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWpDLGVBQWU7UUFDZixNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDO1FBRTdDLFVBQVU7UUFDVixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUM1QixFQUFFLENBQUMsTUFBTSxFQUFFLEVBQ1gsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FDakQsQ0FBQztRQUVGLElBQUksQ0FBQztZQUNILFlBQVk7WUFDWixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVyQyxTQUFTO1lBQ1QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO2dCQUFTLENBQUM7WUFDVCxTQUFTO1lBQ1QsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7Z0JBQ2hDLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTVEWSwwQ0FBZTswQkFBZixlQUFlO0lBRDNCLElBQUEsY0FBTyxHQUFFO0dBQ0csZUFBZSxDQTREM0IifQ==