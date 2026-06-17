import { cn } from '@/lib/utils';

import { useModal } from './modal-context';
import { ModalPortal } from './modal-portal';

export function ModalContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open, setOpen } = useModal();

  if (!open) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setOpen(false)}
      >
        <div
          className={cn(
            'relative z-10 w-full max-w-3xl',
            'h-full md:h-[calc(100vh-4rem)] overflow-y-auto',
            'md:rounded-lg bg-surface-elevated p-6 shadow-lg',
            className,
          )}
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
