import type { SkillMetadata } from '@/types/skill';

export function createSkillMetadataDefaultValues(
  metadata: Record<string, SkillMetadata>,
): { items: { name: string; color: string }[] } {
  return {
    items: Object.entries(metadata).map(([name, value]) => ({
      name,
      color: value.color,
    })),
  };
}
