import { MigrationInterface, QueryRunner } from "typeorm";

export class CartChanged1714817217773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "store_id" character varying`);
        await queryRunner.query(`CREATE INDEX "CartStoreId" ON "cart" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."CartStoreId"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "store_id"`);
    }

}
