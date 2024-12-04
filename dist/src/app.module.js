"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const models_1 = require("../models");
const config_json_1 = __importDefault(require("../config/config.json"));
const dotenv_1 = require("dotenv");
const sequelize_1 = require("@nestjs/sequelize");
const hook_module_1 = require("./hook/hook.module");
const _ENV = (0, dotenv_1.config)().parsed;
const _NODE_ENV = _ENV['NODE_ENV'] || 'development';
const CONNECTION = {
    dialect: config_json_1.default[_NODE_ENV]['dialect'],
    host: config_json_1.default[_NODE_ENV]['host'],
    port: config_json_1.default[_NODE_ENV]['port'],
    username: config_json_1.default[_NODE_ENV]['username'],
    password: config_json_1.default[_NODE_ENV]['password'],
    database: config_json_1.default[_NODE_ENV]['database'],
    models: models_1.MODELS,
    logging: false,
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
                return field.string();
            }
            return next();
        },
    },
    pool: {
        handleDisconnects: true,
        max: 100,
        min: 1,
        acquire: 5000,
    },
    timezone: '+05:30',
};
let MODULES = [sequelize_1.SequelizeModule.forRoot(CONNECTION)];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, ...MODULES, hook_module_1.HookModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map