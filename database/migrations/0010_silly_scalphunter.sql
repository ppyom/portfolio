CREATE TABLE "skill_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"order" integer NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text
);
--> statement-breakpoint
CREATE TABLE "skill_metadata" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text
);
--> statement-breakpoint
CREATE TABLE "skill" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category_id" uuid NOT NULL,
	"description" text,
	"created_at" text NOT NULL,
	"updated_at" text
);
--> statement-breakpoint
ALTER TABLE "skill" ADD CONSTRAINT "skill_category_id_skill_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."skill_category"("id") ON DELETE cascade ON UPDATE no action;