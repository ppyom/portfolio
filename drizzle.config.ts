import { defineConfig } from 'drizzle-kit';
import { config } from '@/lib/config';

export default defineConfig({
  schema: './database/schema.ts',
  out: './database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.db.url,
  },
});
