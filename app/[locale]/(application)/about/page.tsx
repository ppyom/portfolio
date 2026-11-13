import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getPublicProfile } from '@/services/profile';
import { getSkills } from '@/services/skills';
import { createAlternates } from '@/lib/i18n/alternates';
import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { Section, SectionTitle } from '@/components/ui/section';
import { Achievement } from '@/components/application/about/achievement';
import { CareerHistory } from '@/components/application/about/career-history';
import { Introduction } from '@/components/application/about/introduction';
import { PageHeader } from '@/components/application/layout';
import { TechStack } from '@/components/application/skills/tech-stack';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await resolveRequestLocale(params);
  const t = await getTranslations('About');

  return {
    title: t('title'),
    alternates: await createAlternates('/about'),
  };
}

export default async function Page({ params }: Props) {
  const locale = await resolveRequestLocale(params);
  const [profile, skills, t, tCommon] = await Promise.all([
    getPublicProfile(locale),
    getSkills(),
    getTranslations('About'),
    getTranslations('Common'),
  ]);

  return (
    <main className="max-w-4xl mx-auto p-4 mb-24 space-y-8">
      <PageHeader title={t('heading')} description={tCommon('role')} />
      <Section>
        <Introduction contents={profile?.introduce ?? []} />
        <CareerHistory
          experiences={profile?.experience ?? []}
          educations={profile?.education ?? []}
        />
      </Section>
      <Section>
        <SectionTitle>{t('achievements')}</SectionTitle>
        <Achievement contents={profile?.history ?? []} />
      </Section>
      <Section>
        <SectionTitle>{t('techStack')}</SectionTitle>
        <TechStack skills={skills} />
      </Section>
    </main>
  );
}
