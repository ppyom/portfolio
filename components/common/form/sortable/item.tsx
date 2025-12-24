'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { cn } from '@/lib/utils';

interface SortableItemProps {
  id: string;
  children: (props: {
    listeners: ReturnType<typeof useSortable>['listeners'];
    attributes: ReturnType<typeof useSortable>['attributes'];
    isDragging: boolean;
  }) => React.ReactNode;
}

export default function SortableItem({ id, children }: SortableItemProps) {
  const { setNodeRef, attributes, listeners, transform, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && 'opacity-70 ring-2 ring-primary')}
    >
      {children({ listeners, attributes, isDragging })}
    </div>
  );
}
