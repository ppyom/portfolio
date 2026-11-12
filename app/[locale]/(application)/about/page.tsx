import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getProfile } from '@/services/profile';
import { getSkills } from '@/services/skills';
import { createAlternates } from '@/lib/i18n/alternates';
import { Section, SectionTitle } from '@/components/ui/section';
import { Achievement } from '@/components/application/about/achievement';
import { CareerHistory } from '@/components/application/about/career-history';
import { Introduction } from '@/components/application/about/introduction';
import { PageHeader } from '@/components/application/layout';
import { TechStack } from '@/components/application/skills/tech-stack';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('About');

  return {
    title: t('title'),
    alternates: await createAlternates('/about'),
  };
}

export default async function Page() {
  const [profile, skills, t, tCommon] = await Promise.all([
    getProfile(),
    getSkills(),
    getTranslations('About'),
    getTranslations('Common'),
  ]);

  return (
    <main className="max-w-4xl mx-auto p-4 mb-24 space-y-8">
      <PageHeader title={t('heading')} description={tCommon('role')} />
      <Section>
        <Introduction contents={profile.introduce} />
        <CareerHistory
          experiences={profile.experience}
          educations={profile.education}
        />
      </Section>
      <Section>
        <SectionTitle>{t('achievements')}</SectionTitle>
        <Achievement contents={profile.history} />
      </Section>
      <Section>
        <SectionTitle>{t('techStack')}</SectionTitle>
        <TechStack skills={skills} />
      </Section>
    </main>
  );
}
