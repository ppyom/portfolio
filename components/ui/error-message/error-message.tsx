import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ className, ...props }: Props) {
  return (
    <p
      className={cn(
        'text-xs font-medium leading-relaxed text-semantic-error',
        className,
      )}
      role="alert"
      {...props}
    />
  );
}
