/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    accountId: string,
    filters: FilterTransactions,
  ): Promise<[] | TransactionOutput[]> {
    const { createdAt, cashIn, cashOut } = filters;

    const queryDate =
      createdAt.toString().length === 10
        ? `DATE(created_at) = '${createdAt}'`
        : '';

    const queryDebitedAccountId =
      cashOut === 'yes' ? `OR "debitedAccountId" = '${accountId}'` : '';

    const queryCreditedAccountId =
      cashIn === 'yes' ? `OR "creditedAccountId" = '${accountId}'` : '';

    const querySelect = `SELECT * FROM transactions WHERE ${queryDate} ${queryDebitedAccountId} ${queryCreditedAccountId}`;

    const transactions = await this.repository.query(querySelect);

    return await transactions;
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
