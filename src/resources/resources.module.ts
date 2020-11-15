import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { ProjectModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [AccountsModule, ProjectModule, UsersModule],
})
export class ResourceModule {}