import { Inject, Provide } from '@midwayjs/core';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { Document } from '@langchain/core/documents';
import { BaseDocumentLoader } from 'langchain/document_loaders/base';

@Provide()
/**
 * Excel文件加载器，实现BaseDocumentLoader接口
 */
class XLSXLoader extends BaseDocumentLoader {
  private filePath: string;

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
  }

  async load(): Promise<Document[]> {
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
      const document = new Document({
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
}

export { XLSXLoader };

