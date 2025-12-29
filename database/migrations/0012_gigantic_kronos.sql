CREATE TYPE "public"."history_type" AS ENUM('learning', 'certification', 'activity');--> statement-breakpoint
CREATE TABLE "history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid,
	"type" "history_type" NOT NULL,
	"name" text NOT NULL,
	"date" text,
	"description" text,
	"order" integer NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text
);
--> statement-breakpoint
ALTER TABLE "history" ADD CONSTRAINT "history_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;