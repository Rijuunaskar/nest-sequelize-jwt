import { Body, Controller, Delete, Get, Post, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseService } from 'src/common-service/response.service';
import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { AdminGurad } from 'src/guard/admin.guard';


@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private responseService: ResponseService,
    ) { }
    /**
     * 
     * @param req {
            "name" : "test_test",
            "role_id": 2,
            "email": "test@testmail.com",
            "password": "password",
            "confirm_password": "password",
            "primary_mobile" : 9081772616
        }
     * @param res JSON
     */
    @Post('register')
    async register(@Body() dto: RegisterDto, @Req() req: Request, @Res() res: Response) {
        let resp = await this.userService.register(dto, req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, []);
        } else {
            this.responseService.sent(res, resp.code, [], 'Something went wrong(Please check for any duplicate values)!!');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('list')
    async list( @Req() req: Request, @Res() res: Response) {
        let resp = await this.userService.list(req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, resp.data);
        } else {
            this.responseService.sent(res, resp.code, [], resp.message);
        }
    }

    /**
    * 
    * @param req {
           "email" : "test@testmail.com",
           "password" : "password"
       }
    * @param res JSON
    */
    @Post('login')
    async login(@Body() dto: LoginDto, @Req() req: Request, @Res() res: Response) {
        let resp = await this.userService.login(dto, req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, resp);
        } else {
            this.responseService.sent(res, resp.code, resp.message);
        }
    }


    @UseGuards(JwtAuthGuard) // Auth Guard
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: 'src/uploads/',
                filename: (req, file, callback) => {
                    callback(null, file.originalname);
                },
            }),
        }),
    )
    @Post('upload-profile-image')
    async uploadProfileImage(@Req() req: Request, @Res() res: Response, @UploadedFiles() files) {
        let resp = await this.userService.uploadProfileImage(req, res, files);
        if (resp.success) {
            this.responseService.sent(res, resp.code, []);
        } else {
            this.responseService.sent(res, resp.code, resp.message);
        }
    }

    /**
     * 
     * @param req  id user_id
     * @param res 
     */
    @UseGuards(AdminGurad)  //** Only admin and super admin can delete */
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete( @Req() req: Request, @Res() res: Response) {
        let resp = await this.userService.delete( req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, resp);
        } else {
            this.responseService.sent(res, resp.code, resp.message);
        }
    }

}
