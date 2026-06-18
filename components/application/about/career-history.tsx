import type { Profile } from '@/types/profile';

interface Props {
  experiences: Profile['experience'];
  educations: Profile['education'];
}

export function CareerHistory({ experiences, educations }: Props) {
  if (!experiences && !educations) {
    return null;
  }

  return (
    <>
      {experiences && (
        <div className="bg-surface-secondary rounded-md p-6 border">
          <p className="text-text-primary font-bold text-lg mb-2">Experience</p>
          <ul className="space-y-1 text-text-secondary">
            {experiences.map((content, idx) => (
              <li key={`experience_${idx}`}>
                {content.name && (
                  <>
                    <span className="font-semibold">{content.name}</span>
                    <span className="text-sm"> / {content.position} </span>
                  </>
                )}
                {!content.name && (
                  <span className="font-semibold mr-2">{content.position}</span>
                )}
                <span className="text-sm">
                  ({content.startDate} - {content.endDate ?? '재직중'})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {educations && (
        <div className="bg-surface-secondary rounded-md p-6 border">
          <p className="text-text-primary font-bold text-lg mb-2">Education</p>
          <ul className="space-y-1 text-text-secondary">
            {educations.map((content, idx) => (
              <li key={`education_${idx}`}>
                <span className="font-semibold">{content.name}</span>
                <span className="text-sm"> / {content.major} </span>
                <span className="text-sm">
                  ({content.startDate} - {content.endDate ?? '재학중'})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
