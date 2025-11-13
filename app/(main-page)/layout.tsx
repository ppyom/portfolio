import { Navigation } from '@/components/navigation';

interface Props {
  children: React.ReactNode;
  about: React.ReactNode;
  skills: React.ReactNode;
  projects: React.ReactNode;
}

export default function Layout({ children, about, skills, projects }: Props) {
  return (
    <>
      {children}
      {about}
      {skills}
      {projects}
      <Navigation />
    </>
  );
}
