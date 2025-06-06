import { Provide } from '@midwayjs/core';
import { MultiFileLoader } from 'langchain/document_loaders/fs/multi_file';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CSVLoader } from '@langchain/community/document_loaders/fs/csv';
import { DocxLoader } from '@langchain/community/document_loaders/fs/docx';
import { PPTXLoader } from '@langchain/community/document_loaders/fs/pptx';
import { Document } from '@langchain/core/documents';
import * as path from 'path';
import * as os from 'os';

/**
 * 多文档加载器
 */
@Provide()
export class KnowMultiLoader {
  /**
   * 加载文档
   * @param filePath
   */
  async load(filePath: any) {
    const loader = new MultiFileLoader([filePath], {
      '.txt': path => new TextLoader(path),
      '.md': path => new TextLoader(path),
      '.pdf': path => new PDFLoader(path, { splitPages: false }),
      '.csv': path => new CSVLoader(path),
      '.docx': path => new DocxLoader(path),
      '.pptx': path => new PPTXLoader(path),
    });
    const docs = await loader.load();
    // 如果是csv，则合成一个文档
    if (filePath.endsWith('.csv')) {
      let content = docs.map(item => item.pageContent).join('---sep---\n\n');
      return [new Document({ pageContent: content, metadata: {} })];
    }
    return docs;
  }

  /**
   * 通过链接加载
   * @param link
   * @returns
   */
  async loadByLink(link: string) {
    const download = require('download');
    const fs = require('fs');
    const crypto = require('crypto');

    // 从URL中获取文件扩展名
    const urlObj = new URL(link);
    const pathname = urlObj.pathname;
    const ext = path.extname(pathname) || '.txt';

    // 创建临时文件名
    const tempFileName = path.join(
      os.tmpdir(),
      `${crypto.randomBytes(6).toString('hex')}${ext}`
    );

    try {
      // 下载文件到临时目录
      const data = await download(encodeURI(link));
      fs.writeFileSync(tempFileName, data);

      // 加载文件内容
      const docs = await this.load(tempFileName);
      return docs.map(item => item.pageContent)[0];
    } finally {
      // 删除临时文件
      if (fs.existsSync(tempFileName)) {
        fs.unlinkSync(tempFileName);
      }
    }
  }
}
