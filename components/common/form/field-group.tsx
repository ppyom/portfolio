import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
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
  headerActions?: React.ReactNode;
}

export default function FieldGroup({
  children,
  title,
  description,
  className,
  headerActions,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <CardAction>{headerActions}</CardAction>
      </CardHeader>
      <CardContent className={cn('space-y-2', className)}>
        {children}
      </CardContent>
    </Card>
  );
}
