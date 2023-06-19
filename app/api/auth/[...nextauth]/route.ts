import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import { prisma } from '@/utils/prisma-init';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // http://localhost:3000/api/auth/signin
    GithubProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),
  ],
  events: {},
  callbacks: {},
});

export { handler as GET, handler as POST };
