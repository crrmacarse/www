import { IsString, isNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    // date: DateTime;
}

export class UpdateProjectDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    // date: DateTime;
}