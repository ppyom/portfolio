import { Section, SectionTitle } from '@/components/ui/section';
import { ContactForm } from '@/components/application/contact/contact-form';

export default function Page() {
  return (
    <Section id="contact" className="py-20 px-6 max-w-xl mx-auto space-y-12">
      <SectionTitle className="text-3xl text-center">Contact</SectionTitle>
      <ContactForm />
    </Section>
  );
}
