import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MODELS } from '../models';
import dbConfig from '../config/config.json'; // "resolveJsonModule":true
import { config } from 'dotenv';
import { SequelizeModule } from '@nestjs/sequelize';
import { HookModule } from './hook/hook.module';

const _ENV = config().parsed;
const _NODE_ENV = _ENV['NODE_ENV'] || 'development';

const CONNECTION: any = {
  dialect: dbConfig[_NODE_ENV]['dialect'],
  host:  dbConfig[_NODE_ENV]['host'],
  port:  dbConfig[_NODE_ENV]['port'],
  username:  dbConfig[_NODE_ENV]['username'],
  password:  dbConfig[_NODE_ENV]['password'],
  database:  dbConfig[_NODE_ENV]['database'],
  models: MODELS,
  logging: false,
  //autoLoadModels: true,
  // synchronize: true,
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: function (field: any, next: any) {
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

let MODULES = [SequelizeModule.forRoot(CONNECTION)];

@Module({
  imports: [UserModule,...MODULES, HookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
