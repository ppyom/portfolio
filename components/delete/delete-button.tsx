import { Trash2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = Omit<React.ComponentProps<typeof Button>, 'children'>;

export function DeleteButton({ className, ...props }: Props) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn('text-text-muted', className)}
      {...props}
    >
      <Trash2Icon size={14} />
    </Button>
  );
}
