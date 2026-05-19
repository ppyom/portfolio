import { cn } from '@/lib/utils';
import { useDialog } from '@/components/ui/dialog/dialog-context';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export function DialogTitle({ as: Comp = 'h2', className, ...props }: Props) {
  const { id } = useDialog();
  return (
    <Comp
      id={`${id}-title`}
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
}
