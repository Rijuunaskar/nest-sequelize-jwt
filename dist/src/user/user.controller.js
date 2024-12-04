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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const response_service_1 = require("../common-service/response.service");
const user_dto_1 = require("./user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const jwt_auth_guard_1 = require("../jwt/jwt-auth.guard");
const admin_guard_1 = require("../guard/admin.guard");
let UserController = class UserController {
    constructor(userService, responseService) {
        this.userService = userService;
        this.responseService = responseService;
    }
    async register(dto, req, res) {
        let resp = await this.userService.register(dto, req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, []);
        }
        else {
            this.responseService.sent(res, resp.code, [], 'Something went wrong(Please check for any duplicate values)!!');
        }
    }
    async list(req, res) {
        let resp = await this.userService.list(req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, resp.data);
        }
        else {
            this.responseService.sent(res, resp.code, [], resp.message);
        }
    }
    async login(dto, req, res) {
        let resp = await this.userService.login(dto, req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, resp);
        }
        else {
            this.responseService.sent(res, resp.code, resp.message);
        }
    }
    async uploadProfileImage(req, res, files) {
        let resp = await this.userService.uploadProfileImage(req, res, files);
        if (resp.success) {
            this.responseService.sent(res, resp.code, []);
        }
        else {
            this.responseService.sent(res, resp.code, resp.message);
        }
    }
    async delete(req, res) {
        let resp = await this.userService.delete(req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, resp);
        }
        else {
            this.responseService.sent(res, resp.code, resp.message);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: 'src/uploads/',
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        }),
    })),
    (0, common_1.Post)('upload-profile-image'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadProfileImage", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGurad),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        response_service_1.ResponseService])
], UserController);
//# sourceMappingURL=user.controller.js.map