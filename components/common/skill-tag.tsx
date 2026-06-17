'use client';

import { dynamicTextColor } from '@/lib/utils/color';
import Tag from '@/components/common/tag';
import { useSkillMetadataContext } from '@/components/provider/skill-metadata';

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SkillTag(props: Props) {
  const skillMeta = useSkillMetadataContext();
  const color = skillMeta[props.name]?.color || '#aaaaaa';

  return (
    <Tag
      {...props}
      style={{
        background: color,
        color: dynamicTextColor(color),
      }}
    />
  );
}
