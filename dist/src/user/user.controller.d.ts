import { UserService } from './user.service';
import { ResponseService } from 'src/common-service/response.service';
import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './user.dto';
export declare class UserController {
    private userService;
    private responseService;
    constructor(userService: UserService, responseService: ResponseService);
    register(dto: RegisterDto, req: Request, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    login(dto: LoginDto, req: Request, res: Response): Promise<void>;
    uploadProfileImage(req: Request, res: Response, files: any): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
