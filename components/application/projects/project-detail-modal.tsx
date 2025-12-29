'use client';

import { useRouter } from 'next/navigation';

import BaseModal from '@/components/common/base-modal';
import type { Project } from '@/types/project';

import ProjectContents from './project-detail';

interface Props {
  project: Project;
}

export default function ProjectDetailModal({ project }: Props) {
  const router = useRouter();
  return (
    <BaseModal open={true} onClose={() => router.back()}>
      <ProjectContents project={project} />
    </BaseModal>
  );
}
