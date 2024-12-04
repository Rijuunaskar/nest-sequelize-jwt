import { IsEmail, IsEmpty, IsMobilePhone, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    role_id: number;

    @IsEmail()
    email: string;

    @IsNumber()
    primary_mobile: number;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirm_password: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}