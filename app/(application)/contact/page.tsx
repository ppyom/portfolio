import PageTitle from '@/components/common/page-title';
import ContactForm from '@/components/application/contact/contact-form';
import ContactInformation from '@/components/application/contact/contact-information';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto space-y-4 py-4 md:py-12">
      <PageTitle align="left" className="ml-4">
        Contact
      </PageTitle>
      <div className="flex flex-col md:flex-row p-2">
        <div className="flex-2">
          <ContactForm />
        </div>
        <div className="flex-1 pl-6 md:pl-8">
          <ContactInformation />
        </div>
      </div>
    </main>
  );
}
