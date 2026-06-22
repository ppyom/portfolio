import type { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/lib/utils';

interface Props<T extends ElementType> {
  as?: T;
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle<T extends ElementType = 'p'>({
  as,
  children,
  className,
  ...props
}: Props<T> & ComponentPropsWithoutRef<T>) {
  const Comp = as ?? 'p';
  return (
    <Comp className={cn('text-xl font-semibold', className)} {...props}>
      {children}
    </Comp>
  );
}
