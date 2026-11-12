import { useTranslations } from 'next-intl';

import { Section, SectionTitle } from '@/components/ui/section';
import { ContactForm } from '@/components/application/contact/contact-form';

export default function Page() {
  const t = useTranslations('Home.contact');

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
