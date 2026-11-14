import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProject } from '@/services/project';
import { createAlternates } from '@/lib/i18n/alternates';
import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { ProjectDetail } from '@/components/application/projects/project-detail';
import { routing } from '@/i18n/routing';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

// 빌드 시 DB 조회를 피하고 첫 요청 때 생성해 캐시한다 ([locale]/layout.tsx 참고)
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ id }, locale] = await Promise.all([
    params,
    resolveRequestLocale(params),
  ]);
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
  const [{ id }, locale] = await Promise.all([
    params,
    resolveRequestLocale(params),
  ]);
  const project = await getProject(id, { isPublic: true, language: locale });

  if (!project) {
    return notFound();
  }

  return <ProjectDetail project={project} />;
}
