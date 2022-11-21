import { TransactionEntityTypeOrm } from './entities/transaction.entity';
import { TransactionRepositoryInterface } from '../../core/domain/transactions/interfaces/transaction-repository.interface';
import { Injectable } from '@nestjs/common';
import { TransactionOutput } from 'src/core/domain/transactions/interfaces/transaction-output.interface';
import { Transaction } from 'src/core/domain/transactions/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterTransactions } from 'src/core/domain/transactions/interfaces/filter-transactions.interface';

@Injectable()
export class TransactionRepository implements TransactionRepositoryInterface {
  constructor(
    @InjectRepository(TransactionEntityTypeOrm)
    private repository: Repository<TransactionEntityTypeOrm>,
  ) {}
  async filterTransactionsBy(
    userId: string,
    filters: FilterTransactions,
  ): Promise<[] | TransactionOutput[]> {
    const { createdAt, cashIn, cashOut } = filters;

    const debitedAccountId = cashOut ? userId : '';
    const creditedAccountId = cashIn ? userId : '';

    return await this.repository
      .createQueryBuilder()
      .select([
        'id',
        'debitedAccountId',
        'creditedAccountId',
        'value',
        'to_char(created_at, "DD-MM-YYYY") As createdAt',
      ])
      .where('created_at = :createdAt', { createdAt })
      .orWhere('debitedAccountId = :debitedAccountId', { debitedAccountId })
      .orWhere('creditedAccountId = :creditedAccountId', { creditedAccountId })
      .getMany();
  }
  async saveTransactionInDatabase(
    transaction: Transaction,
  ): Promise<TransactionOutput> {
    return await this.repository.save({
      value: transaction.value,
      debitedAccountId: transaction.debitedAccountId,
      creditedAccountId: transaction.creditedAccountId,
    });
  }
}
