import { useEffect, useRef } from 'react';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const { open, setOpen } = useModal();

  useEffect(() => {
    contentRef.current?.focus();
  }, []);

  if (!open) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setOpen(false)}
      >
        <div
          ref={contentRef}
          className={cn(
            'relative z-10 w-full max-w-3xl',
            'h-full md:h-[calc(100vh-4rem)] overflow-y-auto',
            'md:rounded-lg bg-surface-primary p-6 shadow-lg',
            className,
          )}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
