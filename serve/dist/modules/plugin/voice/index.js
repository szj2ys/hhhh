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
exports.PluginVoiceService = void 0;
const core_1 = require("@midwayjs/core");
const core_2 = require("@cool-midway/core");
const info_1 = require("../service/info");
/**
 * 声音插件
 */
let PluginVoiceService = class PluginVoiceService extends core_2.BaseService {
    constructor() {
        super(...arguments);
        // map实例
        this.map = new Map();
    }
    // 获取实例
    getInstance(socket, key) {
        return this.map.get(`${socket.id}-${key}`);
    }
    /**
     * 创建实例
     * @param key 插件key
     * @returns 实例
     */
    async createInstance(key, socket, params) {
        const instance = await this.pluginService.getInstance(key);
        let client = null;
        if (key == 'hs-tts') {
            client = await instance.stream(JSON.parse(params), chunk => {
                socket.emit('hs-tts', { isEnd: false, data: chunk });
            }, async (data) => {
                socket.emit('hs-tts', { isEnd: true, data });
                // 重新创建实例
                await this.destroyInstance(socket, key);
                await this.createInstance(key, socket, params);
            });
            this.map.set(`${socket.id}-${key}`, {
                client,
                socket,
                params,
            });
        }
        return {
            client,
            instance,
            socket,
            params,
        };
    }
    /**
     * 销毁实例
     * @param key 插件key
     */
    async destroyInstance(socket, key) {
        const instance = await this.getInstance(socket, key);
        if (instance) {
            instance.client == null;
        }
        this.map.delete(`${socket.id}-${key}`);
    }
    /**
     * 使用实例
     * @param socket
     * @param key
     * @param params
     */
    async useInstance(socket, key, params) {
        // 语音合成
        if (key == 'hs-tts') {
            const instance = await this.getInstance(socket, key);
            if (instance) {
                instance.client.sendText(params.text);
            }
        }
        // 语音识别
        if (key == 'hs-asr') {
            let instance = await this.getInstance(socket, key);
            if (!instance) {
                const plugin = await this.pluginService.getInstance(key);
                const client = await plugin.stream(params, {
                    onInterim(text) {
                        console.log(text);
                        socket.emit('hs-asr', { isEnd: false, data: text });
                    },
                    onFinal: async (text) => {
                        socket.emit('hs-asr', { isEnd: true, data: text });
                        await this.destroyInstance(socket, key);
                    },
                    onReady() {
                        socket.emit('hs-asr', { event: 'ready' });
                    },
                    onError(err) {
                        console.log(err);
                    },
                });
                instance = {
                    client,
                    socket,
                    params,
                    instance: plugin,
                };
                this.map.set(`${socket.id}-${key}`, {
                    client,
                    socket,
                    params,
                });
            }
            if (params.buffer) {
                await instance.client.send(params.buffer);
            }
        }
    }
    /**
     * 结束实例
     * @param socket
     * @param key
     */
    async endInstance(socket, key) {
        const instance = await this.getInstance(socket, key);
        if (instance) {
            if (key == 'hs-tts') {
                instance.client.end();
            }
            if (key == 'hs-asr') {
                instance.client.done();
            }
        }
    }
    /**
     * 停止实例
     * @param socket
     * @param key
     */
    async stopInstance(socket, key) {
        const instance = await this.getInstance(socket, key);
        // 重新创建实例
        if (instance) {
            await instance.client.endConnection();
        }
        await this.destroyInstance(socket, key);
    }
};
exports.PluginVoiceService = PluginVoiceService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", info_1.PluginService)
], PluginVoiceService.prototype, "pluginService", void 0);
exports.PluginVoiceService = PluginVoiceService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton, { allowDowngrade: true })
], PluginVoiceService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wbHVnaW4vdm9pY2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW1FO0FBQ25FLDRDQUFnRDtBQUNoRCwwQ0FBZ0Q7QUFHaEQ7O0dBRUc7QUFHSSxJQUFNLGtCQUFrQixHQUF4QixNQUFNLGtCQUFtQixTQUFRLGtCQUFXO0lBQTVDOztRQUlMLFFBQVE7UUFDQSxRQUFHLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztJQTZJdkMsQ0FBQztJQTNJQyxPQUFPO0lBQ1AsV0FBVyxDQUFDLE1BQWUsRUFBRSxHQUFXO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQVcsRUFBRSxNQUFlLEVBQUUsTUFBVztRQUM1RCxNQUFNLFFBQVEsR0FBUSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNwQixNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUNsQixLQUFLLENBQUMsRUFBRTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDdkQsQ0FBQyxFQUNELEtBQUssRUFBQyxJQUFJLEVBQUMsRUFBRTtnQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFB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