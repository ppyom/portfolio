import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  name: string;
  href: string;
}

export default function ActionItem({ icon, name, href }: Props) {
  const IconComponent = icon;

  return (
    <Link
      href={href}
      className="flex items-center gap-4 border rounded-lg pl-4 py-2 hover:bg-muted/50"
    >
      <IconComponent className="size-4" />
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-sm">{name}</span>
        <span className="text-xs text-muted-foreground">바로 이동</span>
      </div>
    </Link>
  );
}
