import { eq, sql } from 'drizzle-orm';

import { db } from '@/database';
import { techStackTable } from '@/database/schema/tech-stack.schema';
import { TechStackTable } from '@/database/types/project';
import type { DbClient } from '@/types/db';

export const insertTechStack = (
  techStacks: TechStackTable.Insert[],
  client: DbClient = db,
) =>
  client
    .insert(techStackTable)
    .values(
      techStacks.map((t) => ({
        ...t,
        projectId: sql.placeholder('projectId'),
      })),
    )
    .onConflictDoUpdate({
      target: [techStackTable.projectId, techStackTable.title],
      set: {
        stacks: sql`excluded.stacks`,
      },
    });
export const deleteTechStack = (client: DbClient = db) =>
  client
    .delete(techStackTable)
    .where(eq(techStackTable.projectId, sql.placeholder('projectId')));
