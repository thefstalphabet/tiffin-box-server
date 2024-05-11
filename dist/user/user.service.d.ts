import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto>;
}
