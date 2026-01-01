import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface Props {
  children: React.ReactNode;
  label?: string;
  className?: string;
  required?: boolean;
}

export default function Field({ children, label, className, required }: Props) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className="gap-0.5">
          {label}
          {required && (
            <span className="text-destructive text-xs -translate-y-0.5">*</span>
          )}
        </Label>
      )}
      {children}
    </div>
  );
}
