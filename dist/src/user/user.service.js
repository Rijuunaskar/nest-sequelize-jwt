"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const User_entity_1 = require("../../models/User.entity");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const Role_entity_1 = require("../../models/Role.entity");
let UserService = class UserService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.register = async (dto, req, res) => {
            try {
                if (!(dto.password == dto.confirm_password)) {
                    return { code: 400, success: false, message: 'Password not matched!' };
                }
                const salt = await bcrypt.genSalt(10);
                const password = dto.password;
                const hashNewPassword = await bcrypt.hash(password, salt);
                dto.password = hashNewPassword;
                delete dto.confirm_password;
                let resp = await User_entity_1.User.create(dto);
                return { code: 200, success: true, resp };
            }
            catch (error) {
                common_1.Logger.error(error);
                return { code: 500, success: false, message: error.message };
            }
        };
        this.list = async (req, res) => {
            try {
                let resp = await User_entity_1.User.findAll({
                    attributes: ['name', 'email', 'role_id', 'primary_mobile'],
                    include: [{
                            model: Role_entity_1.Role,
                            attributes: ['id', 'name']
                        }]
                });
                return { code: 200, success: true, data: resp };
            }
            catch (error) {
                common_1.Logger.error(error);
                return { code: 500, success: false, message: error.message };
            }
        };
        this.login = async (dto, req, res) => {
            try {
                let user = await User_entity_1.User.findOne({
                    attributes: ['id', 'email', 'password', 'role_id'],
                    where: { email: dto.email },
                    raw: true
                });
                if (!user) {
                    return { code: 401, success: false };
                }
                const isMatch = await bcrypt.compare(dto.password, user.password);
                if (!isMatch) {
                    return { code: 401, success: false };
                }
                delete user.password;
                const token = this.jwtService.sign(user, { expiresIn: '7d' });
                return { code: 200, success: true, token };
            }
            catch (error) {
                common_1.Logger.error(error);
                return { code: 500, success: false, message: error.message };
            }
        };
        this.uploadProfileImage = async (req, res, files) => {
            try {
                let user = req['user'];
                await User_entity_1.User.update({
                    profile_image: files[0].path,
                }, {
                    where: { id: user.id }
                });
                return { code: 200, success: true };
            }
            catch (error) {
                common_1.Logger.error(error);
                return { code: 500, success: false, message: error.message };
            }
        };
        this.delete = async (req, res) => {
            try {
                let id = req.params.id || null;
                if (!id) {
                    return { code: 400, success: false };
                }
                let a = await User_entity_1.User.destroy({ where: { id: id }, force: true });
                return { code: 200, success: true };
            }
            catch (error) {
                common_1.Logger.error(error);
                return { code: 500, success: false, message: error.message };
            }
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map