import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProject } from '@/services/project';
import { createAlternates } from '@/lib/i18n/alternates';
import { ProjectDetail } from '@/components/application/projects/project-detail';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id, { isPublic: true });

  if (!project) {
    return {};
  }

  const title = project.title;
  const description = project.description ?? undefined;
  const ogImage: string =
    project.coverImage?.url ?? `/api/og/project/${project.id}`;

  return {
    title,
    description,
    alternates: await createAlternates(`/projects/${id}`),
    openGraph: {
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id, { isPublic: true });

  if (!project) {
    return notFound();
  }

  return <ProjectDetail project={project} />;
}
