import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions.module';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
    imports: [PermissionsModule],
    controllers: [PermissionsController],
    providers: [PermissionsService],
    exports: [PermissionsService],
})
export class PermissionsHttpModule {}