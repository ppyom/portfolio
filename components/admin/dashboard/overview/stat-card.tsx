import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function StatCard({ title, children }: Props) {
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
