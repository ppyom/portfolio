CREATE TABLE "file" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text
);
--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "cover_image_id" uuid;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "image_ids" uuid[];--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_cover_image_id_file_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."file"("id") ON DELETE cascade ON UPDATE no action;