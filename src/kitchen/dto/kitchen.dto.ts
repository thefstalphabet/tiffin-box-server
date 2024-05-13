import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateKitchenDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly phoneNumber: string

    @IsNotEmpty()
    readonly city: string

    @IsNotEmpty()
    readonly address: string

    @IsNotEmpty()
    readonly vegan: boolean

    @IsNotEmpty()
    readonly minOrderPrice: number

    // readonly review: any

    // @IsNotEmpty()
    // readonly dishes: any

    @IsNotEmpty()
    readonly openingTime: string

    @IsNotEmpty()
    readonly closingTime: string

}

export class UpdateKitchenDto {
}