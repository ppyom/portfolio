import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'section'> {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className, ...props }: Props) {
  return (
    <section className={cn('space-y-6', className)} {...props}>
      {children}
    </section>
  );
}
