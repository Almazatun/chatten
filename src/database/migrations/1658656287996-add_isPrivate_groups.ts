import { MigrationInterface, QueryRunner } from "typeorm";

export class addIsPrivateGroups1658656287996 implements MigrationInterface {
  name = "addIsPrivateGroups1658656287996";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "groups" ADD "isPrivate" boolean NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "isPrivate"`);
  }
}
