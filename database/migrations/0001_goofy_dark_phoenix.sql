CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" text,
	"cover_image_url" text,
	"github_url" text,
	"application_url" text,
	"tags" text[],
	"overview" text,
	"features" text[],
	"images" text[],
	"goals" text[],
	"results" text[],
	"member" jsonb
);
--> statement-breakpoint
CREATE TABLE "project_tech_stack" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" text,
	"stacks" text[]
);
--> statement-breakpoint
ALTER TABLE "project_tech_stack" ADD CONSTRAINT "project_tech_stack_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;