import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: Props) {
  return (
    <div className={cn('mb-10 space-y-2', className)}>
      <p className="text-3xl font-bold text-text-primary">{title}</p>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  );
}
