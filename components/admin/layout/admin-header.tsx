import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function AdminHeader({ children, className }: Props) {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 h-14 flex items-center gap-3 border-b bg-surface-primary px-4',
        className,
      )}
    >
      {children}
    </header>
  );
}
