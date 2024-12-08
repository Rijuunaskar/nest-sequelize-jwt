import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ResponseService } from 'src/common-service/response.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
let _ENV = dotenv.config().parsed;

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: _ENV['JWT_SECRET'] || 'shdf348541as',
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,ResponseService,JwtStrategy]
})
export class UserModule {}
