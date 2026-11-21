@AGENTS.md

## Claude Code 전용

### Skills

- 새 UI primitive (`components/ui/*`) → `/new-ui-component`
- 관리자 도메인 기능 (DB → 서비스 → 액션 → 폼 → 페이지) → `/new-admin-feature`
- 이슈 작성 → `/plan-issues`
- 커밋·PR → `/ship`

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

---

# 개인 공통 규칙

모든 프로젝트에 적용되는 내 작업 방식. 프로젝트별 규칙은 각 레포의 AGENTS.md / CLAUDE.md를 따른다.

## 소통

- 한국어로, 짧고 실무적으로 답한다. 군더더기 설명은 생략.
- 의도가 짧게 주어져도 맥락으로 추론해서 진행한다. 정말 갈림길일 때만 질문한다.
- 큰 변경(파일 여러 개, 구조 변경, 의존성 추가)은 시작 전에 계획을 한 번 보여준다.

## 작업 원칙

- 새로 짜기 전에 레포에서 비슷한 기존 파일을 먼저 찾아 그 패턴을 따른다.
- 사용하지 않는 코드·컴포넌트·의존성은 남기지 않는다.
- 새 패키지는 먼저 물어보고 추가한다.
- 주석은 "왜"만 쓴다. 유틸 함수와 훅에는 한국어 JSDoc을 단다.
- 완료라고 말하기 전에 lint와 타입체크를 통과시킨다.

## Git

### 브랜치

- `main`: 배포 / `develop`: 통합
- 작업 브랜치는 `develop`에서 `feature/#<이슈번호>-<kebab-case-설명>`으로 만든다.
  - 예: `feature/#215-delete-techstack`
- PR은 작업 브랜치 → `develop`.
- 이슈 작업을 요청받으면 `gh issue view <번호>`로 내용과 To-Do를 먼저 읽고, To-Do를 완료 기준으로 삼는다.

### 커밋

gitmoji + 한국어, 작업 단위별로 잘게 나눈다. 마침표 없음.

| 이모지 | 용도 |
| --- | --- |
| ✨ | 새 기능 |
| 🐛 | 버그 수정 |
| 🩹 | 사소한 수정 |
| ♻️ | 리팩토링 |
| 💄 | 스타일·UI |
| 🔥 | 코드·파일 제거 |
| 🚚 | 파일 이동·이름 변경 |
| ➕ / ➖ | 의존성 추가 / 제거 |
| 🍱 | 에셋(이미지, 폰트) |
| 📝 | 문서 |
| 📸 | 스토리(Storybook) |
| ♿️ | 접근성 |
| 💬 | 텍스트·mock 데이터 |
| 🚨 | 린트·빌드 오류 수정 |
| 🗃️ | DB 스키마·마이그레이션 |
| 🔧 | 설정 파일 |

예: `♻️ ScrollToTop 예외 경로 처리 구조 개선`

## GitHub

- `gh` CLI를 사용한다.
- 이슈 작성은 `/plan-issues`, 커밋·PR은 `/ship`.
- 레포에 `.github/ISSUE_TEMPLATE`, `PULL_REQUEST_TEMPLATE.md`가 있으면 반드시 그 형식을 따른다.
