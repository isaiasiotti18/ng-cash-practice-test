import { BalanceOutput } from '../../../domain/users/interfaces/balance-output.interface';
import { UserRepositoryInterface } from '../../../domain/users/interfaces/user-repository.interface';

export class ViewMyBalanceAccountUsecase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userId: string): Promise<BalanceOutput> {
    try {
      const user = await this.userRepository.findByUserId(userId);

      if (!user) throw new Error('User was not found!');

      return {
        balance: user.account.balance,
      };
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
