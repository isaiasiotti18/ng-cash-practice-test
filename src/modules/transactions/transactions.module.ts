import { UsersModule } from './../users/users.module';
import { TransactionRepository } from './transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionEntityTypeOrm } from './entities/transaction.entity';
import { CashoutUsecase } from '../../core/app/transactions/usecases/cash-out.usecase';
import { AccountRepositoryInterface } from 'src/core/domain/accounts/interfaces/account-repository.interface';
import { TransactionRepositoryInterface } from 'src/core/domain/transactions/interfaces/transaction-repository.interface';
import { UserRepositoryInterface } from 'src/core/domain/users/interfaces/user-repository.interface';
import { UserRepository } from '../users/user.repository';
import { AccountRepository } from '../accounts/account.repository';
import { AccountsModule } from '../accounts/accounts.module';
import { FilterTransactionsByDateOrCashoutOrCashIn } from 'src/core/app/transactions/usecases/filter-transactions-by.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntityTypeOrm]),
    UsersModule,
    AccountsModule,
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionRepository,
    {
      provide: CashoutUsecase,
      useFactory: (
        userRepository: UserRepositoryInterface,
        accountRepository: AccountRepositoryInterface,
        transactionRepository: TransactionRepositoryInterface,
      ) => {
        return new CashoutUsecase(
          userRepository,
          accountRepository,
          transactionRepository,
        );
      },
      inject: [UserRepository, AccountRepository, TransactionRepository],
    },
    {
      provide: FilterTransactionsByDateOrCashoutOrCashIn,
      useFactory: (
        userRepository: UserRepositoryInterface,
        transactionRepository: TransactionRepositoryInterface,
      ) => {
        return new FilterTransactionsByDateOrCashoutOrCashIn(
          userRepository,
          transactionRepository,
        );
      },
      inject: [UserRepository, TransactionRepository],
    },
  ],
})
export class TransactionsModule {}
