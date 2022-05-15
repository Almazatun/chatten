import { MigrationInterface, QueryRunner } from "typeorm";

export class user1652630629683 implements MigrationInterface {
  name = "user1652630629683";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
            "id" character varying NOT NULL, 
            "username" character varying NOT NULL, 
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
