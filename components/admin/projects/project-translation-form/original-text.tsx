interface Props {
  values: string[] | null | undefined;
}

// 목록 항목은 placeholder로 원문을 보여줄 수 없어 번역 입력 위에 한국어 원문을 따로 표시한다
export function OriginalText({ values }: Props) {
  if (!values || values.length === 0) return null;

  return (
    <div className="rounded-md border border-border-soft px-4 py-3 text-sm text-text-muted">
      <p className="mb-1 text-xs font-medium">한국어 원문</p>
      <ul className="list-disc space-y-0.5 pl-4">
        {values.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
