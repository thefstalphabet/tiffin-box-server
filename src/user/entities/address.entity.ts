import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ObjectIdColumn, ManyToOne } from 'typeorm';

@Entity()
export class Address {
    @ObjectIdColumn()
    _id: string;

    @Column()
    user: User;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    pinCode: number;

    @Column({ nullable: false })
    state: string;
}