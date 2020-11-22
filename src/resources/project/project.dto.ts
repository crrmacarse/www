import { IsString, IsNotEmpty, Length, IsArray, IsInt } from 'class-validator';
import { workedOnType } from './project.interface';

export class BaseProjectDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 25)
    title: string; 

    @IsNotEmpty()
    @IsString()
    @Length(20)
    description: string;

    @IsNotEmpty()
    @IsString()
    workedOn: workedOnType;

    @IsArray()
    tags: [];

    // @IsJSON()
    links: any;

    @IsInt()
    priority: number;
}

export class CreateProjectDto extends BaseProjectDto {}

export class UpdateProjectDto extends BaseProjectDto {}