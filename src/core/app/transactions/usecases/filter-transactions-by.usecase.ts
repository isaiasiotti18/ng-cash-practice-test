import { TransactionRepositoryInterface } from './../../../domain/transactions/interfaces/transaction-repository.interface';
import { UserRepositoryInterface } from 'src/core/domain/users/interfaces/user-repository.interface';
import { FilterTransactions } from 'src/core/domain/transactions/interfaces/filter-transactions.interface';
import { TransactionOutput } from 'src/core/domain/transactions/interfaces/transaction-output.interface';

export class FilterTransactionsByDateOrCashoutOrCashIn {
  constructor(
    private userRepository: UserRepositoryInterface,
    private transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(
    userId: string,
    filters: FilterTransactions,
  ): Promise<TransactionOutput[] | []> {
    const user = await this.userRepository.findByUserId(userId);

    if (!user) throw new Error('User was not found!');

    const transactions = await this.transactionRepository.filterTransactionsBy(
      user.accountId,
      filters,
    );

    return await transactions;
  }
}
