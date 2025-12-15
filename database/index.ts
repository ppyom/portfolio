import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { config } from '@/lib/config';

const client = postgres(config.db.url, { prepare: false });
export const db = drizzle(client);
