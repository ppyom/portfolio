import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
}

export default function Tag({ name, style, size = 'md' }: Props) {
  return (
    <span
      className={cn(
        'rounded-full font-medium',
        size === 'sm' && 'px-3 py-1 text-xs',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
      )}
      style={
        style || {
          border: '1px solid var(--color-muted-foreground)',
          color: 'var(--color-muted-foreground)',
          backgroundColor: 'var(--color-muted)',
        }
      }
    >
      {name}
    </span>
  );
}
