import { Injectable } from '@nestjs/common';
import { Project } from './projects.interface';

@Injectable()
export class ProjectsService {
    private readonly projects: Project[] = [];

    create(project: Project) {
        this.projects.push(project);
    }

    findAll(): Project[] {
        return this.projects;
    }
}
