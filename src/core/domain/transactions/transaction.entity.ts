export type TransactionProps = {
  readonly id?: string;
  usernameCashIn?: string;
  readonly debitedAccountId?: string;
  readonly creditedAccountId?: string;
  value: number;
  readonly createdAt?: Date;
};

export class Transaction {
  public readonly id?: string;
  public readonly debitedAccountId?: string;
  public readonly creditedAccountId?: string;
  value: number;
  public readonly createdAt?: Date;

  constructor({
    debitedAccountId,
    creditedAccountId,
    value,
  }: TransactionProps) {
    this.debitedAccountId = debitedAccountId;
    this.creditedAccountId = creditedAccountId;
    this.value = value;
  }

  static create(props: TransactionProps) {
    try {
      const { debitedAccountId, creditedAccountId, value } = props;

      return new Transaction({
        debitedAccountId,
        creditedAccountId,
        value,
      });
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
