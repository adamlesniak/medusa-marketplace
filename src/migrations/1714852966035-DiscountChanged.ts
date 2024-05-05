import { MigrationInterface, QueryRunner } from "typeorm";

export class DiscountChanged1714852966035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount" ADD "store_id" character varying`);
        await queryRunner.query(`CREATE INDEX "DiscountStoreId" ON "order" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."DiscountStoreId"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "store_id"`);
    }
}
