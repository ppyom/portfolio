import { getSkillMetadata } from '@/database/queries/skill-metadata';
import { dynamicTextColor } from '@/lib/utils/color';
import Tag from '@/components/common/tag';

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default async function SkillTag(props: Props) {
  const skillMeta = await getSkillMetadata();
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
