import { notFound } from 'next/navigation';

import { getProject } from '@/services/project';
import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { ProjectDetailModal } from '@/components/application/projects/project-detail-modal';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

// 빌드 시 DB 조회를 피하고 첫 요청 때 생성해 캐시한다 ([locale]/layout.tsx 참고)
export function generateStaticParams() {
  return [];
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

  return <ProjectDetailModal project={project} />;
}
