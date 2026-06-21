import { Section, SectionTitle } from '@/components/ui/section';
import { ContactForm } from '@/components/application/contact/contact-form';
import { ContactLinks } from '@/components/application/contact/contact-links';
import { PageHeader } from '@/components/application/layout';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto space-y-8 p-4 pb-12 md:py-12">
      <PageHeader
        title="Contact"
        description="문의 사항이나 협업 제안이 있다면 편하게 연락해 주세요."
      />
      <div className="grid gap-8 sm:grid-cols-[2fr_1fr]">
        <Section className="p-6 rounded-md bg-surface-secondary border">
          <SectionTitle>문의하기</SectionTitle>
          <ContactForm />
        </Section>
        <Section>
          <div className="space-y-2">
            <SectionTitle>연락처 정보</SectionTitle>
            <p className="text-sm text-text-muted">
              아래 정보를 통해 직접 연락하실 수 있습니다.
            </p>
          </div>
          <ContactLinks />
        </Section>
      </div>
    </main>
  );
}
