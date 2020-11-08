import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { ProjectModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [AccountModule, ProjectModule, UsersModule],
})
export class ResourceModule {}