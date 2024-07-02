import { IsNotEmpty } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    readonly city: string;

    @IsNotEmpty()
    readonly address: string;

    @IsNotEmpty()
    readonly pinCode: number;

    @IsNotEmpty()
    readonly state: string;
}

export class UpdateAddressDto {
    readonly city: string;

    readonly address: string;

    readonly pinCode: number;

    readonly state: string;
}