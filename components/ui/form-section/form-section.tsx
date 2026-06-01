import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        'rounded-lg border bg-surface-secondary space-y-4 p-6',
        className,
      )}
    >
      <header className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="text-title-sm font-semibold">{title}</p>
          {description && (
            <p className="text-body-sm text-text-muted">{description}</p>
          )}
        </div>
      </header>
      <div>{children}</div>
    </section>
  );
}
