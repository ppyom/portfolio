import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export default function Field({ children, label, className }: Props) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}
      {children}
    </div>
  );
}
