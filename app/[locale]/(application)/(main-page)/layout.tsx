import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { SectionNavigation } from '@/components/application/layout';

interface Props {
  children: React.ReactNode;
  about: React.ReactNode;
  skills: React.ReactNode;
  projects: React.ReactNode;
  history: React.ReactNode;
  contact: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function Layout({
  params,
  children,
  about,
  skills,
  projects,
  contact,
  history,
}: Props) {
  await resolveRequestLocale(params);

  return (
    <>
      {children}
      {about}
      {skills}
      {projects}
      {history}
      {contact}
      <SectionNavigation />
    </>
  );
}
