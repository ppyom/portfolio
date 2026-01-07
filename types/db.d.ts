import { PgDatabase } from 'drizzle-orm/pg-core';
import type { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';

export type DbClient = PgDatabase<PostgresJsQueryResultHKT>;
