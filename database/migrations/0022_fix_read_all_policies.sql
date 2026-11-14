-- Custom SQL migration file, put your code below! --
-- 0016에서 만든 공개 콘텐츠 테이블의 read_all은 DB에 식이 비어 있다 (스냅샷은 USING (true)).
-- ALTER POLICY로는 식을 채울 수 없어 0020처럼 DROP 후 다시 만든다. project_translation은 0019에서 정상 생성돼 제외한다.
DROP POLICY IF EXISTS "read_all" ON "education";
--> statement-breakpoint
CREATE POLICY "read_all" ON "education" AS PERMISSIVE FOR SELECT TO public USING (true);
--> statement-breakpoint
DROP POLICY IF EXISTS "read_all" ON "experience";
--> statement-breakpoint
CREATE POLICY "read_all" ON "experience" AS PERMISSIVE FOR SELECT TO public USING (true);
--> statement-breakpoint
DROP POLICY IF EXISTS "read_all" ON "file";
--> statement-breakpoint
CREATE POLICY "read_all" ON "file" AS PERMISSIVE FOR SELECT TO public USING (true);
--> statement-breakpoint
DROP POLICY IF EXISTS "read_all" ON "history";
--> statement-breakpoint
CREATE POLICY "read_all" ON "history" AS PERMISSIVE FOR SELECT TO public USING (true);
--> statement-breakpoint
DROP POLICY IF EXISTS "read_all" ON "profile";
--> statement-breakpoint
CREATE POLICY "read_all" ON "profile" AS PERMISSIVE FOR SELECT TO public USING (true);
--> statement-breakpoint
DROP POLICY IF EXISTS "read_all" ON "project";
--> statement-breakpoint
CREATE POLICY "read_all" ON "project" AS PERMISSIVE FOR SELECT TO public USING (true);
--> statement-breakpoint
DROP POLICY IF EXISTS "read_all" ON "project_tech_stack";
--> statement-breakpoint
CREATE POLICY "read_all" ON "project_tech_stack" AS PERMISSIVE FOR SELECT TO public USING (true);
--> statement-breakpoint
DROP POLICY IF EXISTS "read_all" ON "skill";
--> statement-breakpoint
CREATE POLICY "read_all" ON "skill" AS PERMISSIVE FOR SELECT TO public USING (true);
--> statement-breakpoint
DROP POLICY IF EXISTS "read_all" ON "skill_category";
--> statement-breakpoint
CREATE POLICY "read_all" ON "skill_category" AS PERMISSIVE FOR SELECT TO public USING (true);
--> statement-breakpoint
DROP POLICY IF EXISTS "read_all" ON "skill_metadata";
--> statement-breakpoint
CREATE POLICY "read_all" ON "skill_metadata" AS PERMISSIVE FOR SELECT TO public USING (true);
