import { Module } from '@nestjs/common';
import { AccountsHttpModule } from './accounts/accounts-http.module';
import { ProjectsHttpModule } from './projects/projects-http.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [AccountsHttpModule, ProjectsHttpModule, UsersModule],
})
export class ResourceModule {}