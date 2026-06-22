'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { updateProjectOrderAction } from '@/app/manage/projects/actions';
import { toast } from '@/components/ui/toast';
import type { Project } from '@/types/project';

import { ProjectCard } from '../project-card';

interface Props {
  projects: Project[];
}

const DraggableList = dynamic(
  () =>
    import('@/components/ui/draggable-list').then(
      (mod) => mod.DraggableList<Project>,
    ),
  {
    ssr: false,
  },
);
const DraggableItem = dynamic(
  () =>
    import('@/components/ui/draggable-list').then((mod) => mod.DraggableItem),
  {
    ssr: false,
  },
);

export function ProjectList({ projects }: Props) {
  const [items, setItems] = useState(projects);

  const handleMove = async (projects: Project[]) => {
    setItems(projects);

    const result = await updateProjectOrderAction(projects.map((p) => p.id));
    if (result.success) {
      toast.success('저장되었습니다.');
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    (() => setItems(projects))();
  }, [projects]);

  return (
    <DraggableList
      items={items}
      getId={(project) => project.id}
      onChange={handleMove}
    >
      <div className="space-y-4">
        {items.map((project) => (
          <DraggableItem key={project.id} id={project.id}>
            <ProjectCard project={project} />
          </DraggableItem>
        ))}
      </div>
    </DraggableList>
  );
}
