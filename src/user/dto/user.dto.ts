import { IsEmail, IsNotEmpty } from 'class-validator';
import { StatusType } from 'src/kitchen/dto/kitchen.dto';

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

    @IsNotEmpty()
    readonly status: StatusType;
}

export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    readonly name: string;

    readonly dateOfBirth: Date;

    readonly phoneNumber: string

    readonly status: StatusType;
}