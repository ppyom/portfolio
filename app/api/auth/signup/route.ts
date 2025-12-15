import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from '@/database';
import { userTable } from '@/database/schema';

export const POST = async (request: Request) => {
  const { username, password, name } = await request.json();

  if (!username || !password || !name) {
    return Response.json('입력 값이 올바르지 않습니다.', { status: 400 });
  }

  try {
    const result = await db.transaction(async (tx) => {
      const [existingUser] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.username, username));

      if (!!existingUser) {
        throw new Error('이미 가입된 이메일입니다.');
      }

      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUND || 10),
      );

      const newUser = await tx
        .insert(userTable)
        .values({
          username,
          password: hashedPassword,
          name,
        })
        .returning();

      if (!newUser) {
        throw new Error('실패했습니다.');
      }

      return newUser;
    });

    if (!result) {
      throw new Error('실패했습니다.');
    }

    return Response.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(error.message, { status: 400 });
    }
  }
};
