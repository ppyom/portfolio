import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {}

export function Description({ className, ...props }: Props) {
  return (
    <p
      className={cn('text-xs leading-relaxed text-text-muted', className)}
      {...props}
    />
  );
}
