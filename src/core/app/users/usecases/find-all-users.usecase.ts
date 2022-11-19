import { UserOutput } from 'src/core/domain/users/interfaces/user-output.interface';
import { UserRepositoryInterface } from 'src/core/domain/users/interfaces/user-repository.interface';

export class FindAllUsersUsecase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(): Promise<UserOutput[]> {
    return await this.userRepository.findAllUsers();
  }
}
