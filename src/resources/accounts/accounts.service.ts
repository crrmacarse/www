import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    async changePassword(account: Accounts, newPassword: string) {
        account.password = newPassword;

        await this.accountRepository.save(account);
    }
}
