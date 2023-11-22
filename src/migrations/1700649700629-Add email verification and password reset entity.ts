import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailVerificationAndPasswordResetEntity1700649700629 implements MigrationInterface {
    name = 'AddEmailVerificationAndPasswordResetEntity1700649700629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."email_verification_status_enum" AS ENUM('verified', 'not_verified')`);
        await queryRunner.query(`CREATE TABLE "email_verification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "status" "public"."email_verification_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_e7eb5e3c3dd984d69f6eb1cdf1" UNIQUE ("user_id"), CONSTRAINT "PK_b985a8362d9dac51e3d6120d40e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "password_reset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "token" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8515e60a2cc41584fa4784f52ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "email_verification" ADD CONSTRAINT "FK_e7eb5e3c3dd984d69f6eb1cdf1c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification" DROP CONSTRAINT "FK_e7eb5e3c3dd984d69f6eb1cdf1c"`);
        await queryRunner.query(`DROP TABLE "password_reset"`);
        await queryRunner.query(`DROP TABLE "email_verification"`);
        await queryRunner.query(`DROP TYPE "public"."email_verification_status_enum"`);
    }

}
