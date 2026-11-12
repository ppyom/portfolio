import { useTranslations } from 'next-intl';

import type { Project } from '@/types/project';

import { BulletList } from './bullet-list';

interface Props {
  member: NonNullable<Project['member']>;
}

export function Member({ member }: Props) {
  const t = useTranslations('ProjectDetail');

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold text-text-primary">{t('memberSize')}</p>
        <p className="text-text-secondary">
          {t('memberCount', { count: member.size })}
        </p>
      </div>
      <div>
        <p className="font-semibold text-text-primary">{t('role')}</p>
        <p className="text-text-secondary">{member.role}</p>
      </div>
      {member.responsibilities.length > 0 && (
        <div>
          <p className="font-semibold text-text-primary mb-2">
            {t('responsibilities')}
          </p>
          <BulletList items={member.responsibilities} />
        </div>
      )}
    </div>
  );
}
