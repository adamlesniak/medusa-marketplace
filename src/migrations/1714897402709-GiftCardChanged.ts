import { MigrationInterface, QueryRunner } from "typeorm";

export class GiftCardChanged1714897402709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gift_card" ADD "store_id" character varying`);
        await queryRunner.query(`CREATE INDEX "GiftCardStoreId" ON "gift_card" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."GiftCardStoreId"`);
        await queryRunner.query(`ALTER TABLE "gift_card" DROP COLUMN "store_id"`);
    }
}