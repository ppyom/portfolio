import { cn } from '@/lib/utils';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ required, className, children, ...props }: Props) {
  return (
    <label
      className={cn(
        'inline-flex text-sm font-medium leading-none text-text-primary group-data-disabled:cursor-not-allowed group-data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span
          className="ml-1 self-start leading-2 font-bold text-xs text-semantic-error"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
}
