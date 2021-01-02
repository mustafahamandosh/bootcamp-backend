import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFieldToUsers1609546880674
  implements MigrationInterface {
  private queryRunner: void | undefined;

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'avatar', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = await queryRunner.dropColumn('users', 'avatar');
  }
}
