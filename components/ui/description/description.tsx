import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLParagraphElement>;

export function Description({ className, ...props }: Props) {
  return (
    <p
      className={cn('text-xs leading-relaxed text-text-muted', className)}
      {...props}
    />
  );
}
