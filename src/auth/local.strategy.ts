import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private moduleRef: ModuleRef
    ) {
        super({
            usernameField: 'uid',
            passReqToCallback: true,
        });
    }

    async validate(request: Request, username: string, password: string): Promise<any> {
        /**
         * refer: https://docs.nestjs.com/techniques/authentication#request-scoped-strategies
         */
        const contextId = ContextIdFactory.getByRequest(request);
        const authService = await this.moduleRef.resolve(AuthService, contextId);

        const user = await authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}