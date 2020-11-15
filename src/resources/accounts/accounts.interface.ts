import { BaseInterface } from 'constants/base.interface';

export interface Account extends BaseInterface {
    id: number;
    username: string;
    password: string;
    googleToken: string;
}