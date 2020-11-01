import { Module } from '@nestjs/common'
import { ProjectModule } from './projects/projects.module'

@Module({
    imports: [ProjectModule],
})
export class ResourceModule {}