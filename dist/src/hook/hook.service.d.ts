import { Request, Response } from 'express';
export declare class HookService {
    consumeSMSdelivery: (req: Request, res: Response) => Promise<{
        code: number;
        success: boolean;
        res: Response<any, Record<string, any>>;
        message?: undefined;
    } | {
        code: number;
        success: boolean;
        message: any;
        res?: undefined;
    }>;
    processWebhookData: (data: any) => void;
}
