import { AccountOutput } from '../../accounts/interfaces/account-output.interface';

export interface UserOutput {
  id: string;
  username: string;
  password: string;
  accountId?: string | undefined;
  account?: AccountOutput;
}
