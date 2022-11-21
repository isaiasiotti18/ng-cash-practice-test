import { FilterTransactions } from 'src/core/domain/transactions/interfaces/filter-transactions.interface';
import { Transaction } from '../transaction.entity';
import { TransactionOutput } from './transaction-output.interface';

export interface TransactionRepositoryInterface {
  filterTransactionsBy(
    id: string,
    filters: FilterTransactions,
  ): Promise<TransactionOutput[] | []>;
  saveTransactionInDatabase(
    transaction: Transaction,
  ): Promise<TransactionOutput>;
}
