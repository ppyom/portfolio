import { useTranslations } from 'next-intl';

import type { Profile } from '@/types/profile';

interface Props {
  experiences: Profile['experience'];
  educations: Profile['education'];
}

export function CareerHistory({ experiences, educations }: Props) {
  const t = useTranslations('About');

  if (!experiences && !educations) {
    return null;
  }

  return (
    <>
      {experiences && (
        <div className="bg-surface-secondary rounded-md p-6 border">
          <p className="text-text-primary font-bold text-lg mb-2">
            {t('experience')}
          </p>
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
                  ({content.startDate} - {content.endDate ?? t('employed')})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {educations && (
        <div className="bg-surface-secondary rounded-md p-6 border">
          <p className="text-text-primary font-bold text-lg mb-2">
            {t('education')}
          </p>
          <ul className="space-y-1 text-text-secondary">
            {educations.map((content, idx) => (
              <li key={`education_${idx}`}>
                <span className="font-semibold">{content.name}</span>
                <span className="text-sm"> / {content.major} </span>
                <span className="text-sm">
                  ({content.startDate} - {content.endDate ?? t('enrolled')})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
