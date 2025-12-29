'use client';

import { useEffect } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function BaseModal({
  open,
  onClose,
  children,
  className,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur"
        onClick={onClose}
      />

      {/* 모달 콘텐츠 */}
      <div
        className={cn(
          'h-full sm:h-[calc(100vh-4rem)] overflow-y-auto',
          'relative z-10 w-full max-w-2xl sm:rounded-lg bg-background p-6 shadow-lg',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
