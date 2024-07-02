import { StatusType } from 'src/kitchen/dto/kitchen.dto';
import { Entity, Column, ObjectIdColumn, OneToMany } from 'typeorm';
import { Address } from './address.entity';

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

    @Column()
    addresses: Address[];

    @Column({
        type: 'enum',
        enum: StatusType,
    })
    status: StatusType;
}