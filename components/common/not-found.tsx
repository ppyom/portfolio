import { FileX2Icon, type LucideIcon } from 'lucide-react';

import Empty from '@/components/common/empty';

interface Props {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export default function NotFound({
  icon,
  title,
  description,
  children,
}: Props) {
  const IconComponent = icon || FileX2Icon;
  return (
    <Empty title={title} description={description} icon={IconComponent}>
      {children}
    </Empty>
  );
}
