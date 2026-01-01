import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function PageTitle({
  children,
  align = 'center',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'space-y-4',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-foreground/90 font-dongle">
        {children}
      </h2>
      <div
        className={cn(
          'w-20 h-1 bg-primary rounded-full',
          align === 'center' && 'mx-auto',
        )}
      />
    </div>
  );
}
