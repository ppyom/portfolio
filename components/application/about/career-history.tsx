import type { Profile } from '@/types/profile';

interface Props {
  profile: Profile;
}

export function CareerHistory({ profile }: Props) {
  return (
    <>
      <div className="bg-background rounded-xl p-6 border border-border glow-hover">
        <p className="text-primary font-bold text-lg mb-2">Experience</p>
        <ul className="space-y-1 text-foreground/70">
          {profile.experience?.map((content, idx) => (
            <li key={`experience_${idx}`}>
              {content.name && (
                <>
                  <span className="font-semibold font-foground/90">
                    {content.name}
                  </span>
                  <span className="text-sm"> / {content.position} </span>
                </>
              )}
              {!content.name && (
                <span className="font-semibold text-foground/90 mr-2">
                  {content.position}
                </span>
              )}
              <span className="text-sm">
                ({content.startDate} - {content.endDate ?? '재직중'})
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-background rounded-xl p-6 border border-border glow-hover">
        <p className="text-primary font-bold text-lg mb-2">Education</p>
        <ul className="space-y-1 text-foreground/70">
          {profile.education?.map((content, idx) => (
            <li key={`education_${idx}`}>
              <span className="font-semibold font-foground/90">
                {content.name}
              </span>
              <span className="text-sm"> / {content.major} </span>
              <span className="text-sm">
                ({content.startDate} - {content.endDate ?? '재학중'})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
