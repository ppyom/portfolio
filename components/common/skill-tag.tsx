import Tag from '@/components/common/tag';
import { skillHex } from '@/lib/constants/skills';
import { dynamicTextColor } from '@/lib/utils/color';

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SkillTag(props: Props) {
  return (
    <Tag
      {...props}
      style={{
        background: skillHex[props.name] || '#aaaaaa',
        color: dynamicTextColor(skillHex[props.name] || '#aaaaaa'),
      }}
    />
  );
}
