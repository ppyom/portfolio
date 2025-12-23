'use client';

import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface Props {
  children: React.ReactNode;
  onMove: (from: number, to: number) => void;
  items: string[];
}

export default function SortableList({ children, onMove, items }: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const from = items.indexOf(active.id as string);
    const to = items.indexOf(over.id as string);

    if (from !== to) {
      onMove(from, to);
    }
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
