import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui-legacy/card';

interface Props {
  title: string;
  children: React.ReactNode;
}

export function StatCard({ title, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-right">{children}</div>
      </CardContent>
    </Card>
  );
}
