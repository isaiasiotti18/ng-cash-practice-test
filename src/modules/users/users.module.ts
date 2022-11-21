import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { FindAllUsersUsecase } from '../../core/app/users/usecases/find-all-users.usecase';
import { ViewMyBalanceAccountUsecase } from '../../core/app/users/usecases/view-my-balance-account.usecase';
import { CreateUserAndAccountUsecase } from '../../core/app/users/usecases/create-user-and-account.usecase';

import { AccountRepositoryInterface } from '../../core/domain/accounts/interfaces/account-repository.interface';
import { UserRepositoryInterface } from '../../core/domain/users/interfaces/user-repository.interface';

import { AccountRepository } from '../accounts/account.repository';
import { UserRepository } from './user.repository';

import { UserEntityTypeOrm } from './entities/user.entity';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [AccountsModule, TypeOrmModule.forFeature([UserEntityTypeOrm])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    {
      provide: CreateUserAndAccountUsecase,
      useFactory: (
        userRepository: UserRepositoryInterface,
        accountRepository: AccountRepositoryInterface,
      ) => {
        return new CreateUserAndAccountUsecase(
          userRepository,
          accountRepository,
        );
      },
      inject: [UserRepository, AccountRepository],
    },
    {
      provide: FindAllUsersUsecase,
      useFactory: (userRepository: UserRepositoryInterface) => {
        return new FindAllUsersUsecase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: ViewMyBalanceAccountUsecase,
      useFactory: (userRepository: UserRepositoryInterface) => {
        return new ViewMyBalanceAccountUsecase(userRepository);
      },
      inject: [UserRepository],
    },
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
