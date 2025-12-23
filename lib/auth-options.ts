import * as bcrypt from 'bcrypt';
import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';
import { db } from '@/database';
import { userTable } from '@/database/schema/user.schema';
import { config } from '@/lib/config';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const [user] = await db
          .select()
          .from(userTable)
          .where(eq(userTable.username, credentials.username));

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          admin: user.admin,
        };
      },
    }),
  ],
  secret: config.nextauth.secret,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7일
  },
  callbacks: {
    async jwt(params) {
      const { token, user } = params;
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session(params: { session: Session; token: JWT }) {
      const { session, token } = params;
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default authOptions;
