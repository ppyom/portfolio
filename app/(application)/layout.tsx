import { getServerSession } from 'next-auth';

import authOptions from '@/lib/auth-options';
import { Footer, Header, ScrollToTop } from '@/components/application/layout';

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function Layout({ children, modal }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      {children}
      {modal}
      <Footer />
      <ScrollToTop />
    </>
  );
}
