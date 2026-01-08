import { db } from '@/database';
import { skillMetadataTable } from '@/database/schema/skill-metadata.schema';
import { SkillMetadataTable } from '@/database/types/skill';
import type { DbClient } from '@/types/db';

export const getSkillMetadataQuery = db
  .select({
    name: skillMetadataTable.name,
    color: skillMetadataTable.color,
  })
  .from(skillMetadataTable)
  .prepare('get_skill_metadata');

export const insertSkillMetadataQuery = (
  metadata: SkillMetadataTable.Insert[],
  client: DbClient = db,
) => client.insert(skillMetadataTable).values(metadata);

export const deleteSkillMetadataQuery = (client: DbClient = db) =>
  client.delete(skillMetadataTable);
