import { Account } from 'resources/accounts/accounts.entity';

export type jwtPayloadType = {
    profile: Account,
    sub: number,
};

export type jwtResponseType = {
    accessToken: string,
    refreshToken: string,
    refreshTokenExpiry: number,
    timestamp: string,
};