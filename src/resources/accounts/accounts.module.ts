import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './accounts.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Accounts])],
    exports: [TypeOrmModule],
})
export class AccountsModule {}