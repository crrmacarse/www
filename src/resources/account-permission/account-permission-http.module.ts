import { Module } from '@nestjs/common';
import { AccountPermissionController } from './account-permission.controller';
import { AccountPermissionService } from './account-permission.service';
import { } from './account-permission.module';

@Module({
    imports: [],
    controllers: [AccountPermissionController],
    providers: [AccountPermissionService],
    exports: [AccountPermissionService],
})
export class AccountPermissionHttpModule {}