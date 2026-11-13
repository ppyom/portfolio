import { getLocale } from 'next-intl/server';

import { getResumeUrl } from '@/services/profile';
import { Footer, Header, ScrollToTop } from '@/components/application/layout';
import { SessionProvider } from '@/components/provider/session-provider';

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function Layout({ children, modal }: Props) {
  const locale = await getLocale();
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
