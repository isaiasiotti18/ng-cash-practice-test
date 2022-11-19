import { UserRepositoryInterface } from '../../core/domain/users/interfaces/user-repository.interface';
import { UserEntityTypeOrm } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserOutput } from 'src/core/domain/users/interfaces/user-output.interface';
import { User } from 'src/core/domain/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntityTypeOrm)
    private repository: Repository<UserEntityTypeOrm>,
  ) {}

  async findAllUsers(): Promise<UserOutput[]> {
    const users = await this.repository.find({
      select: {
        id: true,
        username: true,
        accountId: true,
      },
    });

    return users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        password: undefined,
        accountId: user.accountId,
      };
    });
  }

  async userExists(username: string): Promise<boolean> {
    const user = await this.repository.findOneBy({ username });
    return user ? true : false;
  }

  async findByUsername(username: string): Promise<UserOutput | undefined> {
    const user = await this.repository.findOneBy({
      username,
    });

    return {
      id: user?.id,
      username: user?.username,
      password: user?.password,
      accountId: user?.accountId,
    };
  }

  createUserInRepository(user: User): User {
    const createUser = this.repository.create(user);
    return createUser;
  }

  async saveUserInDatabase(user: User): Promise<UserOutput> {
    const newUser = await this.repository?.save(user);

    return {
      id: newUser.id,
      username: newUser.username,
      password: undefined,
      accountId: newUser.accountId,
    };
  }
}
