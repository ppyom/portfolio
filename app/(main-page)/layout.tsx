import { Navigation } from '@/components/navigation';

interface Props {
  children: React.ReactNode;
  about: React.ReactNode;
}

export default function Layout({ children, about }: Props) {
  return (
    <>
      {children}
      {about}
      <Navigation />
    </>
  );
}
