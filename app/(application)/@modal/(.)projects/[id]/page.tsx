import { notFound } from 'next/navigation';

import { getPublicProject } from '@/database/queries/project';
import ProjectDetailModal from '@/components/application/projects/project-detail-modal';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const [project] = await getPublicProject(id);

  if (!project) {
    return notFound();
  }

  return <ProjectDetailModal project={project} />;
}
