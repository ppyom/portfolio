import Footer from '@/components/application/footer';
import Header from '@/components/application/header';

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
    </>
  );
}
