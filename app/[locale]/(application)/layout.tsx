import { getServerSession } from 'next-auth';
import { getLocale } from 'next-intl/server';

import { getResumeUrl } from '@/services/profile';
import authOptions from '@/lib/auth-options';
import { Footer, Header, ScrollToTop } from '@/components/application/layout';

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function Layout({ children, modal }: Props) {
  const locale = await getLocale();
  const [session, resumeUrl] = await Promise.all([
    getServerSession(authOptions),
    getResumeUrl(locale),
  ]);

  return (
    <>
      <Header session={session} resumeUrl={resumeUrl} />
      {children}
      {modal}
      <Footer />
      <ScrollToTop />
    </>
  );
}
