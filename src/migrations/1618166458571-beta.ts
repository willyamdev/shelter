import {MigrationInterface, QueryRunner} from "typeorm";

export class beta1618166458571 implements MigrationInterface {
    name = 'beta1618166458571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emailAuthorization" ("id" SERIAL NOT NULL, "code" character varying, "codeIv" character varying, CONSTRAINT "PK_85b9cd654c8bea7df4bd5c8c676" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "emailAuthorizationId" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_ddd883d53dd9533a1d370c8c29" UNIQUE ("emailAuthorizationId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "password" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "initializationVector" character varying NOT NULL, CONSTRAINT "PK_cbeb55948781be9257f44febfa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ddd883d53dd9533a1d370c8c296" FOREIGN KEY ("emailAuthorizationId") REFERENCES "emailAuthorization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ddd883d53dd9533a1d370c8c296"`);
        await queryRunner.query(`DROP TABLE "password"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "emailAuthorization"`);
    }

}
