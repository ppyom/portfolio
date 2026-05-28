import { createContext, useContext } from 'react';
import type { useSortable } from '@dnd-kit/sortable';

type DragContextValue = {
  listeners: ReturnType<typeof useSortable>['listeners'];
  attributes: ReturnType<typeof useSortable>['attributes'];
  disabled?: boolean;
};

const DragContext = createContext<DragContextValue | null>(null);

export const useDrag = () => {
  const ctx = useContext(DragContext);
  if (!ctx) throw new Error('DragHandle must be used inside DraggableItem');
  return ctx;
};

export default DragContext;
