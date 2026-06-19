import { cn } from '@/lib/utils';

interface Props {
  items: string[];
  className?: string;
}

export function BulletList({ items, className }: Props) {
  return (
    <ul className={cn('space-y-2', className)}>
      {items.map((item, idx) => (
        <li
          key={`${item}_${idx}`}
          className={cn(
            'flex items-center gap-2 text-text-primary',
            'before:rounded-full before:size-1.5 before:inline-block before:bg-text-muted',
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
