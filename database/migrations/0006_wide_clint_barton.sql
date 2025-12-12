ALTER TABLE "project" DROP CONSTRAINT "project_cover_image_id_file_id_fk";
--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_cover_image_id_file_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."file"("id") ON DELETE set null ON UPDATE no action;