'use client';

import { dynamicTextColor } from '@/lib/utils/color';
import { Badge } from '@/components/ui/badge';
import { useSkillMetadataContext } from '@/components/provider/skill-metadata';

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SkillTag({ name, size = 'lg' }: Props) {
  const skillMeta = useSkillMetadataContext();
  const color = skillMeta[name]?.color || '#aaaaaa';

  return (
    <Badge
      style={{
        background: color,
        color: dynamicTextColor(color),
      }}
      size={size}
    >
      {name}
    </Badge>
  );
}
