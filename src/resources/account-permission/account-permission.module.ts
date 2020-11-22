import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountPermission } from './account-permission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AccountPermission])],
    exports: [TypeOrmModule],
})
export class AccountPermissionHttpModule {}
