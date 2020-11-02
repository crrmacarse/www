import { Module } from '@nestjs/common'
import { ProjectModule } from './projects/projects.module'
import { UsersModule } from './users/users.module';

@Module({
    imports: [ProjectModule, UsersModule],
})
export class ResourceModule {}