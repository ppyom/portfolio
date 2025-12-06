import Navigation from '@/components/navigation';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <Navigation />
    </>
  );
}
