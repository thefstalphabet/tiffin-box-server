import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { StatusType, VeganType } from '../dto/kitchen.dto';

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

    @Column({
        type: 'enum',
        enum: VeganType,
    })
    vegan: VeganType;

    @Column({
        type: 'enum',
        enum: StatusType,
    })
    status: StatusType;

    @Column({ nullable: false })
    minOrderPrice: number

    @Column({ nullable: false, type: "time" })
    openingTime: Date

    @Column({ nullable: false })
    closingTime: Date
}