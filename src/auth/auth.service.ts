import { Injectable } from '@nestjs/common';
import { UsersService } from 'resources/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if(user && user.password === password) {
            const { password, ...rest } = user;

            return rest;
        }

        return null;
    }
}
