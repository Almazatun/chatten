import { MigrationInterface, QueryRunner } from "typeorm";

export class addGroupMembersMessagesGroups1653928261973 implements MigrationInterface {
  name = "addGroupMembersMessagesGroups1653928261973";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "group_members" (
    "groupId" uuid NOT NULL, 
    "userId" uuid NOT NULL, CONSTRAINT "PK_53f644f66a416c1542b743c0295" PRIMARY KEY ("groupId", "userId"))`);
    await queryRunner.query(`CREATE TABLE "groups" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
    "title" character varying NOT NULL, 
    "createdAt" TIMESTAMP, 
    "updatedAt" TIMESTAMP, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "messages" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
    "text" character varying NOT NULL, 
    "createdAt" TIMESTAMP, 
    "updatedAt" TIMESTAMP, 
    "userId" uuid NOT NULL, 
    "groupId" uuid NOT NULL, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_1aa8d31831c3126947e7a713c2b" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_fdef099303bcf0ffd9a4a7b18f5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e"`);
    await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
    await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_fdef099303bcf0ffd9a4a7b18f5"`);
    await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_1aa8d31831c3126947e7a713c2b"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TABLE "group_members"`);
  }
}
