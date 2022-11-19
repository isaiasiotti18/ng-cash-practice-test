import { User } from '../user.entity';
import { UserOutput } from './user-output.interface';

export interface UserRepositoryInterface {
  findAllUsers(): Promise<UserOutput[]>;
  userExists(username: string): Promise<boolean>;
  findByUsername(username: string): Promise<UserOutput | undefined>;
  createUserInRepository(user: User): User;
  saveUserInDatabase(user: User): Promise<UserOutput>;
}
