import { BaseInterface } from 'constants/base.interface';

export type roleType = 'client' | 'admin';
export interface Account extends BaseInterface {
    id: number;
    username: string;
    email: string;
    password: string;
    googleToken: string;
    role: roleType;
}