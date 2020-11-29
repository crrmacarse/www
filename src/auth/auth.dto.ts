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
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}

export class RefreshTokenDto {
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}