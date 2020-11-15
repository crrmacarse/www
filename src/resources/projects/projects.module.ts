import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './projects.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Projects])],
    exports: [TypeOrmModule],
})
export class ProjectsModule {}