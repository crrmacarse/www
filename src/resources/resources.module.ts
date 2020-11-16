import { Module } from '@nestjs/common';
import { AccountsHttpModule } from './accounts/accounts-http.module';
import { ProjectsHttpModule } from './projects/projects-http.module';

@Module({
    imports: [AccountsHttpModule, ProjectsHttpModule],
})
export class ResourceModule {}