'use client';

import { useRouter } from 'next/navigation';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Modal, ModalClose, ModalContent } from '@/components/ui/modal';
import type { Project } from '@/types/project';

import { ProjectDetail } from './project-detail';

interface Props {
  project: Project;
}

export default function ProjectDetailModal({ project }: Props) {
  const router = useRouter();
  return (
    <Modal defaultOpen={true} onOpenChange={() => router.back()}>
      <ModalContent>
        <ProjectDetail project={project} />
        <ModalClose>
          <Button className="absolute top-4 right-4" variant="ghost" size="sm">
            <XIcon size={14} />
          </Button>
        </ModalClose>
      </ModalContent>
    </Modal>
  );
}
