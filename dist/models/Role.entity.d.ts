import { Model } from 'sequelize-typescript';
export declare class Role extends Model<Role> {
    id: number;
    name: string;
    label: string;
    created_by: number;
    updated_by: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
