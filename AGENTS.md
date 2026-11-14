# Portfolio

관리 기능을 포함한 개인 포트폴리오 웹앱. 방문자는 소개·스킬·프로젝트를 보고 메시지를 보내고, 관리자는 `/manage`에서 콘텐츠를 관리한다.

## 스택

Next.js 16 (App Router, Server Actions) · next-intl · React 19 · TypeScript (strict) · Tailwind CSS 4 · Drizzle ORM + Supabase(Postgres) · NextAuth · Cloudflare R2 · react-hook-form + zod · Storybook 10 · dayjs · lucide-react

## 명령어

```bash
npm run dev               # 개발 서버
npm run lint              # ESLint (import 정렬 포함)
npx tsc --noEmit          # 타입체크
npm run build             # 빌드
npm run storybook         # Storybook (6006)
npx drizzle-kit generate  # 스키마 변경 → 마이그레이션 파일 생성
npm run db:migrate        # 마이그레이션 DB 반영 (실패 시 실제 에러 출력)
```

`NEXT_PUBLIC_USE_MOCK=true`면 services가 DB 대신 `mocks/` 데이터를 반환한다.

## 폴더 구조

```
app/
  [locale]/(application)/  # 방문자 페이지 (언어별 라우팅)
    (main-page)/@about …   # 메인 페이지 parallel routes
    @modal/(.)projects/    # 프로젝트 상세 intercepting modal
  manage/<domain>/      # 관리자 페이지 + actions.ts (한국어 전용, [locale] 밖)
  api/                  # auth, og 이미지
components/
  ui/<name>/            # 디자인 시스템 primitive (stories + docs 필수)
  admin/<domain>/       # 관리자 기능 컴포넌트
  application/<domain>/ # 방문자 기능 컴포넌트
  form/ delete/ feedback/ provider/ theme/  # 공용 조합 컴포넌트
database/
  schema/<x>.schema.ts  # drizzle 테이블
  queries/<x>.ts        # 쿼리 함수
  types/<x>.d.ts        # 테이블 Select/Insert 타입 (namespace)
  migrations/           # drizzle-kit 생성물 — 직접 수정 금지
services/<x>.ts         # 비즈니스 로직, mock 분기, 트랜잭션
lib/
  validation/<x>.schema.ts       # zod 스키마
  constants/error-messages/<x>.ts
  utils/ upload/ config.ts       # config.ts로만 환경변수 접근
hooks/use-<x>.ts
types/<x>.d.ts          # 도메인 타입
mocks/<x>.mock.ts
theme/*.css             # 디자인 토큰
i18n/                   # routing(지원 언어), request(메시지 로드), navigation(언어 유지 Link/router)
messages/<locale>.json  # UI 번역 문구 (ko.json이 키 타입 기준)
```

## 다국어 (next-intl)

- 지원 언어는 `i18n/routing.ts`의 `locales`에서만 정의한다. 언어 목록이 필요한 UI(언어 전환, 관리자 언어 탭)는 여기서 생성하고 하드코딩하지 않는다.
- URL: 한국어는 접두어 없음(`/about`), 그 외 언어는 `/en/about` (`localePrefix: 'as-needed'`). `/ko/...`는 접두어 없는 URL로 리다이렉트된다.
- 방문자 페이지에서 내부 이동은 `next/link`, `next/navigation` 대신 `@/i18n/navigation`의 `Link`, `useRouter`, `usePathname`, `redirect`를 쓴다. (관리자로 가는 링크와 `notFound`, `useSearchParams`는 Next 기본 API 사용)
- 방문자 페이지는 `generateMetadata`에서 `createAlternates('<경로>')`(`@/lib/i18n/alternates`)로 hreflang을 지정한다.
- 관리자(`/manage`), `/api`는 언어 라우팅 밖이며 한국어 전용이다.

## 데이터 흐름 (레이어 규칙)

```
page.tsx (서버 컴포넌트) → services → database/queries → schema
client 컴포넌트 → app/**/actions.ts ('use server') → services → database/queries
```

- 컴포넌트에서 `database/`를 직접 import하지 않는다. 항상 services를 거친다.
- services는 `USE_MOCK` 분기를 먼저 둔다.
- 여러 쿼리를 묶는 쓰기는 services에서 `db.transaction`으로 감싸고, 쿼리 함수는 마지막 인자로 `client: DbClient = db`를 받는다.
- 읽기 쿼리는 `.prepare('snake_case_name')`로 prepared statement를 만든다.

## 코드 컨벤션

### 일반

- 파일·폴더명은 kebab-case. 컴포넌트명은 PascalCase.
- named export를 쓴다. default export는 Next.js 규약 파일(page, layout, route 등), context 파일, stories의 meta에만.
- 컴포넌트·훅은 `function` 선언, services·queries·utils는 `const` 화살표 함수.
- Props 타입은 파일 안에 `interface Props`로 선언한다. HTML 속성을 받으면 `extends React.XxxHTMLAttributes<...>`.
- 타입만 import할 때는 `import type`.
- 환경변수는 `lib/config.ts`의 `config` 객체로만 접근한다.
- 사용자에게 보이는 문구는 한국어.

### import 순서

