import { IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    title: string;

    @IsString()
    type: string;

    // date: DateTime;
}

export class UpdateProjectDto {
    @IsString()
    title: string;

    @IsString()
    type: string;

    // date: DateTime;
}