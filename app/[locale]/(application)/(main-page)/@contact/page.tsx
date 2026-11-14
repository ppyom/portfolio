import { getTranslations } from 'next-intl/server';

import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { Section, SectionTitle } from '@/components/ui/section';
import { ContactForm } from '@/components/application/contact/contact-form';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: Props) {
  await resolveRequestLocale(params);
  const t = await getTranslations('Home.contact');

  return (
    <Section id="contact" className="py-20 px-6 max-w-xl mx-auto space-y-12">
      <div className="space-y-3 text-center">
        <SectionTitle className="text-3xl">{t('title')}</SectionTitle>
        <p className="text-text-muted">{t('description')}</p>
      </div>
      <div className="rounded-md border bg-surface-secondary p-6">
        <ContactForm />
      </div>
    </Section>
  );
}
