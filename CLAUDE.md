@AGENTS.md

## Claude Code 전용

### Skills

- 새 UI primitive (`components/ui/*`) → `/new-ui-component`
- 관리자 도메인 기능 (DB → 서비스 → 액션 → 폼 → 페이지) → `/new-admin-feature`
- 이슈 작성 → `/plan-issues` (전역)
- 커밋·PR → `/ship` (전역)

### 기준 파일

새로 만들 때 아래 파일의 구조를 먼저 읽고 맞춘다.

| 만들 것 | 기준 파일 |
| --- | --- |
| 단순 UI primitive | `components/ui/button/*` |
| Compound UI primitive | `components/ui/dialog/*` |
| 관리자 편집 폼 | `components/admin/skills/skill-edit-form/*` |
| Server Action | `app/manage/skills/actions.ts` |
| 서비스 | `services/skills.ts` |
| 쿼리 | `database/queries/skill.ts` |
| 스키마 | `database/schema/skill.schema.ts` |
| 관리자 페이지 | `app/manage/skills/page.tsx` |
| 훅 | `hooks/use-mounted.ts` |

### Hooks

`.claude/settings.json`에 파일 수정 후 Prettier + ESLint `--fix`가 자동 실행되도록 걸려 있다. ESLint 에러가 남으면 그 메시지를 보고 바로 고친다.
