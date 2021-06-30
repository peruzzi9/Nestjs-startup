import {MigrationInterface, QueryRunner} from "typeorm";

export class addRefreshTokenColumnToUserTable1624523417740 implements MigrationInterface {
    name = 'addRefreshTokenColumnToUserTable1624523417740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "currentHashedRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "currentHashedRefreshToken"`);
    }

}
