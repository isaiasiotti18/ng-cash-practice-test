import { FindAllUsersUsecase } from './../../core/app/users/usecases/find-all-users.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepositoryInterface } from '../../core/domain/accounts/interfaces/account-repository.interface';
import { CreateUserAndAccountUsecase } from '../../core/app/users/usecases/create-user-and-account.usecase';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { UserRepositoryInterface } from '../../core/domain/users/interfaces/user-repository.interface';
import { AccountRepository } from '../accounts/account.repository';
import { AccountsModule } from '../accounts/accounts.module';
import { UserEntityTypeOrm } from './entities/user.entity';

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
  ],
})
export class UsersModule {}
