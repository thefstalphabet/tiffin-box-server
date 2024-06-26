import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateAddressDto {
    @IsNotEmpty()
    readonly user: User;

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
