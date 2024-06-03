import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
}
