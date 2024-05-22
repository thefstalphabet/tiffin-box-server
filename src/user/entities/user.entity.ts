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
    avatar: string;

    @Column()
    dateOfBirth: Date

    phoneNumber: string;

    city: string;

    address: string;

    @Column()
    active: boolean
}