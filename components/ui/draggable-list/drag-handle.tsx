import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useDrag } from './draggable-context';

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'disabled'
>;

export function DragHandle({ className, ...props }: Props) {
  const { listeners, attributes, disabled } = useDrag();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      {...(disabled ? {} : attributes)}
      {...(disabled ? {} : listeners)}
      className={cn(
        'flex items-center justify-center',
        'text-text-muted transition-colors',
        'cursor-grab active:cursor-grabbing hover:text-text-primary',
        className,
      )}
      {...props}
    >
      ⠿
    </Button>
  );
}
