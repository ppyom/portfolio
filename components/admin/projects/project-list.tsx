'use client';

import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { toast } from 'sonner';

import { updateProjectOrderAction } from '@/app/manage/projects/actions';
import SortableItem from '@/components/common/sortable/item';
import SortableList from '@/components/common/sortable/list';
import type { Project } from '@/types/project';

import ProjectCard from './project-card';

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  const [items, setItems] = useState(projects);
  const ids = items.map((p) => p.id);

  const handleMove = async (from: number, to: number) => {
    const nextItems = arrayMove(items, from, to);
    setItems(nextItems);

    const result = await updateProjectOrderAction(nextItems.map((p) => p.id));
    if (result.success) {
      toast.success('저장되었습니다.');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <SortableList onMove={handleMove} items={ids}>
      <div className="space-y-4">
        {items.map((project) => (
          <SortableItem key={project.id} id={project.id}>
            {({ listeners, attributes }) => (
              <ProjectCard
                project={project}
                dragHandleProps={{ listeners, attributes }}
              />
            )}
          </SortableItem>
        ))}
      </div>
    </SortableList>
  );
}
