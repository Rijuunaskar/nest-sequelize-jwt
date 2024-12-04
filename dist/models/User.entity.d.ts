import { Model } from 'sequelize-typescript';
import { Role } from './Role.entity';
export declare class User extends Model<User> {
    id: number;
    name: string;
    role_id: number;
    email: string;
    primary_mobile: number;
    password: string;
    profile_image: string;
    created_by: number;
    updated_by: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    role: Role;
}
