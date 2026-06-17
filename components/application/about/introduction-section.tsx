import type { Profile } from '@/types/profile';

interface Props {
  profile?: Profile;
}

export function IntroductionSection({ profile }: Props) {
  if (!profile) return null;

  return (
    <div className="space-y-6 text-text-secondary">
      {profile.introduce?.map((content, idx) => (
        <p key={`introduce_${idx}`} className="text-lg leading-relaxed">
          {content}
        </p>
      ))}
    </div>
  );
}
