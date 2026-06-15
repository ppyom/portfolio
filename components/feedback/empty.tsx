import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function Empty({ icon, title, description, children }: Props) {
  const IconComponent = icon;

  return (
    <div className="flex min-h-60 flex-col items-center justify-center gap-6 py-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full border bg-surface-secondary text-text-muted">
          <IconComponent className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">{title}</p>
          {description && (
            <p className="text-sm text-text-secondary">{description}</p>
          )}
        </div>
      </div>
      {children && (
        <div className="flex items-center justify-center gap-2">{children}</div>
      )}
    </div>
  );
}
