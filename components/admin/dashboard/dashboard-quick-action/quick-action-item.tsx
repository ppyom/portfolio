import Link from 'next/link';
import { ChevronRightIcon, type LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  name: string;
  href: string;
}

export function QuickActionItem({ icon, name, href }: Props) {
  const IconComponent = icon;

  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-md p-4 bg-surface-elevated hover:bg-surface-elevated/80"
    >
      <IconComponent size={16} />
      <span className="flex-1 font-medium text-sm">{name}</span>
      <ChevronRightIcon className="text-text-muted" size={14} />
    </Link>
  );
}
