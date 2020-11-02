import { Injectable } from '@nestjs/common';
import { UsersService } from 'resources/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'resources/users/users.service';

export type jwtPayloadType = {
    profile: User,
    sub: number,
}

export type jwtResponseType = {
    access_token: string,
    timestamp: string,
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if(user && user.password === password) {
            const { password, ...rest } = user;

            return rest;
        }

        return null;
    }

    async login(user: User): Promise<jwtResponseType> {
        const payload: jwtPayloadType = { profile: user, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            timestamp: new Date().toISOString(),
        }
    }

}
