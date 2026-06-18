import { Footer, Header, ScrollToTop } from '@/components/application/layout';

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, modal }: Props) {
  return (
    <>
      <Header />
      {children}
      {modal}
      <Footer />
      <ScrollToTop />
    </>
  );
}
