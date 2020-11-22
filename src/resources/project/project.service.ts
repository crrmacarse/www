import { Injectable } from '@nestjs/common';
import { Project } from './project.interface';

@Injectable()
export class ProjectService {
    private readonly projects: Project[] = [];

    create(project: Project) {
        this.projects.push(project);
    }

    findAll(): Project[] {
        return this.projects;
    }
}
