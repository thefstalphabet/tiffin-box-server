import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly name: string;

    readonly dateOfBirth: Date;

    @IsNotEmpty()
    readonly phoneNumber: string

    @IsNotEmpty()
    readonly city: string

    @IsNotEmpty()
    readonly address: string
}