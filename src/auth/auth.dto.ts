import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    uid: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    old_password: string;

    @IsNotEmpty()
    @IsString()
    new_password: string;
}