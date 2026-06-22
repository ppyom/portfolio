import type { Profile } from '@/types/profile';

interface Props {
  contents: Profile['introduce'];
}

export function Introduction({ contents }: Props) {
  return (
    <div className="space-y-6 text-text-secondary">
      {contents?.map((content, idx) => (
        <p key={`introduce_${idx}`} className="text-lg leading-relaxed">
          {content}
        </p>
      ))}
    </div>
  );
}
