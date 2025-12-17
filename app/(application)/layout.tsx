import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
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
