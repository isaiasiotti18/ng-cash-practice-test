import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablesUsersAccountsTransactions1668520121662
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SET TIMEZONE TO America/Sao_Paulo');
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '100',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '61',
          },
          {
            name: 'accountId',
            type: 'uuid',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'balance',
            type: 'decimal',
            isNullable: false,
            default: 0,
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'debitedAccountId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'creditedAccountId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'users_account',
        columnNames: ['accountId'],
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'transaction_DebitedAccount',
        columnNames: ['debitedAccountId'],
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'transaction_CreditedAccount',
        columnNames: ['creditedAccountId'],
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('accounts');
    await queryRunner.dropTable('transactions');
    await queryRunner.dropForeignKey('users', 'users_account');
    await queryRunner.dropForeignKey('users', 'transaction_DebitedAccount');
    await queryRunner.dropForeignKey('users', 'transaction_CreditedAccount');
  }
}
