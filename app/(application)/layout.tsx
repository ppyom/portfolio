import { getServerSession } from 'next-auth';

import { getResumeUrl } from '@/services/profile';
import authOptions from '@/lib/auth-options';
import { Footer, Header, ScrollToTop } from '@/components/application/layout';

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function Layout({ children, modal }: Props) {
  const [session, resumeUrl] = await Promise.all([
    getServerSession(authOptions),
    getResumeUrl(),
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
