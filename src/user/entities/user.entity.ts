import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    _id: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    name: string;

    @Column()
    avatar: string;

    @Column()
    dateOfBirth: Date

    @Column({ nullable: false })
    phoneNumber: string;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    address: string;

    @Column()
    active: boolean
}