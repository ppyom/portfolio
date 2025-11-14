import { skillHex } from '@/lib/constants/skills';
import { cn, dynamicTextColor } from '@/lib/utils';

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SkillTag({ name, size = 'md' }: Props) {
  return (
    <span
      className={cn(
        'rounded-full cursor-default font-medium',
        size === 'sm' && 'px-3 py-1 text-xs',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
      )}
      style={{
        background: skillHex[name] || '#aaaaaa',
        color: dynamicTextColor(skillHex[name] || '#aaaaaa'),
      }}
    >
      {name}
    </span>
  );
}
