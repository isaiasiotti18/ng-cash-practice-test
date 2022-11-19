/* eslint-disable prettier/prettier */

export class Account {
  public readonly id?: string;
  public balance: number;

  static create(): Account {
    return new Account();
  }

  getAccountId() {
    return this.id
  }
}
