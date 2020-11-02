import { Injectable } from '@nestjs/common';

export type User = {
    id: number,
    username: string,
    password: string
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
            },
            {
                id: 2,
                username: 'test2',
                password: 'test2',
            }
        ]
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
