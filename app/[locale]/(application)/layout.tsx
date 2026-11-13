import { getResumeUrl } from '@/services/profile';
import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { Footer, Header, ScrollToTop } from '@/components/application/layout';
import { SessionProvider } from '@/components/provider/session-provider';

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function Layout({ children, modal, params }: Props) {
  const locale = await resolveRequestLocale(params);
  const resumeUrl = await getResumeUrl(locale);

  return (
    <SessionProvider>
      <Header resumeUrl={resumeUrl} />
      {children}
      {modal}
      <Footer />
      <ScrollToTop />
    </SessionProvider>
  );
}
