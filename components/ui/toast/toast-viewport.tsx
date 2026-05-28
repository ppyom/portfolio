import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { useToast } from './toast-context';
import { ToastItem } from './toast-item';

const viewportVariants = cva(
  'fixed z-50 flex w-full max-w-sm flex-col gap-2 pointer-events-none',
  {
    variants: {
      position: {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
      },
    },
    defaultVariants: {
      position: 'top-right',
    },
  },
);

export function ToastViewport() {
  const { position, toasts } = useToast();

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        viewportVariants({
          position,
        }),
      )}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body,
  );
}
