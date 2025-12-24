import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { config } from '@/lib/config';

const client = postgres(config.db.url, { prepare: false });
export const db = drizzle(client);
