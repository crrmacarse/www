import { IsString, IsNotEmpty, Length, IsArray } from 'class-validator';
import { workedOnType } from './projects.interface';

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
}

export class CreateProjectDto extends BaseProjectDto {}

export class UpdateProjectDto extends BaseProjectDto {}