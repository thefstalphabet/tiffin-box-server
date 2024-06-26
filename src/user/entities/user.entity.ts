import { Address } from 'src/address/entities/address.entity';
import { StatusType } from 'src/kitchen/dto/kitchen.dto';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    _id: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    name: string;

    @Column()
    dateOfBirth: Date

    @Column()
    phoneNumber: string;

    // @Column()
    // city: string;

    // @Column()
    // address: string;

    @Column()
    addresses: Address[]

    @Column({
        type: 'enum',
        enum: StatusType,
    })
    status: StatusType;
}