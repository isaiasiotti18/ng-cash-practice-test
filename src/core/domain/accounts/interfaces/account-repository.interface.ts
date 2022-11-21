import { Account } from '../account.entity';
import { AccountOutput } from './account-output.interface';

export interface AccountRepositoryInterface {
  cashIn(creditedAccountId: string, value: number): Promise<void>;
  cashOut(debitedAccountId: string, value: number): Promise<void>;
  findByAccountId(accountId: string): Promise<AccountOutput>;
  saveAccountInDatabase(account: Account): Promise<AccountOutput>;
}
