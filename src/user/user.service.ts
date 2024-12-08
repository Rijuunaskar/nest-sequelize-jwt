import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../../models/User.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../models/Role.entity';

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService
    ) { }

    register = async (dto: RegisterDto, req: Request, res: Response) => {
        try {
            if (!(dto.password == dto.confirm_password)) {
                return { code: 400, success: false, message: 'Password not matched!' };
            }
            const salt = await bcrypt.genSalt(10);
            const password: string = dto.password;
            const hashNewPassword = await bcrypt.hash(password, salt);
            dto.password = hashNewPassword;
            delete dto.confirm_password;
            let resp: User = await User.create(dto);
            return { code: 200, success: true, resp };
        } catch (error) {
            Logger.error(error);
            return { code: 500, success: false, message: error.message };
        }
    }

    list = async (req: Request, res: Response) => {
        try {
            let resp: User[] = await User.findAll({
                attributes: ['name','email','role_id','primary_mobile'],
                include:[{
                    model:Role,
                    attributes:['id','name']
                }]
            });
            return { code: 200, success: true, data:resp };
        } catch (error) {
            Logger.error(error);
            return { code: 500, success: false, message: error.message };
        }
    }

    login = async (dto: LoginDto, req: Request, res: Response) => {
        try {
            let user: User = await User.findOne({
                attributes: ['id', 'email', 'password', 'role_id'],
                where: { email: dto.email },
                raw: true
            });
            if (!user) {
                return { code: 401, success: false }
            }
            const isMatch = await bcrypt.compare(
                dto.password,
                user.password,
            );
            if (!isMatch) {
                return { code: 401, success: false }
            }
            delete user.password;
            const token = this.jwtService.sign(user, { expiresIn: '7d' });
            return { code: 200, success: true, token };
        } catch (error) {
            Logger.error(error);
            return { code: 500, success: false, message: error.message };
        }
    }

    uploadProfileImage = async (req: Request, res: Response, files: File) => {
        try {
            let user = req['user']; //user details from token
            await User.update({
                profile_image: files[0].path,
            }, {
                where: { id: user.id }
            });
            return { code: 200, success: true };
        } catch (error) {
            Logger.error(error);
            return { code: 500, success: false, message: error.message };
        }
    }

    /**Only and super admin can delete*/
    delete = async (req: Request, res: Response) => {
        try {
            let id = req.params.id || null;
            if(!id){
                return { code: 400, success: false }
            }
            let a = await User.destroy({where:{id:id},force:true});
            return { code: 200, success: true };
        } catch (error) {
            Logger.error(error);
            return { code: 500, success: false, message: error.message };
        }
    }
}
