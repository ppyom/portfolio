'use client';

import { cn } from '@/lib/utils';
import { fullDateString } from '@/lib/utils/date';
import { DragHandle } from '@/components/ui/draggable-list';
import type { Project } from '@/types/project';

import { ProjectDropdown } from './project-dropdown';

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  return (
    <div
      className={cn(
        'relative bg-surface-secondary px-1 py-6 rounded-lg flex gap-2',
      )}
    >
      <DragHandle />
      <div className="space-y-4 flex-1">
        <div className="mr-10">
          <p className="text-text-primary font-semibold line-clamp-1">
            {project.title}
          </p>
          {project.description && (
            <p className="text-text-secondary line-clamp-1">
              {project.description}
            </p>
          )}
        </div>
        <div className="text-sm space-y-1">
          <div className="space-x-4">
            <span className="text-text-muted">수정일</span>
            <span>{fullDateString(project.updatedAt)}</span>
          </div>
          <div className="space-x-4">
            <span className="text-text-muted">공개 상태</span>
            <span>{project.isPublic ? '공개' : '비공개'}</span>
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-6">
        <ProjectDropdown
          projectId={project.id}
          isPublic={!!project.isPublic}
          applicationUrl={project.applicationUrl}
        />
      </div>
    </div>
  );
}
