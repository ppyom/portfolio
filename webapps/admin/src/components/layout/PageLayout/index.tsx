import type { ChildrenProps } from '@packages/types/components';
import { cn } from '@packages/ui/utils';

interface Props extends ChildrenProps {
  className?: string;
}

export const PageLayout = ({ children, className }: Props) => {
  return (
    <>
      <div className={cn('p-4', 'text-neutral-600', className)}>{children}</div>
    </>
  );
};
