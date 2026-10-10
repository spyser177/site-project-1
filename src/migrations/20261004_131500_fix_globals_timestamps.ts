import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "header_settings" ADD COLUMN "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "header_settings" ADD COLUMN "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "footer_settings" ADD COLUMN "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "footer_settings" ADD COLUMN "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  CREATE INDEX "site_settings_updated_at_idx" ON "site_settings" USING btree ("updated_at");
  CREATE INDEX "site_settings_created_at_idx" ON "site_settings" USING btree ("created_at");
  CREATE INDEX "home_page_updated_at_idx" ON "home_page" USING btree ("updated_at");
  CREATE INDEX "home_page_created_at_idx" ON "home_page" USING btree ("created_at");
  CREATE INDEX "header_settings_updated_at_idx" ON "header_settings" USING btree ("updated_at");
  CREATE INDEX "header_settings_created_at_idx" ON "header_settings" USING btree ("created_at");
  CREATE INDEX "footer_settings_updated_at_idx" ON "footer_settings" USING btree ("updated_at");
  CREATE INDEX "footer_settings_created_at_idx" ON "footer_settings" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "site_settings_updated_at_idx";
  DROP INDEX "site_settings_created_at_idx";
  DROP INDEX "home_page_updated_at_idx";
  DROP INDEX "home_page_created_at_idx";
  DROP INDEX "header_settings_updated_at_idx";
  DROP INDEX "header_settings_created_at_idx";
  DROP INDEX "footer_settings_updated_at_idx";
  DROP INDEX "footer_settings_created_at_idx";
  ALTER TABLE "site_settings" DROP COLUMN "updated_at";
  ALTER TABLE "site_settings" DROP COLUMN "created_at";
  ALTER TABLE "home_page" DROP COLUMN "updated_at";
  ALTER TABLE "home_page" DROP COLUMN "created_at";
  ALTER TABLE "header_settings" DROP COLUMN "updated_at";
  ALTER TABLE "header_settings" DROP COLUMN "created_at";
  ALTER TABLE "footer_settings" DROP COLUMN "updated_at";
  ALTER TABLE "footer_settings" DROP COLUMN "created_at";`)
}
