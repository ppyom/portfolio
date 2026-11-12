import { getTranslations } from 'next-intl/server';

import { getSkills } from '@/services/skills';
import { Section, SectionTitle } from '@/components/ui/section';
import { TechStack } from '@/components/application/skills/tech-stack';

export default async function Page() {
  const [skills, t] = await Promise.all([
    getSkills(),
    getTranslations('Home.skills'),
  ]);

  return (
    <Section id="skills" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-3 text-center">
        <SectionTitle className="text-3xl">{t('title')}</SectionTitle>
        <p className="text-text-muted max-w-2xl mx-auto">{t('description')}</p>
      </div>
      <TechStack skills={skills} />
    </Section>
  );
}
