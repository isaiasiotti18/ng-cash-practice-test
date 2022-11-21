import { Account } from './../../../domain/accounts/account.entity';
import { User, UserProps } from '../../../domain/users/user.entity';
import { UserOutput } from '../../../domain/users/interfaces/user-output.interface';
import { UserRepositoryInterface } from '../../../domain/users/interfaces/user-repository.interface';
import { AccountRepositoryInterface } from '../../../domain/accounts/interfaces/account-repository.interface';

export class CreateUserAndAccountUsecase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private accountRepository: AccountRepositoryInterface,
  ) {}

  async execute({ username, password }: UserProps): Promise<UserOutput> {
    try {
      const userExists = await this.userRepository.userExists(username);

      if (userExists) {
        throw new Error('User already exists.');
      }

      const user = User.create({ username, password });

      if (!user) throw new Error('Unexpected Error creating user');

      const account = Account.create();

      if (!account) throw new Error('Unexpected Error creating account');

      const saveAccountInDatabase =
        await this.accountRepository.saveAccountInDatabase(account);

      if (!saveAccountInDatabase) {
        throw new Error('Unexpected Error creating account');
      }

      const saveUserInDataBase = await this.userRepository.saveUserInDatabase({
        ...user,
        accountId: saveAccountInDatabase.id,
      });

      return {
        id: saveUserInDataBase.id,
        username: saveUserInDataBase.username,
        password: undefined,
        account: saveAccountInDatabase,
      };
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
