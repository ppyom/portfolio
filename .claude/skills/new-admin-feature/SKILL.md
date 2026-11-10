---
name: new-admin-feature
description: 관리자(/manage)에서 관리할 새 도메인이나 기존 도메인의 CRUD 기능을 추가할 때 사용한다. DB 스키마 → 쿼리 → 서비스 → 검증 → Server Action → 폼 컴포넌트 → 페이지 → 사이드바 등록까지 레이어 순서대로 진행한다. "관리 페이지 추가", "○○ 관리 기능 만들어줘", "어드민에서 ○○ 수정할 수 있게", "새 테이블 추가해서 관리" 같은 요청에 사용한다.
---

# 관리자 기능 추가

각 단계의 기준 파일을 먼저 읽고 같은 모양으로 만든다. 예시 도메인 이름은 `<x>` (kebab), `<X>` (Pascal), `<xCamel>`.

## 0. 범위 확인

시작 전에 아래를 짧게 정리해서 보여주고 진행한다.

- 필요한 테이블·컬럼 (기존 테이블 수정인지 새 테이블인지)
- 방문자 페이지에도 노출되는지 (→ `revalidatePath` 대상)
- 이미지 업로드가 있는지 (→ `lib/upload/image.ts` 사용)

기존 테이블만 쓰는 기능이면 1~2단계는 건너뛴다.

## 1. DB 스키마 — 기준: `database/schema/skill.schema.ts`

- `database/schema/<x>.schema.ts`에 `<xCamel>Table = pgTable('<x_snake>', {...}, () => [policies...]).enableRLS()`
- `id` uuid + `gen_random_uuid()`, `createdAt`, `updatedAt` 포함
- 정책 기본값: `policies.allUser.read, ...policies.admin.all` (공개 쓰기가 필요한 경우만 `policies.allUser.insert`)
- `database/types/<x>.d.ts`에 `export namespace <X>Table { type Select; type Insert }`
- `npx drizzle-kit generate`로 마이그레이션 생성
- **`npx drizzle-kit migrate`는 실행하지 말고, 사용자에게 실행하라고 안내만 한다.**

## 2. 쿼리 — 기준: `database/queries/skill.ts`

- 읽기: `db.select(...)...prepare('get_<x>')`로 prepared query를 export (`get<X>Query`)
- 쓰기: `(data, client: DbClient = db) => client.insert(...)` 형태로 트랜잭션 클라이언트를 받는다 (`insert<X>Query`, `update<X>Query`, `delete<X>Query`)

## 3. 도메인 타입 & mock

- `types/<x>.d.ts`: 화면에서 쓰는 도메인 타입. 가능하면 `<X>Table.Select['field']`로 파생
- `mocks/<x>.mock.ts`: `<xCamel>Mock` export

## 4. 서비스 — 기준: `services/skills.ts`

- `services/<x>.ts`, `const` 화살표 함수
- 읽기 함수는 첫 줄에 `if (USE_MOCK) return <xCamel>Mock;`
- 여러 쿼리를 쓰는 쓰기는 `db.transaction(async (tx) => {...})`로 감싸고 쿼리에 `tx` 전달
- 비즈니스 검증 실패는 한국어 메시지로 `throw new Error(...)`

## 5. 검증 & 에러 메시지 — 기준: `lib/validation/skill.schema.ts`

- `lib/constants/error-messages/<x>.ts`: `export const <xCamel>ErrorMessages = { required: {...} } as const;`
- `lib/constants/error-messages/index.ts`에 `export * from './<x>';` 추가 (알파벳 순)
- `lib/validation/<x>.schema.ts`: `export const schema = z.object(...)`, `export type FormDataType = z.infer<typeof schema>;`
- 메시지는 반드시 상수에서 가져온다

## 6. Server Action — 기준: `app/manage/skills/actions.ts`

- `app/manage/<x>/actions.ts`, 첫 줄 `'use server';`
- 이름 `<동사><X>Action`
- try/catch로 감싸서 `{ success: true }` / `{ success: false, message: extractErrorMessage(error) }` 반환
- `revalidatePath('/manage/<x>')` + 방문자 페이지에 노출되면 해당 공개 경로도

## 7. 폼 컴포넌트 — 기준: `components/admin/skills/skill-edit-form/`

```
components/admin/<x>/<x>-edit-form/
  <x>-edit-form.tsx       # 'use client'
  <x>-edit-form.utils.ts  # create<X>DefaultValues, create<X>Payload
  index.ts
```

- `useForm<FormDataType>({ resolver: zodResolver(schema), defaultValues: create<X>DefaultValues(...) })` + `FormProvider`
- UI는 `components/ui`의 `Field`, `Label`, `Input`, `FormSection`, `Button` 조합. 배열 입력은 `components/form`의 `FieldArray`, `StringArrayField`. 삭제는 `components/delete`
- 제출: 성공 `toast.success('저장되었습니다.')`, 실패 `toast.error(result.message)`, 검증 에러 `notifyError(error)`
- 저장 버튼: `className="w-full sticky bottom-4 font-semibold" size="lg" type="submit"`

## 8. 페이지 — 기준: `app/manage/skills/page.tsx`

- `app/manage/<x>/page.tsx`: async 서버 컴포넌트, 서비스로 데이터 조회 후 폼에 전달
- `export const metadata: Metadata = { title: '<관리 이름>' }`
- 레이아웃: `mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8` + 제목(`text-2xl font-bold`) / 설명(`text-text-secondary`)
- 목록 → 상세가 필요하면 `[id]/page.tsx`, `new/page.tsx`, `[id]/not-found.tsx` (기준: `app/manage/projects/`)

## 9. 등록

- `lib/constants/admin-sidebar-items.ts`에 `{ label, href, icon }` 추가 (lucide 아이콘)
- 동적 세그먼트가 있으면 `lib/breadcrumb/admin.ts`의 `resolveDynamicSegment`에 라벨 추가
- 대시보드 퀵액션에 넣을지 사용자에게 묻는다

## 10. 확인

- `npm run lint`, `npx tsc --noEmit`, 라우트가 추가됐으므로 `npm run build`
- mock 모드(`NEXT_PUBLIC_USE_MOCK=true`)에서도 페이지가 뜨는지
- 커밋은 레이어 단위로: `🗃️ <x> 스키마 추가` / `✨ <x> 서비스 및 액션 구현` / `✨ <x> 관리 페이지 구현`
