import { unstable_cache } from 'next/cache';

import { db } from '@/database';
import { skillMetadataTable } from '@/database/schema/skill-metadata.schema';
import type { SkillMetadata } from '@/types/skill';

export const getSkillMetadata = unstable_cache(
  async () => {
    const rows = await db
      .select({
        name: skillMetadataTable.name,
        color: skillMetadataTable.color,
      })
      .from(skillMetadataTable);

    return Object.fromEntries(
      rows.map(({ name, color }) => [name, { color }]),
    ) as Record<string, SkillMetadata>;
  },
  ['skill-color-map'],
  {
    tags: ['skill-metadata'],
  },
);
