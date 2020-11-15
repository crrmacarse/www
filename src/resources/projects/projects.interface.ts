import { BaseInterface } from 'constants/base.interface';

export type workedOnType = 'Personal' | 'Waffle Time' | 'Project Assistant' | 'XtendOps';
export interface Project extends BaseInterface {
    title: string;
    description: string;
    workedOn: workedOnType;
    tags: string[];
    links: any;
}