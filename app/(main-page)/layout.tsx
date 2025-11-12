import { Navigation } from '@/components/navigation';

interface Props {
  children: React.ReactNode;
  about: React.ReactNode;
  skills: React.ReactNode;
}

export default function Layout({ children, about, skills }: Props) {
  return (
    <>
      {children}
      {about}
      {skills}
      <Navigation />
    </>
  );
}
