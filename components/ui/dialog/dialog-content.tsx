import { cn } from '@/lib/utils';

import { useDialog } from './dialog-context';
import { DialogPortal } from './dialog-portal';

export function DialogContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { id, open, setOpen } = useDialog();

  if (!open) return null;

  return (
    <DialogPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setOpen(false)}
      >
        <div
          className={cn(
            'w-full max-w-lg rounded-lg border bg-background p-6 shadow-xl',
            className,
          )}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
        >
          {children}
        </div>
      </div>
    </DialogPortal>
  );
}
