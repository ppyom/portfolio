import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function AdminMain({ children, className }: Props) {
  return (
    <main
      className={cn(
        'min-w-0 flex-1 flex flex-col bg-surface-primary',
        className,
      )}
    >
      {children}
    </main>
  );
}
