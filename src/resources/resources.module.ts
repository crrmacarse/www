import { Module } from '@nestjs/common'
import { ProjectsController } from './projects/projects.controller';

@Module({
    imports: [],
    controllers: [ProjectsController],
})
export class ResourceModule {}