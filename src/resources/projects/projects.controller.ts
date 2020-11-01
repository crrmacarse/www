import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import * as ROUTES from 'constants/routes';
import { ListAllEntities } from 'constants/dto';
import { ParseParamIntPipe } from 'pipes/parse-param-int.pipe'
import { CreateProjectDto, UpdateProjectDto } from './projects.dto';
import { ProjectsService } from './projects.service';
import { Project } from './projects.interface';

@Controller(ROUTES.PROJECTS)
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @Get()
    async findAll(@Query() query: ListAllEntities): Promise<Project[]> {
        console.log(`This action returns all projects (limit: ${query.limit} items)`)        

        return this.projectService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseParamIntPipe()) id: number) {
        return `Return project with id ${id}`;
    }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        console.log(createProjectDto)

        this.projectService.create(createProjectDto);
    }

    @Put(':id')
    async update(@Param('id', new ParseParamIntPipe()) id: number, @Body() updateProjectDto: UpdateProjectDto) {
        console.log(updateProjectDto)

        return 'Update a project'
    }

    @Delete(':id')
    async delete(@Param('id', new ParseParamIntPipe()) id: number) {
        return `Delete this project ${id}`
    }
}
