import { sql } from '@db';

/*
CREATE TABLE IF NOT EXISTS login (
		id serial primary key,
		email text not null,
		code text not null,
		expiredAt timestamp
);
*/

export const selectByEmail = async (email: string) => {
  const result = await sql('SELECT * FROM login WHERE email = $1', [email]);
  if (typeof result !== 'string') {
    return result[0];
  }
};

export const insert = async (
  email: string,
  code: string,
  expiredAt: string,
) => {
  return await sql(
    `INSERT INTO login(email, code, expiredAt) VALUES($1, $2, $3)`,
    [email, code, expiredAt],
  );
};

export const update = async (id: number, code: string, expiredAt: string) => {
  return await sql(`UPDATE login SET code = $2, expiredAt = $3 WHERE id = $1`, [
    id,
    code,
    expiredAt,
  ]);
};
