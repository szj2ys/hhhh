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
exports.KnowLinkLoader = void 0;
const core_1 = require("@midwayjs/core");
const crawlee_1 = require("crawlee");
crawlee_1.Configuration.getGlobalConfig().set('persistStorage', false);
const TurndownService = require("turndown");
const info_1 = require("../../plugin/service/info");
const uuid_1 = require("uuid");
/**
 * 多文档加载器
 */
let KnowLinkLoader = class KnowLinkLoader {
    /**
     * 加载链接
     * @param link
     * @param options 选项配置
     * @param options.isMd 转为markdown
     * @param options.downloadImages 是否下载图片并替换链接
     * @param options.titleOnly 是否只获取标题
     */
    async load(link, options) {
        // 设置默认选项
        const defaultOptions = {
            isMd: false,
            downloadImages: false,
            titleOnly: false,
        };
        const opts = { ...defaultOptions, ...options };
        const uploadPlugin = await this.pluginService.getInstance('upload');
        let result = [];
        // 创建一个唯一的请求队列
        const requestQueue = await crawlee_1.RequestQueue.open(`queue-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
        const getRootUrl = (url) => {
            const urlObj = new URL(url);
            return `${urlObj.protocol}//${urlObj.hostname}${urlObj.port ? ':' + urlObj.port : ''}`;
        };
        let crawler = new crawlee_1.PlaywrightCrawler({
            requestQueue,
            requestHandler: async ({ request, page }) => {
                try {
                    // 设置页面超时时间 - 只获取标题时减少超时时间
                    page.setDefaultTimeout(opts.titleOnly ? 8000 : 15000);
                    // 等待页面基本加载完成
                    await Promise.race([
                        page.waitForLoadState('domcontentloaded'),
                        new Promise(resolve => setTimeout(resolve, opts.titleOnly ? 3000 : 5000)),
                    ]);
                    // 处理微信公众号可能的验证页面
                    const isWechatArticle = request.loadedUrl.includes('mp.weixin.qq.com');
                    await page.waitForTimeout(opts.titleOnly ? 1000 : 3000);
                    // 等待页面可见
                    await page.waitForSelector('body', { state: 'visible' });
                    // 获取页面标题
                    const title = await page.title();
                    // 如果只需要标题，则直接返回
                    if (opts.titleOnly) {
                        result.push({
                            title,
                            url: request.loadedUrl,
                            content: `标题: ${title}`,
                        });
                        return;
                    }
                    // 对页面进行滚动，以触发懒加载图片
                    await page.evaluate(async () => {
                        // 平滑滚动到页面底部以加载所有懒加载图片
                        const scrollStep = window.innerHeight / 2;
                        const scrollDelay = 100;
                        const scrollToBottom = async () => {
                            const bodyHeight = document.body.scrollHeight;
                            for (let i = 0; i <= bodyHeight; i += scrollStep) {
                                window.scrollTo(0, i);
                                // 等待一小段时间，使懒加载图片有时间加载
                                await new Promise(resolve => setTimeout(resolve, scrollDelay));
                            }
                            // 滚动回页面顶部
                            window.scrollTo(0, 0);
                        };
                        await scrollToBottom();
                        // 尝试移除懒加载属性，强制加载图片
                        const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
                        lazyImages.forEach(img => {
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            if (img.hasAttribute('loading')) {
                                img.removeAttribute('loading');
                            }
                        });
                        // 等待可能的图片加载完成
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    });
                    // 等待一段时间确保动态内容加载
                    await page.waitForTimeout(3000);
                    let content = '';
                    try {
                        // 对微信公众号文章使用特殊处理
                        if (isWechatArticle) {
                            content = await page.evaluate(() => {
                                // 微信公众号文章通常在这些选择器中
                                const possibleContentSelectors = [
                                    '#js_content',
                                    '.rich_media_content',
                                    '.rich_media_area_primary',
                                    'div.rich_media_wrp',
                                ];
                                let articleContent = '';
                                for (const selector of possibleContentSelectors) {
                                    const element = document.querySelector(selector);
                                    if (element) {
                                        // 处理图片
                                        const images = element.querySelectorAll('img');
                                        images.forEach(img => {
                                            // 确保使用正确的图片源
                                            if (img.dataset.src &&
                                                !img.src) {
                                                img.src = img.dataset.src;
                                            }
                                            // 对于微信，可能需要查找多种图片源属性
                                            const imgSrc = img.src ||
                                                img.dataset.src ||
                                                img.getAttribute('data-src') ||
                                                img.getAttribute('data-original') ||
                                                img.getAttribute('data-actualsrc');
                                            if (imgSrc) {
                                                const altText = img.alt || '';
                                                const titleText = img.title || '';
                                                // 创建Markdown格式的图片
                                                const imgMd = `![${altText}](${imgSrc}${titleText ? ` "${titleText}"` : ''})`;
                                                // 在图片位置插入标记
                                                const placeholder = document.createElement('span');
                                                placeholder.textContent = imgMd;
                                                if (img.parentNode) {
                                                    img.parentNode.insertBefore(placeholder, img);
                                                }
                                            }
                                        });
                                        articleContent = element.innerText;
                                        break;
                                    }
                                }
                                return articleContent || document.body.innerText;
                            });
                        }
                        else {
                            // 原有的一般网站内容提取逻辑
                            content = await page.evaluate(() => {
                                // 扩展的内容容器选择器
                                const selectors = [
                                    // 通用内容容器
                                    'article',
                                    'main',
                                    '[role="main"]',
                                    '.main',
                                    '.main-content',
                                    '.content',
                                    '#content',
                                    // 博客文章相关
                                    '.article',
                                    '.article-content',
                                    '.post',
                                    '.post-content',
                                    '.entry',
                                    '.entry-content',
                                    '.blog-post',
                                    '.blog-content',
                                    // 新闻文章相关
                                    '.news-content',
                                    '.news-article',
                                    '.story-content',
                                    // 文档相关
                                    '.document',
                                    '.doc-content',
                                    '.page-content',
                                    // 其他常见容器
                                    '.container',
                                    '.wrapper',
                                    '.page',
                                    '.page-wrapper',
                                ];
                                // 移除不需要的元素的选择器
                                const removeSelectors = [
                                    'script',
                                    'style',
                                    'iframe',
                                    'nav',
                                    'header',
                                    'footer',
                                    '.ad',
                                    '.ads',
                                    '.advertisement',
                                    '.comment',
                                    '.comments',
                                    '.sidebar',
                                    '.menu',
                                    '.navigation',
                                    '.social-share',
                                    '.related-posts',
                                    '.recommend',
                                    '.recommendation',
                                    '.popup',
                                    '.modal',
                                    '.cookie-notice',
                                    '.newsletter',
                                    '.subscribe',
                                    '.share',
                                    '.social',
                                    '.banner',
                                    '.promo',
                                    '.sponsored',
                                    '.advertisement',
                                    '.widget',
                                    '.widget-area',
                                    '.sidebar-widget',
                                    '.footer-widget',
                                ];
                                // 处理内容，保持图片位置
                                const processContent = (element) => {
                                    const clone = element.cloneNode(true);
                                    // 移除不需要的元素
                                    removeSelectors.forEach(selector => {
                                        const elements = clone.querySelectorAll(selector);
                                        elements.forEach(el => el.remove());
                                    });
                                    // 处理所有图片
                                    const images = clone.querySelectorAll('img');
                                    images.forEach(img => {
                                        var _a;
                                        const imgInfo = {
                                            src: img.src, // 浏览器会将此解析为绝对URL
                                            alt: img.alt || '',
                                            title: img.title || '',
                                        };
                                        // 将图片替换为Markdown格式
                                        const placeholder = document.createElement('span');
                                        placeholder.textContent = `![${imgInfo.alt}](${imgInfo.src}${imgInfo.title ? ` "${imgInfo.title}"` : ''})`;
                                        (_a = img.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(placeholder, img);
                                    });
                                    // 获取处理后的文本
                                    return clone.innerText
                                        .replace(/\s+/g, ' ')
                                        .replace(/\n\s*\n/g, '\n')
                                        .trim();
                                };
                                // 遍历选择器查找内容
                                for (const selector of selectors) {
                                    const element = document.querySelector(selector);
                                    if (element && element instanceof HTMLElement) {
                                        const text = processContent(element);
                                        // 如果内容太少，可能不是主要内容
                                        if (text.length > 100) {
                                            return text;
                                        }
                                    }
                                }
                                // 如果没找到合适的内容，尝试获取body内容
                                return processContent(document.body);
                            });
                            // 如果内容为空或太短，尝试重试
                            if (!content || content.length < 50) {
                                await page.waitForTimeout(200);
                                content = await page.evaluate(() => {
                                    const processContent = (element) => {
                                        const clone = element.cloneNode(true);
                                        // 处理所有图片
                                        const images = clone.querySelectorAll('img');
                                        images.forEach(img => {
                                            var _a;
                                            const imgInfo = {
                                                src: img.src, // 浏览器会将此解析为绝对URL
                                                alt: img.alt || '',
                                                title: img.title || '',
                                            };
                                            // 将图片替换为Markdown格式
                                            const placeholder = document.createElement('span');
                                            placeholder.textContent = `![${imgInfo.alt}](${imgInfo.src}${imgInfo.title ? ` "${imgInfo.title}"` : ''})`;
                                            (_a = img.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(placeholder, img);
                                        });
                                        return clone.innerText
                                            .replace(/\s+/g, ' ')
                                            .replace(/\n\s*\n/g, '\n')
                                            .trim();
                                    };
                                    return processContent(document.body);
                                });
                            }
                        }
                    }
                    catch (error) {
                        console.error('获取内容失败:', error);
                        // 尝试最后的备用方案
                        try {
                            content = await page.evaluate(() => {
                                return document.body.innerText
                                    .replace(/\s+/g, ' ')
                                    .replace(/\n\s*\n/g, '\n')
                                    .trim();
                            });
                        }
                        catch (fallbackError) {
                            console.error('备用方案也失败:', fallbackError);
                            content = '无法获取内容';
                        }
                    }
                    // 新增逻辑：处理提取内容中的图片链接
                    if (content &&
                        content !== '无法获取内容' &&
                        uploadPlugin &&
                        typeof uploadPlugin.downAndUpload === 'function' &&
                        opts.downloadImages) {
                        // 更新正则表达式，匹配更广泛的图片格式，包括相对路径
                        const imageRegex = /!\[(.*?)\]\(([^)]+?)(?:\s+"([^"]*)")?\)/g;
                        const matches = [];
                        let match;
                        const rootUrl = getRootUrl(request.loadedUrl);
                        const pageUrl = request.loadedUrl;
                        // 收集所有图片占位符信息
                        while ((match = imageRegex.exec(content)) !== null) {
                            let imageUrl = match[2].trim();
                            // 检查是否为base64图片
                            if (imageUrl.startsWith('data:image/')) {
                                // 对于base64图片，直接保留原样
                                // matches.push({
                                //   index: match.index,
                                //   length: match[0].length,
                                //   originalPlaceholder: match[0],
                                //   imageAlt: match[1] || '',
                                //   imageUrl: imageUrl,
                                //   imageTitle: match[3] || '',
                                //   isBase64: true, // 标记为base64图片
                                // });
                                continue;
                            }
                            // 处理相对路径转为绝对路径
                            if (!imageUrl.startsWith('http://') &&
                                !imageUrl.startsWith('https://')) {
                                if (imageUrl.startsWith('/')) {
                                    // 以根路径开头
                                    imageUrl = `${rootUrl}${imageUrl}`;
                                }
                                else {
                                    // 相对于当前页面的路径
                                    const baseUrl = pageUrl.substring(0, pageUrl.lastIndexOf('/') + 1);
                                    imageUrl = `${baseUrl}${imageUrl}`;
                                }
                            }
                            matches.push({
                                index: match.index,
                                length: match[0].length,
                                originalPlaceholder: match[0],
                                imageAlt: match[1] || '', // 图片alt文本
                                imageUrl: imageUrl, // 处理后的完整图片URL
                                imageTitle: match[3] || '', // 图片title (可选)
                                isBase64: false, // 标记为非base64图片
                            });
                        }
                        if (matches.length > 0) {
                            // 并行处理所有图片下载和URL替换
                            const replacementPromises = matches.map(async (m) => {
                                // 对于base64图片，直接返回原始占位符
                                if (m.isBase64) {
                                    return `![${m.imageAlt}](${m.imageUrl}${m.imageTitle ? ` "${m.imageTitle}"` : ''})`;
                                }
                                try {
                                    // 提取文件扩展名
                                    let fileExt = 'png'; // 修改默认扩展名为png
                                    // 有效的图片扩展名列表
                                    const validImageExts = [
                                        'jpg',
                                        'jpeg',
                                        'png',
                                        'gif',
                                        'webp',
                                        'svg',
                                        'bmp',
                                        'ico',
                                        'tiff',
                                        'avif',
                                    ];
                                    // 尝试从URL路径中提取扩展名（排除查询参数）
                                    const urlPath = m.imageUrl.split('?')[0];
                                    // 只有当URL路径中包含扩展名时才提取
                                    if (urlPath.includes('.')) {
                                        const ext = urlPath.split('.').pop();
                                        // 确保扩展名有效且是图片扩展名
                                        if (ext && /^[a-zA-Z0-9]+$/.test(ext) && ext.length < 10) {
                                            const lowerExt = ext.toLowerCase();
                                            // 如果是有效的图片扩展名，则使用它，否则使用默认的png
                                            if (validImageExts.includes(lowerExt)) {
                                                fileExt = lowerExt;
                                            }
                                        }
                                    }
                                    // 生成带扩展名的文件名
                                    const filename = `${(0, uuid_1.v4)()}.${fileExt}`;
                                    const newImageUrl = await uploadPlugin.downAndUpload(m.imageUrl, filename);
                                    return `![${m.imageAlt}](${newImageUrl}${m.imageTitle ? ` "${m.imageTitle}"` : ''})`;
                                }
                                catch (uploadError) {
                                    console.error(`图片下载失败: ${m.imageUrl}`, uploadError);
                                    // 下载失败，返回使用原始URL的占位符
                                    return `![${m.imageAlt}](${m.imageUrl}${m.imageTitle ? ` "${m.imageTitle}"` : ''})`;
                                }
                            });
                            const replacements = await Promise.all(replacementPromises);
                            // 重建content字符串，替换图片占位符
                            let newProcessedContent = '';
                            let lastIndex = 0;
                            for (let i = 0; i < matches.length; i++) {
                                newProcessedContent += content.substring(lastIndex, matches[i].index); // 添加图片前的文本
                                newProcessedContent += replacements[i]; // 添加处理后的图片占位符
                                lastIndex = matches[i].index + matches[i].length; // 更新下一个起始索引
                            }
                            newProcessedContent += content.substring(lastIndex); // 添加最后一个图片后的文本
                            content = newProcessedContent; // 更新content变量
                        }
                    }
                    else if (uploadPlugin &&
                        typeof uploadPlugin.downAndUpload !== 'function') {
                        console.warn('Upload plugin实例存在，但downAndUpload方法未找到，无法处理图片。');
                    }
                    else if (!uploadPlugin) {
                        console.warn('Upload plugin未初始化，无法处理图片。');
                    }
                    // 新增逻辑结束
                    result.push({
                        title,
                        url: request.loadedUrl,
                        content: `根地址：${getRootUrl(request.loadedUrl)}\n\n${content}`,
                    });
                }
                catch (error) {
                    console.error('页面加载失败:', error);
                    result.push({
                        title: '加载失败',
                        url: request.loadedUrl,
                        content: '无法加载页面',
                    });
                }
            },
            maxConcurrency: 10,
            maxRequestsPerCrawl: 100,
            respectRobotsTxtFile: false,
            retryOnBlocked: false,
            useSessionPool: true,
            persistCookiesPerSession: false,
            navigationTimeoutSecs: 10000,
            headless: true,
            launchContext: {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });
        // 添加起始URL并启动爬虫
        await requestQueue.addRequest({ url: link });
        await crawler.run();
        // 配置Turndown服务，生成更清爽的Markdown
        const turndownService = new TurndownService({
            headingStyle: 'atx', // 使用#风格的标题
            hr: '---', // 水平分割线使用---
            bulletListMarker: '-', // 无序列表使用-
            codeBlockStyle: 'fenced', // 使用```代码块
            emDelimiter: '_', // 斜体使用_
            strongDelimiter: '**', // 粗体使用**
            linkStyle: 'inlined', // 内联链接样式
            linkReferenceStyle: 'full', // 完整链接引用样式
        });
        // 额外规则配置
        turndownService.addRule('removeExcessiveLineBreaks', {
            filter: ['p', 'div', 'li'],
            replacement: function (content) {
                return '\n\n' + content.trim() + '\n\n';
            },
        });
        // 保留一些有用的HTML元素
        turndownService.keep(['kbd', 'mark']);
        // 清理空白符
        turndownService.addRule('cleanWhitespace', {
            filter: function () {
                return true; // 应用于所有元素
            },
            replacement: function (content) {
                // 将多个空行减少为最多两个空行
                return content.replace(/\n{3,}/g, '\n\n');
            },
        });
        return result.map(d => ({
            pageContent: opts.isMd ? turndownService.turndown(d.content) : d.content,
            metadata: {
                title: d.title,
                url: d.url,
            },
        }));
    }
    /**
     * 爬取网站并返回同一域名下的所有URL及其标题
     * @param {string} url - 网站地址
     * @param {Function} callback - 接收每个URL和标题的回调函数
     */
    async parseUrl(url, callback) {
        // 创建一个集合来存储唯一的URL
        const uniqueUrls = new Set();
        // 从输入URL中提取域名
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        // 创建一个唯一的请求队列
        const requestQueue = await crawlee_1.RequestQueue.open(`queue-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
        // 创建爬虫实例
        let crawler = new crawlee_1.PlaywrightCrawler({
            requestQueue,
            // 处理请求的函数
            async requestHandler({ request, page, enqueueLinks }) {
                // 如果不是来自同一域名则跳过
                const currentUrlObj = new URL(request.url);
                if (currentUrlObj.hostname !== domain) {
                    return;
                }
                // 获取当前URL（去除hash部分）
                const currentUrl = request.url.split('#')[0];
                // 如果已经处理过则跳过
                if (uniqueUrls.has(currentUrl)) {
                    return;
                }
                // 添加到唯一URL集合中
                uniqueUrls.add(currentUrl);
                // 获取页面标题
                const title = await page.title();
                // 调用回调函数，传入URL和标题
                callback({
                    url: currentUrl,
                    title: title,
                });
                // 将页面上的所有符合条件的链接加入队列
                await enqueueLinks({
                    strategy: 'same-origin',
                    transformRequestFunction: req => {
                        // 移除URL中的hash部分
                        req.url = req.url.split('#')[0];
                        return req;
                    },
                    // 排除静态资源
                    exclude: [
                        /\.(jpg|jpeg|png|gif|svg|webp|css|js|json|xml|woff|woff2|ttf|eot|mp4|webm|ogg|mp3|wav|pdf|doc|docx|xls|xlsx|zip|rar|tar|gz)$/i,
                    ],
                });
            },
            // 最大并发请求数
            maxConcurrency: 10,
            // 最大爬取深度
            maxRequestsPerCrawl: 100,
            // 尊重robots.txt文件
            respectRobotsTxtFile: true,
            // 重试被阻止的请求
            retryOnBlocked: false,
            // 确保每次爬取完成后清理资源
            useSessionPool: true,
            // 是否持久化cookies
            persistCookiesPerSession: false,
            // 导航超时时间
            navigationTimeoutSecs: 10000,
            statisticsOptions: {
                persistenceOptions: {
                    enable: false,
                },
            },
        });
        // 添加起始URL并启动爬虫
        await requestQueue.addRequest({ url });
        await crawler.run();
    }
};
exports.KnowLinkLoader = KnowLinkLoader;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.PluginService)
], KnowLinkLoader.prototype, "pluginService", void 0);
exports.KnowLinkLoader = KnowLinkLoader = __decorate([
    (0, core_1.Provide)()
], KnowLinkLoader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvbG9hZGVyL2xpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlEO0FBQ2pELHFDQUF5RTtBQUN6RSx1QkFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM3RCw0Q0FBNEM7QUFDNUMsb0RBQTBEO0FBQzFELCtCQUFvQztBQUVwQzs7R0FFRztBQUVJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFJekI7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQ1IsSUFBWSxFQUNaLE9BQTJFO1FBRTNFLFNBQVM7UUFDVCxNQUFNLGNBQWMsR0FBRztZQUNyQixJQUFJLEVBQUUsS0FBSztZQUNYLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxFQUFFLEdBQUcsY0FBYyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFL0MsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsY0FBYztRQUNkLE1BQU0sWUFBWSxHQUFHLE1BQU0sc0JBQVksQ0FBQyxJQUFJLENBQzFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUNwRSxDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxH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