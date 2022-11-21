import { Injectable } from '@nestjs/common';
import { UserOutput } from '../../core/domain/users/interfaces/user-output.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findByUsername(username: string): Promise<UserOutput> {
    try {
      const user = await this.userRepository.findByUsername(username);

      return {
        id: user.id,
        username: user.username,
        password: user.password,
        accountId: user.accountId,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
