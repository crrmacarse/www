import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'resources/accounts/accounts.service';
import { AppConfigService } from 'app';
import { JWT_REFRESH_TOKEN_EXPIRATION } from 'constants/default';
import { omit } from 'lodash';
import { authProfileType, jwtPayloadType, jwtResponseType } from './auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private accountService: AccountsService,
        private appConfigService: AppConfigService,
    ) {}

    async validateUser(uid: string, password: string): Promise<any> {
        const account = await this.accountService.authenticate(uid);
        const isMatch = await this.accountService.verifyPassword(password, account.password);

        if (account && isMatch) {
            return omit(account, 'password');
        }

        return null;
    }

    async login(user: authProfileType): Promise<jwtResponseType> {
        const payload: jwtPayloadType = { profile: user, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: await this.generateRefreshToken(payload),
            timestamp: new Date().toISOString(),
        };
    }

    private existingRefreshTokens: string[] = [];

    /**
     * @TODO
     * 
     * 1. Search value of refresh token given the userId(it seems that guard strategy
     * holds the payload. Payload should be passed in here instead of POSTING refreshToken)
     * 2. If success then use to re-authenticate. trigger this.login
     * so user could receive the new accessToken
     * 3. False value should mark an unauthorized
     */
    async regenerateToken (refreshToken: string) {
        const isValid = this.existingRefreshTokens.some((v => v === refreshToken));

        if (!isValid) {
            throw new UnauthorizedException();
        }

        /**
         * @TOOD
         * 
         * I don't have access for user value here. this shold be this.login
         */
        return 'yes';
    }

    async generateRefreshToken (payload: jwtPayloadType): Promise<string> {
        const options = {
            secret: this.appConfigService.key,
            expiresIn: JWT_REFRESH_TOKEN_EXPIRATION,
        };

        const refreshToken = this.jwtService.sign(payload, options);

        // @TODO value should be stored in db. Researching optimal
        // way to access the user instance and store this value.
        this.existingRefreshTokens.push(refreshToken);

        return refreshToken;
    }

    async changePassword({ sub: accountId }: jwtPayloadType, oldPassword, newPassword) {
        await this.accountService.changePassword(accountId, oldPassword, newPassword);
    }

}
