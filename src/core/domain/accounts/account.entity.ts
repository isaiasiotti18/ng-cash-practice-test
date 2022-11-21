/* eslint-disable prettier/prettier */

export class Account {
  public readonly id?: string;
  public balance = 100.00;

  static create(): Account {
    return new Account();
  }
}
