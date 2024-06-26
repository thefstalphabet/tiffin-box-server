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
    readonly vegan: VeganType

    @IsNotEmpty()
    readonly minOrderPrice: number

    // readonly review: any

    // @IsNotEmpty()
    // readonly dishes: any

    @IsNotEmpty()
    readonly openingTime: Date

    @IsNotEmpty()
    readonly closingTime: Date

}

export class UpdateKitchenDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    readonly name: string;

    readonly phoneNumber: string

    readonly city: string

    readonly address: string

    readonly vegan: VeganType

    readonly minOrderPrice: number

    // readonly review: any

    // @IsNotEmpty()
    // readonly dishes: any

    readonly openingTime: Date

    readonly closingTime: Date
}

export enum StatusType {
    INACTIVE, ACTIVE
}
export enum VeganType {
    NO, YES
}