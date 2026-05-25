import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface Props extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

const avatarVariants = cva(
  'relative inline-flex shrink-0 overflow-hidden rounded-full bg-surface-secondary select-none items-center justify-center font-medium',
  {
    variants: {
      size: {
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-14 text-base',
        xl: 'size-20 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export function Avatar({ src, alt, fallback, size, className }: Props) {
  const [error, setError] = useState(false);

  const showFallback = !src || error;

  return (
    <div className={cn(avatarVariants({ size }), className)} aria-label={alt}>
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-text-secondary">{fallback ?? '?'}</span>
      )}
    </div>
  );
}
