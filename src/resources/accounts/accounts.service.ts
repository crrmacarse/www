import {
    Injectable, NotFoundException,
    BadRequestException, UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { BCRYPT_SALT } from 'constants/default';
import { CreateAccountDto } from './accounts.dto';
import { Account } from './accounts.entity';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    ) {}

    findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    findOne(id: number): Promise<Account> {
        return this.accountRepository.findOneOrFail(id);
    }

    findByEmail(email: string): Promise<Account> {
        return this.accountRepository.findOneOrFail({ email });
    }

    async authenticate(uid: string): Promise<Account> {
        try {
            const account = await this.accountRepository.findOneOrFail({
                where: [
                    { username: uid },
                    { email: uid },
                ],
                relations: ['permissions'],
                select: [
                    'id',
                    'username',
                    'email',
                    'password',
                    'role',
                    'createdAt',
                    'updatedAt',
                    'updatedBy',
                    'isActive',
                ]
            });
        
            await this.validateAccount(account);
    
            return account; 
        } catch (error) {
            console.log(error);
            throw new NotFoundException('Account not found');
        }
    }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const newAccount = await this.accountRepository.create(createAccountDto);
        
        return await this.accountRepository.save(newAccount);
    }

    async update(id: number, accountData: Partial<Account>): Promise<Account> {
        const account = await this.accountRepository.findOneOrFail(id);
        const updatedAccount = {
            ...account,
            ...accountData,
        };

        return await this.accountRepository.save(updatedAccount);
    }

    async remove(id: number): Promise<void> {
        await this.accountRepository.delete(id);
    }

    async saveRefreshToken(accountId: number, refreshToken: string) {
        const hashedRefreshToken = await hash(refreshToken, BCRYPT_SALT);

        await this.accountRepository.update(accountId, {
            refreshToken: hashedRefreshToken, lastLogin: new Date(), // @todo
        });
    }

    async emptyRefreshToken(accountId: number) {
        await this.accountRepository.update(accountId, { refreshToken: '' });
    }

    async validatedRefreshToken(accountId: number, refreshToken: string) {
        const account = await this.accountRepository.findOne({ where: { id: accountId }, select: ['refreshToken'] });

        const isMatch = await compare(refreshToken, account.refreshToken);

        if (!isMatch) {
            throw new UnauthorizedException();
        }
    }

    async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        const isPasswordMatch = await compare(
            plainTextPassword,  
            hashedPassword,
        );

        return isPasswordMatch;
    }

    async validateAccount({ isActive }: Account) {
        const isDeleted = !isActive;

        if (isDeleted) {
            throw new NotFoundException('Account not found');
        }
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
