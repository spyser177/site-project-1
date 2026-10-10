import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"telegram" varchar,
  	"whatsapp" varchar,
  	"address" varchar,
  	"legal_name" varchar,
  	"inn" varchar,
  	"ogrn" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_button_text" varchar,
  	"hero_button_link" varchar,
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"cta_button_text" varchar,
  	"cta_button_link" varchar
  );
  
  CREATE TABLE "home_page_advantages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "home_page_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"text" varchar NOT NULL,
  	"rating" numeric
  );
  
  CREATE TABLE "header_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"phone" varchar,
  	"telegram_url" varchar,
  	"whatsapp_url" varchar,
  	"email" varchar
  );
  
  CREATE TABLE "header_settings_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "footer_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"telegram_url" varchar,
  	"whatsapp_url" varchar,
  	"email" varchar,
  	"legal_name" varchar,
  	"inn" varchar,
  	"ogrn" varchar,
  	"copyright" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_advantages" ADD CONSTRAINT "home_page_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_faq" ADD CONSTRAINT "home_page_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_reviews" ADD CONSTRAINT "home_page_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_settings" ADD CONSTRAINT "header_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_settings_menu" ADD CONSTRAINT "header_settings_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_image_idx" ON "pages" USING btree ("image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "home_page_advantages_order_idx" ON "home_page_advantages" USING btree ("_order");
  CREATE INDEX "home_page_advantages_parent_id_idx" ON "home_page_advantages" USING btree ("_parent_id");
  CREATE INDEX "home_page_faq_order_idx" ON "home_page_faq" USING btree ("_order");
  CREATE INDEX "home_page_faq_parent_id_idx" ON "home_page_faq" USING btree ("_parent_id");
  CREATE INDEX "home_page_reviews_order_idx" ON "home_page_reviews" USING btree ("_order");
  CREATE INDEX "home_page_reviews_parent_id_idx" ON "home_page_reviews" USING btree ("_parent_id");
  CREATE INDEX "header_settings_logo_idx" ON "header_settings" USING btree ("logo_id");
  CREATE INDEX "header_settings_menu_order_idx" ON "header_settings_menu" USING btree ("_order");
  CREATE INDEX "header_settings_menu_parent_id_idx" ON "header_settings_menu" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TABLE "pages" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_advantages" CASCADE;
  DROP TABLE "home_page_faq" CASCADE;
  DROP TABLE "home_page_reviews" CASCADE;
  DROP TABLE "header_settings" CASCADE;
  DROP TABLE "header_settings_menu" CASCADE;
  DROP TABLE "footer_settings" CASCADE;`)
}
