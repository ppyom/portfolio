---
name: new-ui-component
description: components/ui 아래에 디자인 시스템 primitive를 새로 만들거나 크게 고칠 때 사용한다. 컴포넌트 파일, index.ts, Storybook stories, docs.mdx를 레포 규칙대로 한 세트로 만든다. "UI 컴포넌트 만들어줘", "공통 컴포넌트 추가", "디자인 시스템에 ○○ 추가", "Tooltip/Tabs/Popover 같은 걸 만들자" 같은 요청이면 명시적으로 ui라고 하지 않아도 사용한다.
---

# UI primitive 만들기

## 0. 먼저 읽기

- 단순 컴포넌트: `components/ui/button/` 전체
- 여러 파트로 조합하는 컴포넌트: `components/ui/dialog/` 전체
- 색상 토큰: `theme/colors.css`

어느 쪽인지 판단: 사용자가 하위 요소를 조합해서 쓰는가(`<Tabs><TabsList>…`)? → Compound. 아니면 단순.

## 1. 파일 구성

### 단순

```
components/ui/<name>/
  <name>.tsx
  index.ts        # export * from './<name>';
  stories.tsx
  docs.mdx
```

### Compound

```
components/ui/<name>/
  <name>.tsx              # 루트: 상태 관리 + Context Provider
  <name>-context.ts       # context + use<Name>() 훅
  <name>-<part>.tsx       # 파트마다 하나씩
  index.ts                # 모든 파트 export * (알파벳 순)
  stories.tsx
  docs.mdx
```

## 2. 구현 규칙

- `interface Props`를 파일 안에 선언. 네이티브 요소를 감싸면 `extends React.XxxHTMLAttributes<HTMLXxxElement>`로 받고 `...props`를 넘긴다.
- `className`은 `cn(기본, 조건부, className)` 순서로 외부 값을 마지막에.
- variant·size가 있으면 `cva` + `VariantProps<typeof xxxVariants>`. `defaultVariants` 지정.
- 색상은 토큰 클래스만 (`bg-surface-*`, `text-text-*`, `bg-brand-*`, `border-border*`, `semantic-*`). hex·기본 팔레트 금지.
- margin을 갖지 않는다.
- 상태를 가지면 controlled/uncontrolled 둘 다 지원 (`value` / `defaultValue` / `onValueChange` 또는 `open` / `defaultOpen` / `onOpenChange`).
- 접근성
  - `useId()`로 id를 만들고 파트끼리 `aria-labelledby`, `aria-describedby`, `aria-controls`로 연결
  - 로딩·비활성 상태는 `aria-busy`, `aria-disabled`
  - 장식 아이콘·스피너는 `aria-hidden="true"`
  - 키보드: 닫히는 요소는 Escape, 목록형은 화살표 키
- Context 훅 형식:

```ts
export function use<Name>() {
  const context = useContext(<Name>Context);
  if (!context) {
    throw new Error('<Name> components must be used inside <Name>');
  }
  return context;
}

export default <Name>Context;
```

## 3. Stories

`references/stories-template.tsx.example`를 기준으로 작성.

- `title: 'ui/<name>'`, `tags: ['!dev']`
- 모든 prop을 `argTypes`에 정리하고 `table.type.summary`, `table.defaultValue.summary`를 채운다.
- 기본 스토리 구성: `Default` → 각 축별 비교(`Variants`, `Sizes`, `States` 등 해당하는 것만) → `Playground`
- 각 스토리 위에 한 줄 JSDoc (`/** Variant 비교 */`)

## 4. Docs

`references/docs-template.mdx.example`를 기준으로 작성. 섹션 순서와 이모지를 그대로 유지한다.

1. 제목 + 한두 문장 소개 (무엇이고 언제 쓰는지)
2. `## 🚀 Usage` — import 경로 포함 최소 예시 (`<Source>`)
3. `## 📌 Examples` — 스토리마다 설명 한두 줄 + `<Canvas>`
4. `## 🧪 Playground` — `<Canvas>` + `<Controls>`
5. `## 📝 Technical Guidelines` — `### 🧠 Design Rules` / `### ♿ Accessibility` / `### 🛠 Implementation Details` / `### 💡 Tips`

## 5. 확인

- `npm run lint`, `npx tsc --noEmit`
- 커밋은 나눠서: `✨ <Name> 컴포넌트 구현` / `📸 <Name> stories 추가` / `📝 <Name> 컴포넌트 문서 추가`
