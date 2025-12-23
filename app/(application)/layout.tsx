import Navigation from '@/components/application/navigation';
import Footer from '@/components/application/footer';
import Header from '@/components/application/header';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Navigation />
      <Footer />
    </>
  );
}
