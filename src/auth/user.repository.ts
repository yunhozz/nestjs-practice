import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from '../config/custom-repository.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
