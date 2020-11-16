import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class BaseAccountDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 30)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class CreateAccountDto extends BaseAccountDto {}

export class UpdateAccountDto extends BaseAccountDto {}