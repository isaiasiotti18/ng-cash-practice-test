import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableUsers1668893043346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'accountId',
      new TableColumn({
        name: 'accountId',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'accountId',
      new TableColumn({
        name: 'accountId',
        type: 'uuid',
      }),
    );
  }
}
