import { Module } from '@nestjs/common';
import { PermissionModule } from './permission.module';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
    imports: [PermissionModule],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [PermissionService],
})
export class PermissionHttpModule {};