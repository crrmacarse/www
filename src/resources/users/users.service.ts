import { Injectable } from '@nestjs/common';
import { roleType } from 'decorators/roles.decorator';

export type User = {
    id: number,
    username: string,
    password: string,
    roles: roleType[],
    permissions: string[], 
};

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                id: 1,
                username: 'test',
                password: 'test',
                roles: [],
                permissions: [],
            },
            {
                id: 2,
                username: 'test2',
                password: 'test2',
                roles: [],
                permissions: [],
            }
        ]
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
