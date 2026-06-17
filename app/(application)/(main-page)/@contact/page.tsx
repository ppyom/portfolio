import ContactForm from '@/components/application/contact/contact-form';
import PageTitle from '@/components/legacy/page-title';

export default function Page() {
  return (
    <section id="contact" className="py-20 px-6 bg-card/50">
      <div className="max-w-xl mx-auto space-y-12">
        <PageTitle>Contact</PageTitle>
        <ContactForm />
      </div>
    </section>
  );
}
