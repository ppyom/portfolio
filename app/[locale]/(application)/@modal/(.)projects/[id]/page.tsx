import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import { getProject } from '@/services/project';
import { ProjectDetailModal } from '@/components/application/projects/project-detail-modal';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const [{ id }, locale] = await Promise.all([params, getLocale()]);
  const project = await getProject(id, { isPublic: true, language: locale });

  if (!project) {
    return notFound();
  }

  return <ProjectDetailModal project={project} />;
}
