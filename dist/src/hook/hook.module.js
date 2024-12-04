"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookModule = void 0;
const common_1 = require("@nestjs/common");
const hook_controller_1 = require("./hook.controller");
const hook_service_1 = require("./hook.service");
const response_service_1 = require("../common-service/response.service");
let HookModule = class HookModule {
};
exports.HookModule = HookModule;
exports.HookModule = HookModule = __decorate([
    (0, common_1.Module)({
        controllers: [hook_controller_1.HookController],
        providers: [hook_service_1.HookService, response_service_1.ResponseService]
    })
], HookModule);
//# sourceMappingURL=hook.module.js.map