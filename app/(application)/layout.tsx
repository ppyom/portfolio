import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <Navigation />
      <Footer />
    </>
  );
}
