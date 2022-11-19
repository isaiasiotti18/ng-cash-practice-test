import { Account } from '../account.entity';
import { AccountOutput } from './account-output.interface';

export interface AccountRepositoryInterface {
  findByAccountId(accountId: string): Promise<AccountOutput>;
  saveAccountInDatabase(account: Account): Promise<AccountOutput>;
}
