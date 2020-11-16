import { roleType } from 'decorators/roles.decorator';
import { permissionType } from 'decorators/permissions.decorator';

export type authProfileType = {
    id: number,
    username: string,
    password: string,
    roles: roleType[],
    permissions: permissionType[], 
};

export type jwtPayloadType = {
    profile: authProfileType,
    sub: number,
};

export type jwtResponseType = {
    access_token: string,
    refresh_token: string,
    timestamp: string,
};