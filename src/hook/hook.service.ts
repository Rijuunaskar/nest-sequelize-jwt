import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HookService {
    
    consumeSMSdelivery = async (req: Request, res: Response) => {
        try {
            const webhookData = req.body;
            this.processWebhookData(webhookData);
            return { code: 200, success: true, res };
        } catch (error) {
            Logger.error(error);
            return { code: 500, success: false, message: error.message };
        }
    }

    processWebhookData = (data)=>{
        // we can add data to our database from here...
    }
}
