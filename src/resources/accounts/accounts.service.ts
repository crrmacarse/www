import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { CreateAccountDto, UpdateAccountDto } from './accounts.dto';
import { Accounts } from './accounts.entity';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Accounts)
        private accountRepository: Repository<Accounts>
    ) {}

    findAll(): Promise<Accounts[]> {
        return this.accountRepository.find();
    }

    findOne(id: number): Promise<Accounts> {
        return this.accountRepository.findOneOrFail(id);
    }

    async authenticate(uid: string): Promise<Accounts> {
        const account = await this.accountRepository.findOneOrFail({
            where: [
                { username: uid },
                { email: uid },
            ],
            select: [
                'id',
                'username',
                'email',
                'password',
                'role',
                'createdAt',
                'updatedAt',
                'updatedBy',
            ]
        });

        if(!account) {
            throw new NotFoundException('Account not found');
        }

        return account;
    }

    async create(createAccountDto: CreateAccountDto) {
        const newAccount = await this.accountRepository.create(createAccountDto);
        
        await this.accountRepository.save(newAccount);
    }

    async update(id: number, updateAccountDto: UpdateAccountDto) {
        const account = await this.accountRepository.findOneOrFail(id);
        const updatedAccount = {
            ...account,
            ...updateAccountDto,
        };

        await this.accountRepository.save(updatedAccount);
    }

    async remove(id: number): Promise<void> {
        await this.accountRepository.delete(id);
    }

    async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        const isPasswordMatch = await compare(
            plainTextPassword,  
            hashedPassword,
        );

        return isPasswordMatch;
    }

    async changePassword(id: number, oldPassword, newPassword: string) {
        const account = await this.accountRepository.findOne(id);

        const isMatch = await this.verifyPassword(oldPassword, account.password);

        if (!isMatch) {
            throw new BadRequestException('Password doesn\'nt match');
        }

        account.password = newPassword;

        await this.accountRepository.save(account);
    }
}
