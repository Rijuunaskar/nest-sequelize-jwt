import { Request, Response } from 'express';
import { User } from '../../models/User.entity';
import { LoginDto, RegisterDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private jwtService;
    constructor(jwtService: JwtService);
    register: (dto: RegisterDto, req: Request, res: Response) => Promise<{
        code: number;
        success: boolean;
        resp: User;
        message?: undefined;
    } | {
        code: number;
        success: boolean;
        message: any;
        resp?: undefined;
    }>;
    list: (req: Request, res: Response) => Promise<{
        code: number;
        success: boolean;
        data: User[];
        message?: undefined;
    } | {
        code: number;
        success: boolean;
        message: any;
        data?: undefined;
    }>;
    login: (dto: LoginDto, req: Request, res: Response) => Promise<{
        code: number;
        success: boolean;
        token?: undefined;
        message?: undefined;
    } | {
        code: number;
        success: boolean;
        token: string;
        message?: undefined;
    } | {
        code: number;
        success: boolean;
        message: any;
        token?: undefined;
    }>;
    uploadProfileImage: (req: Request, res: Response, files: File) => Promise<{
        code: number;
        success: boolean;
        message?: undefined;
    } | {
        code: number;
        success: boolean;
        message: any;
    }>;
    delete: (req: Request, res: Response) => Promise<{
        code: number;
        success: boolean;
        message?: undefined;
    } | {
        code: number;
        success: boolean;
        message: any;
    }>;
}
