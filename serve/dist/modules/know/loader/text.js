"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowTextLoader = void 0;
const core_1 = require("@midwayjs/core");
const documents_1 = require("@langchain/core/documents");
/**
 * 文本加载器
 */
let KnowTextLoader = class KnowTextLoader {
    /**
     * 加载文档
     * @param text
     */
    async load(text) {
        return [new documents_1.Document({ pageContent: text, metadata: {} })];
    }
};
exports.KnowTextLoader = KnowTextLoader;
exports.KnowTextLoader = KnowTextLoader = __decorate([
    (0, core_1.Provide)()
], KnowTextLoader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2tub3cvbG9hZGVyL3RleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXlDO0FBQ3pDLHlEQUFxRDtBQUVyRDs7R0FFRztBQUVJLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFDekI7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFZO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLG9CQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGLENBQUE7QUFSWSx3Q0FBYzt5QkFBZCxjQUFjO0lBRDFCLElBQUEsY0FBTyxHQUFFO0dBQ0csY0FBYyxDQVExQiJ9