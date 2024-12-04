import { Response } from 'express';
export declare class ResponseService {
    sent(res: Response, code: number, data: any, message?: any): void;
}
