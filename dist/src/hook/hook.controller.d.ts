import { ResponseService } from 'src/common-service/response.service';
import { HookService } from './hook.service';
import { Request, Response } from 'express';
export declare class HookController {
    private hookService;
    private responseService;
    constructor(hookService: HookService, responseService: ResponseService);
    consumeSMSdelivery(req: Request, res: Response): Promise<void>;
}
