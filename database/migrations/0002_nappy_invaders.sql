ALTER TABLE "project" ADD COLUMN "created_at" text NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "updated_at" text;--> statement-breakpoint
ALTER TABLE "project_tech_stack" ADD COLUMN "created_at" text NOT NULL;--> statement-breakpoint
ALTER TABLE "project_tech_stack" ADD COLUMN "updated_at" text;