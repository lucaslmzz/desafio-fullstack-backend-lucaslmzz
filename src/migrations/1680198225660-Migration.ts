import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1680198225660 implements MigrationInterface {
  name = "Migration1680198225660";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "name" character varying(100) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "UQ_752866c5247ddd34fd05559537d"`
    );
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "email" character varying(100) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "UQ_752866c5247ddd34fd05559537d"`
    );
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "email" character varying(45) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email")`
    );
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "name" character varying(45) NOT NULL`
    );
  }
}
