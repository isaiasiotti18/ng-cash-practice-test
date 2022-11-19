import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/core/domain/accounts/account.entity';
import { AccountOutput } from 'src/core/domain/accounts/interfaces/account-output.interface';
import { AccountRepositoryInterface } from 'src/core/domain/accounts/interfaces/account-repository.interface';
import { Repository } from 'typeorm';
import { AccountEntityTypeOrm } from './entities/account.entity';

@Injectable()
export class AccountRepository implements AccountRepositoryInterface {
  constructor(
    @InjectRepository(AccountEntityTypeOrm)
    private repository: Repository<AccountEntityTypeOrm>,
  ) {}

  async findByAccountId(accountId: string): Promise<AccountOutput> {
    const account = await this.repository.findOneBy({
      id: accountId,
    });

    return {
      id: account.id,
      balance: account.balance,
    };
  }
  async saveAccountInDatabase(account: Account): Promise<AccountOutput> {
    const newAccount = await this?.repository.save({ ...account });

    return {
      id: newAccount.id,
      balance: newAccount.balance,
    };
  }
}
