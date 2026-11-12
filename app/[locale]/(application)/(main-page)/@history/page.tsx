import { getTranslations } from 'next-intl/server';

import { getHistoriesQuery } from '@/database/queries/history';
import { Section, SectionTitle } from '@/components/ui/section';
import { Achievement } from '@/components/application/about/achievement';

export default async function Page() {
  const [histories, t] = await Promise.all([
    getHistoriesQuery(),
    getTranslations('Home.history'),
  ]);

  return (
    <Section id="history" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-3 text-center">
        <SectionTitle className="text-3xl">{t('title')}</SectionTitle>
        <p className="text-text-muted">{t('description')}</p>
      </div>
      <Achievement contents={histories} />
    </Section>
  );
}
