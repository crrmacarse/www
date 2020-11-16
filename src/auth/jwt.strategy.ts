import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AppConfigService } from 'app';
import { jwtPayloadType } from './auth.interface';

@Injectable()
export class JwtSrategy extends PassportStrategy(Strategy) {
    constructor(private configService: AppConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.key,
        });
    }

    async validate(payload: jwtPayloadType) {
        return {
            userId: payload.sub,
            profile: payload.profile,
        };
    }
}