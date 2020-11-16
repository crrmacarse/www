import { Module } from '@nestjs/common';
import { AccountsHttpModule } from './accounts/accounts-http.module';
import { PermissionsHttpModule } from './permissions/permissions-http-module';
import { ProjectsHttpModule } from './projects/projects-http.module';

@Module({
    imports: [
        AccountsHttpModule,
        ProjectsHttpModule,
        PermissionsHttpModule,
    ],
})
export class ResourceModule {}