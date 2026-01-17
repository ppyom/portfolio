import type { Profile } from '@/types/profile';

interface Props {
  profile: Profile;
}

export default function ProfileIntroduction({ profile }: Props) {
  return (
    <div className="space-y-6 text-foreground/80">
      {profile.introduce?.map((content, idx) => (
        <p key={`introduce_${idx}`} className="text-lg leading-relaxed">
          {content}
        </p>
      ))}
    </div>
  );
}
