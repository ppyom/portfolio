import { getTranslations } from 'next-intl/server';

import { getHistoriesQuery } from '@/database/queries/history';
import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { Section, SectionTitle } from '@/components/ui/section';
import { Achievement } from '@/components/application/about/achievement';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: Props) {
  await resolveRequestLocale(params);
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
