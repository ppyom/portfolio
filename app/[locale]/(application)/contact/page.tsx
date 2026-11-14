import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getResumeUrl } from '@/services/profile';
import { createAlternates } from '@/lib/i18n/alternates';
import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { Section, SectionTitle } from '@/components/ui/section';
import { ContactForm } from '@/components/application/contact/contact-form';
import { ContactLinks } from '@/components/application/contact/contact-links';
import { PageHeader } from '@/components/application/layout';
import { ResumeDownloadButton } from '@/components/application/resume/resume-download-button';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await resolveRequestLocale(params);
  const t = await getTranslations('Contact');

  return {
    title: t('title'),
    alternates: await createAlternates('/contact'),
  };
}

export default async function Page({ params }: Props) {
  const locale = await resolveRequestLocale(params);
  const [resumeUrl, t] = await Promise.all([
    getResumeUrl(locale),
    getTranslations('Contact'),
  ]);

  return (
    <main className="max-w-4xl mx-auto space-y-8 p-4 pb-12 md:py-12">
      <PageHeader title={t('title')} description={t('description')} />
      <div className="grid gap-8 sm:grid-cols-[2fr_1fr]">
        <Section className="p-6 rounded-md bg-surface-secondary border">
          <SectionTitle>{t('formTitle')}</SectionTitle>
          <ContactForm />
        </Section>
        <Section>
          <div className="space-y-2">
            <SectionTitle>{t('infoTitle')}</SectionTitle>
            <p className="text-sm text-text-muted">{t('infoDescription')}</p>
          </div>
          <ContactLinks />
          <ResumeDownloadButton
            url={resumeUrl}
            variant="secondary"
            className="w-full"
          />
        </Section>
      </div>
    </main>
  );
}
