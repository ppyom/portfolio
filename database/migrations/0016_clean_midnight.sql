ALTER TABLE "contact" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "education" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "experience" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "file" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "history" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profile" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "project" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "skill_category" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "skill_metadata" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "skill" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "project_tech_stack" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "read_all" ON "contact" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_all" ON "contact" AS PERMISSIVE FOR INSERT TO public USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "contact" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "contact" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "contact" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "education" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "education" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "education" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "education" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "experience" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "experience" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "experience" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "experience" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "file" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "file" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "file" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "file" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "history" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "history" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "history" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "history" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "profile" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "profile" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "profile" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "profile" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "project" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "project" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "project" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "project" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "skill_category" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "skill_category" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "skill_category" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "skill_category" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "skill_metadata" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "skill_metadata" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "skill_metadata" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "skill_metadata" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "skill" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "skill" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "skill" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "skill" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "project_tech_stack" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_admin" ON "project_tech_stack" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "project_tech_stack" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "project_tech_stack" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "read_all" ON "user" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "insert_all" ON "user" AS PERMISSIVE FOR INSERT TO public USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "update_self" ON "user" AS PERMISSIVE FOR UPDATE TO public USING ($1 = auth.uid()) WITH CHECK ($1 = auth.uid());--> statement-breakpoint
CREATE POLICY "insert_admin" ON "user" AS PERMISSIVE FOR INSERT TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "update_admin" ON "user" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));--> statement-breakpoint
CREATE POLICY "delete_admin" ON "user" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE));