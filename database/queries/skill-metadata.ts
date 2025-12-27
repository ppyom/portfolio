import { db } from '@/database';
import { skillMetadataTable } from '@/database/schema/skill-metadata.schema';
import type { SkillMetadata } from '@/types/skill';

export const getSkillMetadata = async () => {
  const rows = await db
    .select({
      name: skillMetadataTable.name,
      color: skillMetadataTable.color,
    })
    .from(skillMetadataTable);

  return Object.fromEntries(
    rows.map(({ name, color }) => [name, { color }]),
  ) as Record<string, SkillMetadata>;
};
