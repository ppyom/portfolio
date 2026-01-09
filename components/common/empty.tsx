import type { LucideIcon } from 'lucide-react';

import {
  Empty as EmptyRoot,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function Empty({ icon, title, description, children }: Props) {
  const IconComponent = icon;
  return (
    <EmptyRoot>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconComponent />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {children && <EmptyContent>{children}</EmptyContent>}
    </EmptyRoot>
  );
}
