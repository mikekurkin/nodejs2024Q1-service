import { MigrationInterface, QueryRunner } from "typeorm";

export class User1710513679603 implements MigrationInterface {
    name = 'User1710513679603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "_password"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "updatedAt" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "createdAt" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "_password" character varying NOT NULL`);
    }

}
