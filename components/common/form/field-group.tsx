import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
