-- Custom SQL migration file, put your code below! --
-- 0016에서 만든 관리자 정책은 식이 비어 있다 (원래 SQL은 INSERT에 USING, DELETE에 WITH CHECK이 섞여 있어 유효하지 않음).
-- ALTER POLICY로는 식을 지울 수 없어서 DROP 후 다시 만든다.
-- insert_all / read_all / update_self는 지금 비어 있어 API 접근이 막혀 있으므로, 권한을 새로 여는 변경은 여기서 하지 않는다.
DROP POLICY IF EXISTS "insert_admin" ON "contact";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "contact" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "contact";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "contact" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "contact";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "contact" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "education";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "education" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "education";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "education" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "education";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "education" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "experience";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "experience" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "experience";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "experience" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "experience";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "experience" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "file";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "file" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "file";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "file" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "file";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "file" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "history";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "history" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "history";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "history" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "history";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "history" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "profile";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "profile" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "profile";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "profile" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "profile";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "profile" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "project";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "project" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "project";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "project" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "project";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "project" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "project_tech_stack";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "project_tech_stack" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "project_tech_stack";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "project_tech_stack" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "project_tech_stack";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "project_tech_stack" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "skill";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "skill" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "skill";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "skill" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "skill";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "skill" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "skill_category";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "skill_category" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "skill_category";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "skill_category" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "skill_category";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "skill_category" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "skill_metadata";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "skill_metadata" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "skill_metadata";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "skill_metadata" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "skill_metadata";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "skill_metadata" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "insert_admin" ON "user";
--> statement-breakpoint
CREATE POLICY "insert_admin" ON "user" AS PERMISSIVE FOR INSERT TO public WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "update_admin" ON "user";
--> statement-breakpoint
CREATE POLICY "update_admin" ON "user" AS PERMISSIVE FOR UPDATE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)) WITH CHECK (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
--> statement-breakpoint
DROP POLICY IF EXISTS "delete_admin" ON "user";
--> statement-breakpoint
CREATE POLICY "delete_admin" ON "user" AS PERMISSIVE FOR DELETE TO public USING (EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE));
