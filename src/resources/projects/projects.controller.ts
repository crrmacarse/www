import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import * as ROUTES from 'constants/routes';
import { ListAllEntities } from 'constants/dto';
import { CreateProjectDto, UpdateProjectDto } from './projects.dto';

@Controller(ROUTES.PROJECTS)
export class ProjectsController {
    @Get()
    findAll(@Query() query: ListAllEntities): Observable<any[]> {
        console.log(`This action returns all projects (limit: ${query.limit} items)`)        

        return of([]);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return `Return project with id ${id}`;
    }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        console.log(createProjectDto)

        return 'Create a project'
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
        console.log(updateProjectDto)

        return 'Update a project'
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return `Delete this project ${id}`
    }
}
