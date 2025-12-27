'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner';

import { updateProjectVisibilityAction } from '@/app/manage/projects/actions';
import { cn } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';

interface Props {
  projectId: string;
  isPublic: boolean;
}

export default function ProjectVisibilityToggle({
  projectId,
  isPublic,
}: Props) {
  const Icon = isPublic ? EyeIcon : EyeOffIcon;
  const label = (state: boolean) => (state ? '공개' : '비공개');

  return (
    <Toggle
      size="sm"
      className={cn(!isPublic && 'text-muted-foreground')}
      pressed={isPublic}
      onPressedChange={async (state) => {
        const result = await updateProjectVisibilityAction(projectId, state);
        if (result.success) {
          toast.success(`${label(state)} 상태로 전환했습니다.`);
        } else {
          toast.error(result.message);
        }
      }}
    >
      <Icon />
      {label(isPublic)}
    </Toggle>
  );
}
