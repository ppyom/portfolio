// drizzle-kit migrate는 실패해도 에러를 출력하지 않고 끝나서 원인을 알 수 없다.
// drizzle-orm migrator를 직접 호출해 적용 대상과 실제 에러를 보여준다.
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { readFileSync } from 'node:fs';
import postgres from 'postgres';

const MIGRATIONS_FOLDER = './database/migrations';

const url = process.env.DATABASE_SESSION_URL;
if (!url) {
  console.error('DATABASE_SESSION_URL이 설정되지 않았습니다.');
  process.exit(1);
}

const client = postgres(url, { max: 1, onnotice: () => {} });

try {
  // migrator는 기록 테이블의 마지막 created_at 이후 항목만 적용하므로 같은 기준으로 대상을 보여준다
  const [last] = await client`
    select created_at from drizzle.__drizzle_migrations
    order by created_at desc limit 1
  `.catch(() => []);
  const lastAppliedAt = last ? Number(last.created_at) : 0;

  const { entries } = JSON.parse(
    readFileSync(`${MIGRATIONS_FOLDER}/meta/_journal.json`, 'utf8'),
  );
  const pending = entries.filter((entry) => entry.when > lastAppliedAt);

  if (pending.length === 0) {
    console.log('적용할 마이그레이션이 없습니다.');
  } else {
    console.log('적용할 마이그레이션:');
    pending.forEach((entry) => console.log(`  - ${entry.tag}`));

    await migrate(drizzle(client), { migrationsFolder: MIGRATIONS_FOLDER });
    console.log('마이그레이션을 적용했습니다.');
  }
} catch (error) {
  console.error('마이그레이션에 실패했습니다. 모든 변경은 롤백되었습니다.');
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.end();
}
