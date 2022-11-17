import { AccountEntityTypeOrm } from './../../accounts/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class TransactionEntityTypeOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntityTypeOrm, {})
  @JoinColumn({
    name: 'debitedAccountId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'transaction_DebitedAccount',
  })
  debitedAccount: AccountEntityTypeOrm;

  @ManyToOne(() => AccountEntityTypeOrm, {})
  @JoinColumn({
    name: 'creditedAccountId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'transaction_CreditedAccount',
  })
  creditedAccount: AccountEntityTypeOrm;

  @Column({ type: 'uuid' })
  debitedAccountId: string;

  @Column({ type: 'uuid' })
  creditedAccountId: string;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 9,
  })
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
