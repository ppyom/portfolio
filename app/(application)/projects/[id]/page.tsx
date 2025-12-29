import { notFound } from 'next/navigation';

import { getPublicProject } from '@/database/queries/project';
import ProjectContents from '@/components/application/projects/project-detail';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const [project] = await getPublicProject.execute({ projectId: id });

  if (!project) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <ProjectContents project={project} />
    </main>
  );
}
