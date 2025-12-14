import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export default function FieldGroup({
  children,
  title,
  description,
  className,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn('space-y-2', className)}>
        {children}
      </CardContent>
    </Card>
  );
}
