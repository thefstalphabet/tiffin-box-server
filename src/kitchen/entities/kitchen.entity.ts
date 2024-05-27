import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Kitchen {
    @ObjectIdColumn()
    _id: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    name: string;

    @Column()
    rating: number

    @Column({ nullable: false })
    phoneNumber: string;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    vegan: boolean

    @Column({ nullable: false })
    active: boolean

    @Column({ nullable: false })
    minOrderPrice: number

    @Column({ nullable: false, type: "time" })
    openingTime: Date

    @Column({ nullable: false })
    closingTime: Date
}