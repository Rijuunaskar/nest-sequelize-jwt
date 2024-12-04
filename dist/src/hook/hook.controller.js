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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookController = void 0;
const common_1 = require("@nestjs/common");
const response_service_1 = require("../common-service/response.service");
const hook_service_1 = require("./hook.service");
let HookController = class HookController {
    constructor(hookService, responseService) {
        this.hookService = hookService;
        this.responseService = responseService;
    }
    async consumeSMSdelivery(req, res) {
        let resp = await this.hookService.consumeSMSdelivery(req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, []);
        }
        else {
            this.responseService.sent(res, resp.code, [], resp.message);
        }
    }
};
exports.HookController = HookController;
__decorate([
    (0, common_1.Post)('sms'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HookController.prototype, "consumeSMSdelivery", null);
exports.HookController = HookController = __decorate([
    (0, common_1.Controller)('hook'),
    __metadata("design:paramtypes", [hook_service_1.HookService,
        response_service_1.ResponseService])
], HookController);
//# sourceMappingURL=hook.controller.js.map