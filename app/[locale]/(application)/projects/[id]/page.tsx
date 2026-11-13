import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import { getProject } from '@/services/project';
import { createAlternates } from '@/lib/i18n/alternates';
import { ProjectDetail } from '@/components/application/projects/project-detail';
import { routing } from '@/i18n/routing';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ id }, locale] = await Promise.all([params, getLocale()]);
  const project = await getProject(id, { isPublic: true, language: locale });

  if (!project) {
    return {};
  }

  const title = project.title;
  const description = project.description ?? undefined;
  // 기본 언어는 기존 OG 주소를 유지한다
  const ogQuery = locale === routing.defaultLocale ? '' : `?lang=${locale}`;
  const ogImage: string =
    project.coverImage?.url ?? `/api/og/project/${project.id}${ogQuery}`;

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
  const [{ id }, locale] = await Promise.all([params, getLocale()]);
  const project = await getProject(id, { isPublic: true, language: locale });

  if (!project) {
    return notFound();
  }

  return <ProjectDetail project={project} />;
}
