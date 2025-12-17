import { Session } from 'next-auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Props {
  session: Session;
}

export default function UserAvatar({ session }: Props) {
  if (!session) {
    return null;
  }

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg grayscale">
        <AvatarFallback className="rounded-lg">
          {session.user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{session.user.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {session.user.username}
        </span>
      </div>
    </>
  );
}
