import { cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { type ToastItem as ToastItemType, useToast } from './toast-context';

interface Props {
  toast: ToastItemType;
}

const toastVariants = cva(
  'pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-surface-elevated border-border text-text-primary',
        success:
          'bg-semantic-success/10 border-semantic-success/20 text-text-semantic-success',
        error:
          'bg-semantic-error/10 border-semantic-error/20 text-text-semantic-error',
        warning:
          'bg-semantic-warning/10 border-semantic-warning/20 text-text-semantic-warning',
        info: 'bg-semantic-info/10 border-semantic-info/20 text-text-semantic-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function ToastItem({ toast }: Props) {
  const { removeToast } = useToast();

  return (
    <div
      className={cn(
        toastVariants({
          variant: toast.variant,
        }),
        toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
      )}
      role={toast.variant === 'error' ? 'alert' : 'status'}
      aria-live={toast.variant !== 'error' ? 'polite' : undefined}
    >
      <div className="flex-1">
        <p className="text-sm font-medium">{toast.title}</p>

        {toast.description && (
          <p className="mt-1 text-xs opacity-80">{toast.description}</p>
        )}
      </div>
      {toast.closable && (
        <button
          type="button"
          onClick={() => removeToast(toast.id)}
          className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
          aria-label="Close toast"
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
}
