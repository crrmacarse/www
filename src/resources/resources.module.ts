import { Module } from '@nestjs/common';
import { AccountsHttpModule } from './accounts/accounts-http.module';
import { AccountPermissionHttpModule } from './account-permission/account-permission-http.module';
import { PermissionHttpModule } from './permission/permission-http.module';
import { ProjectsHttpModule } from './projects/projects-http.module';

@Module({
    imports: [
        AccountsHttpModule,
        AccountPermissionHttpModule,
        PermissionHttpModule,
        ProjectsHttpModule,
    ],
})
export class ResourceModule {}