import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AccountEntityTypeOrm } from '../../accounts/entities/account.entity';

@Entity('users')
export class UserEntityTypeOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => AccountEntityTypeOrm)
  @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
  account: AccountEntityTypeOrm;

  @Column()
  accountId: string;
}
