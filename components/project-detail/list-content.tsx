import { cn } from '@/lib/utils';

interface Props {
  name: string;
  items: string[];
  color?: 'primary' | 'secondary' | 'neutral';
  className?: string;
}

export default function ListContent({
  name,
  items,
  color = 'primary',
  className,
}: Props) {
  return (
    <ul className={className}>
      {items.map((item, idx) => (
        <li
          key={`${name}_${idx}`}
          className={cn(
            'flex items-center gap-2',
            'before:size-1.5 before:inline-block',
            color === 'primary' && 'before:bg-chart-1',
            color === 'secondary' && 'before:bg-chart-2',
            color === 'neutral' && 'before:bg-neutral-500',
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
