import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import DragContext from './draggable-context';

interface Props {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export function DraggableItem({ id, children, disabled }: Props) {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    attributes,
    listeners,
  } = useSortable({ id, disabled });

  return (
    <DragContext.Provider value={{ attributes, listeners, disabled }}>
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className={cn(
          isDragging && 'opacity-60',
          disabled && ['opacity-50', 'pointer-events-none'],
        )}
      >
        {children}
      </div>
    </DragContext.Provider>
  );
}
