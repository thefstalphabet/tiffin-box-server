import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly name: string;

    readonly dateOfBirth: Date;
    
    readonly phoneNumber: string
}

export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    readonly name: string;

    readonly dateOfBirth: Date;

    readonly phoneNumber: string
}