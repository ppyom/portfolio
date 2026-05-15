import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
}

export function Field({
  disabled,
  invalid,
  required,
  className,
  ...props
}: Props) {
  return (
    <div
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      data-required={required || undefined}
      className={cn('group flex flex-col gap-2', className)}
      {...props}
    />
  );
}
