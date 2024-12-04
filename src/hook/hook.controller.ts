import { Controller, Post, Req, Res } from '@nestjs/common';
import { ResponseService } from 'src/common-service/response.service';
import { HookService } from './hook.service';
import { Request, Response } from 'express';


@Controller('hook')
export class HookController {
    constructor(
        private hookService: HookService,
        private responseService: ResponseService,
    ){}

    //May be we can add access key here to protect webhook url
    @Post('sms')
    async consumeSMSdelivery( @Req() req: Request, @Res() res: Response) {
        let resp = await this.hookService.consumeSMSdelivery( req, res);
        if (resp.success) {
            this.responseService.sent(res, resp.code, []);
        } else {
            this.responseService.sent(res, resp.code, [], resp.message);
        }
    }
}
