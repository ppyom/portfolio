import { Section, SectionTitle } from '@/components/ui/section';
import { ContactForm } from '@/components/application/contact/contact-form';

export default function Page() {
  return (
    <Section id="contact" className="py-20 px-6 max-w-xl mx-auto space-y-12">
      <div className="space-y-3 text-center">
        <SectionTitle className="text-3xl">Contact</SectionTitle>
        <p className="text-text-muted">문의 사항이 있다면 연락해 주세요.</p>
      </div>
      <div className="rounded-md border bg-surface-secondary p-6">
        <ContactForm />
      </div>
    </Section>
  );
}
