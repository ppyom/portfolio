CREATE TABLE "project_translation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"language" text NOT NULL,
	"title" text,
	"description" text,
	"category" text,
	"overview" text,
	"features" text[],
	"goals" text[],
	"results" text[],
	"member" jsonb,
	"created_at" text NOT NULL,
	"updated_at" text,
	CONSTRAINT "project_translation_project_id_language_unique" UNIQUE("project_id","language")
);
--> statement-breakpoint
ALTER TABLE "project_translation" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "project_translation" ADD CONSTRAINT "project_translation_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "read_all" ON "project_translation" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "project_translation" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "project_translation" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "project_translation" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));