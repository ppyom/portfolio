import Navigation from '@/components/application/navigation';

interface Props {
  children: React.ReactNode;
  about: React.ReactNode;
  skills: React.ReactNode;
  projects: React.ReactNode;
  history: React.ReactNode;
  contact: React.ReactNode;
}

export default function Layout({
  children,
  about,
  skills,
  projects,
  contact,
  history,
}: Props) {
  return (
    <>
      {children}
      {about}
      {skills}
      {projects}
      {history}
      {contact}
      <Navigation />
    </>
  );
}
