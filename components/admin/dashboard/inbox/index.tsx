import Link from 'next/link';

import { getRecentMessages } from '@/services/contact';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import InboxMessageList from '@/components/admin/inbox/list';

export default async function DashboardInbox() {
  const messages = await getRecentMessages();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground">받은 메시지</CardTitle>
        <CardAction>
          <Button className="text-xs" variant="link" size="sm" asChild>
            <Link href="/manage/inbox">더보기</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="min-h-96">
          <InboxMessageList messages={messages} />
        </div>
      </CardContent>
    </Card>
  );
}
