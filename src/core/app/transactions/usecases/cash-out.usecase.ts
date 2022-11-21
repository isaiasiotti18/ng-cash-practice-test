/* eslint-disable prefer-const */
import { AccountRepositoryInterface } from '../../../domain/accounts/interfaces/account-repository.interface';
import {
  TransactionProps,
  Transaction,
} from '../../../domain/transactions/transaction.entity';
import { UserRepositoryInterface } from '../../../domain/users/interfaces/user-repository.interface';
import { TransactionOutput } from '../../../domain/transactions/interfaces/transaction-output.interface';
import { TransactionRepositoryInterface } from '../../../domain/transactions/interfaces/transaction-repository.interface';

export class CashoutUsecase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private accountRepository: AccountRepositoryInterface,
    private transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(
    transactionProps: TransactionProps,
  ): Promise<TransactionOutput> {
    try {
      const { usernameCashIn, debitedAccountId, value } = transactionProps;

      //deve informar o username do usuario que irá receber o dinheiro
      const userCashIn = await this.userRepository.findByUsername(
        usernameCashIn,
      );

      if (!userCashIn) {
        throw new Error('User was not found!');
      }

      //deve ter saldo suficiente
      const accountCashOut = await this.accountRepository.findByAccountId(
        debitedAccountId,
      );

      console.log(`balance: ${accountCashOut.balance}, value: ${value}`);

      if (Number(accountCashOut.balance) < value) {
        throw new Error('Invalid Operation');
      }

      //usuario não pode transferir para si mesmo
      if (debitedAccountId === userCashIn.accountId) {
        throw new Error('Destination account must be different');
      }

      const transaction = Transaction.create({
        creditedAccountId: userCashIn.accountId,
        debitedAccountId,
        value,
      });

      return await this.transactionRepository
        .saveTransactionInDatabase(transaction)
        .then(async (transaction) => {
          await this.accountRepository.cashOut(debitedAccountId, value);
          await this.accountRepository.cashIn(userCashIn.accountId, value);
          return {
            id: transaction.id,
            debitedAccountId: transaction.debitedAccountId,
            creditedAccountId: transaction.creditedAccountId,
            value: transaction.value,
            createdAt: transaction.createdAt,
          };
        })
        .catch(() => {
          throw new Error('it was not possible to carry out the transaction');
        });
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
