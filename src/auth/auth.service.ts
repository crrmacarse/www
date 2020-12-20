import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'resources/accounts/accounts.service';
import { AppConfigService } from 'app';
import { JWT_REFRESH_TOKEN_EXPIRATION } from 'constants/default';
import { Account } from 'resources/accounts/accounts.entity';
import { omit } from 'lodash';
import {  jwtPayloadType, jwtResponseType } from './auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private accountService: AccountsService,
        private appConfigService: AppConfigService,
    ) {}

    private refreshSecretOptions = {
        secret: this.appConfigService.refreshKey,
        expiresIn: JWT_REFRESH_TOKEN_EXPIRATION,
    };

    async validateUser(uid: string, password: string): Promise<any> {
        const account = await this.accountService.authenticate(uid);
        const isMatch = await this.accountService.verifyPassword(password, account.password);

        if (account && isMatch) {
            return omit(account, 'password');
        }

        return null;
    }

    async login(account: Account): Promise<jwtResponseType> {
        const payload: jwtPayloadType = { profile: account, sub: account.id };
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);

        await this.accountService.saveRefreshToken(account.id, refreshToken);

        return {
            accessToken,
            refreshToken,
            refreshTokenExpiry: JWT_REFRESH_TOKEN_EXPIRATION,
            timestamp: new Date().toISOString(),
        };
    }

    async logout({ sub: accountId }: jwtPayloadType) {
        await this.accountService.emptyRefreshToken(accountId);

        return { message: 'Succesfully logged out' };
    }

    async forgotPassword(email: string) {
        const account = await this.accountService.findByEmail(email);
        await this.accountService.validateAccount(account);

        // TODO: Email change password
        await this.accountService.update(account.id, { needChange: true });

        return { message: 'Check your email address' };
    }

    async regenerateToken(refreshToken: string) {
        const { sub, profile } = this.verifyRefreshToken(refreshToken);

        await this.accountService.validatedRefreshToken(sub, refreshToken);

        return {
            accesToken: this.generateAccessToken({ profile, sub }),
            timestamp: new Date().toISOString(),
        };
    }

    private generateAccessToken(payload: jwtPayloadType) {
        return this.jwtService.sign(payload);
    }

    private verifyRefreshToken(refreshToken: string): jwtPayloadType {
        try {
            return this.jwtService.verify(refreshToken, this.refreshSecretOptions);
        } catch (error) {
            throw new UnauthorizedException('Invalid Refresh Token');
        }
    }

    private generateRefreshToken(payload: jwtPayloadType) {
        const refreshToken = this.jwtService.sign(payload, this.refreshSecretOptions);

        return refreshToken;
    }

    async changePassword({ sub: accountId }: jwtPayloadType, oldPassword, newPassword) {
        await this.accountService.changePassword(accountId, oldPassword, newPassword);
    }
}