ESLint(`simple-import-sort`)가 강제한다: 외부 라이브러리 → `@/app` → `@/database` → `@/services` → `@/lib` → `@/hooks` → `@/components/ui` → `@/components/common` → 기타 `@/` → 상대경로 → css. `npm run lint -- --fix`로 정렬된다.

### 컴포넌트 폴더

여러 파일로 나뉘는 컴포넌트는 폴더로 만든다.

```
<name>/
  <name>.tsx
  <name>.utils.ts      # 폼 defaultValues 변환, payload 생성 등 순수 함수
  <sub-part>.tsx
  index.ts             # export * from './<name>';
```

단일 파일 컴포넌트는 `components/<area>/<name>.tsx`로 두고 상위 `index.ts`에서 re-export한다.

### 스타일

- Tailwind 유틸리티 + `cn()` (`@/lib/utils`)으로 className 병합. 외부 `className`은 항상 마지막에 병합한다.
- 색상은 `theme/colors.css` 토큰만 쓴다. hex·Tailwind 기본 팔레트(`gray-500` 등) 금지.
  - 배경: `bg-surface-primary | secondary | elevated | inverse`
  - 텍스트: `text-text-primary | secondary | muted | inverse`
  - 브랜드: `bg-brand-primary`, `bg-brand-secondary`
  - 상태: `semantic-error | warning | info | success`
  - 테두리: `border-border | border-soft | border-strong`
- 색상의 다크모드 대응은 토큰이 처리하므로 색상에 `dark:`를 쓰지 않는다 (테마 토글 아이콘 애니메이션 같은 예외만 허용).
- variant가 있는 컴포넌트는 `cva`로 정의한다.

### UI primitive (`components/ui`)

- 외부 여백(margin)을 갖지 않는다. 배치는 사용하는 쪽에서.
- 합성 컴포넌트는 Compound Component + Context 패턴: `<name>-context.ts`에 context와 `use<Name>()` 훅(Provider 밖이면 throw)을 두고, 하위 파트는 `<name>-<part>.tsx`로 분리.
- controlled / uncontrolled 둘 다 지원한다 (`open` + `defaultOpen` + `onOpenChange`).
- 접근성: `aria-*`, `useId`로 연결, 장식 요소는 `aria-hidden`.
- 새 primitive는 `stories.tsx`, `docs.mdx`를 함께 만든다 (`/new-ui-component`).

### 폼

- react-hook-form + `zodResolver(schema)` + `FormProvider`.
- zod 스키마는 `lib/validation/<x>.schema.ts`에 `schema`와 `FormDataType`을 export.
- 검증 메시지는 `lib/constants/error-messages/<x>.ts`의 `<x>ErrorMessages` 상수(`as const`)에서 가져온다. 문자열 하드코딩 금지.
- 폼 ↔ 서버 데이터 변환은 `<form>.utils.ts`의 `create<X>DefaultValues`, `create<X>Payload`로 분리한다.
- 제출 결과: 성공 시 `toast.success`, 실패 시 `toast.error(result.message)`, 검증 에러는 `notifyError(error)`.

### Server Actions

- `app/**/actions.ts`에 `'use server'`로 두고 이름은 `<동사><대상>Action`.
- 항상 `{ success: true, ... }` 또는 `{ success: false, message: extractErrorMessage(error) }`를 반환한다. throw로 클라이언트에 넘기지 않는다.
- 쓰기 후 영향받는 경로를 `revalidatePath`로 갱신한다 (관리자 경로 + 공개 경로 둘 다 확인).

### DB

- 테이블 변수명 `<x>Table`, 컬럼은 camelCase ↔ DB snake_case.
- `id`는 uuid + `gen_random_uuid()`, `createdAt` / `updatedAt` 포함.
- RLS: `.enableRLS()`와 `database/policies.ts`의 정책을 붙인다 (기본: `policies.allUser.read, ...policies.admin.all`).
- 스키마 변경 후 `npx drizzle-kit generate`로 마이그레이션 생성. **`npm run db:migrate`(실제 DB 반영)는 사용자 확인 후에만.**
- `npx drizzle-kit migrate`는 실패해도 에러를 출력하지 않으므로 쓰지 않는다.
- `database/types/<x>.d.ts`에 `namespace XTable { type Select; type Insert }`를 추가한다.

### 훅·유틸

- 훅은 `hooks/use-<x>.ts`, 클라이언트 전용이면 `'use client'`.
- 유틸·훅에는 한국어 JSDoc (`@param`, `@returns`, 필요하면 `@example`).

## 관리자 페이지 추가 시 체크

- `lib/constants/admin-sidebar-items.ts`에 메뉴 추가
- 동적 세그먼트가 있으면 `lib/breadcrumb/admin.ts`의 `resolveDynamicSegment`에 라벨 추가
- `/manage` 접근 제어는 `proxy.ts`가 처리하므로 페이지에서 따로 막지 않는다
- 페이지에 `export const metadata`로 title 지정

## 건드리지 않는 것

- `database/migrations/` (생성물)
- `.env*`
- `package-lock.json` 수동 편집

## 완료 기준

1. `npm run lint` 통과
2. `npx tsc --noEmit` 통과
3. UI primitive를 바꿨다면 stories / docs도 갱신
4. 라우트·설정 변경이면 `npm run build` 통과
