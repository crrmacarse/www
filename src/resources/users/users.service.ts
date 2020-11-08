import { Injectable } from '@nestjs/common';
import { roleType } from 'decorators/roles.decorator';
import { permissionType } from 'decorators/permissions.decorator';

export type User = {
    id: number,
    username: string,
    password: string,
    roles: roleType[],
    permissions: permissionType[], 
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
                roles: ['admin'],
                permissions: ['read', 'write'],
            },
            {
                id: 2,
                username: 'test2',
                password: 'test2',
                roles: [],
                permissions: [],
            }
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
