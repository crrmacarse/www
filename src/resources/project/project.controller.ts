import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import * as ROUTES from 'constants/routes';
import { ListAllEntities } from 'constants/dto';
import { ParseParamIntPipe } from 'pipes/parse-param-int.pipe';
import { Roles } from 'decorators/roles.decorator';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { ProjectService } from './project.service';
import { Project } from './project.interface';

@Controller(ROUTES.PROJECTS)
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Get()
    async findAll(@Query() query: ListAllEntities): Promise<Project[]> {
        console.log(`This action returns all projects (limit: ${query.limit} items)`);        

        return this.projectService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseParamIntPipe()) id: number) {
        return `Return project with id ${id}`;
    }

    /**
     * Submitting must be application/json and "raw"
     * 
     * refer: https://stackoverflow.com/questions/61086951/why-body-in-post-request-is-not-working-properly-nest-js
     */
    @Post()
    @Roles('admin')
    async create(@Body() createProjectDto: CreateProjectDto) {
        this.projectService.create(createProjectDto);
    }

    @Put(':id')
    async update(@Param('id', new ParseParamIntPipe()) id: number, @Body() updateProjectDto: UpdateProjectDto) {
        console.log(updateProjectDto);

        return 'Update a project';
    }

    @Delete(':id')
    async delete(@Param('id', new ParseParamIntPipe()) id: number) {
        return `Delete this project ${id}`;
    }
}
