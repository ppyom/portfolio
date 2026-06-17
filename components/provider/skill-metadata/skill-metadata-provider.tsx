'use client';

import type { SkillMetadata } from '@/types/skill';

import { SkillMetadataContext } from './skill-metadata-context';

interface Props {
  children: React.ReactNode;
  metadata: Record<string, SkillMetadata>;
}

export function SkillMetadataProvider({ children, metadata }: Props) {
  return (
    <SkillMetadataContext value={metadata}>{children}</SkillMetadataContext>
  );
}
