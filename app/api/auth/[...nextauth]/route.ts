import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import { prisma } from '@/utils/prisma-init';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: 'secret',
  providers: [],
  events: {},
  callbacks: {},
});

export { handler as GET, handler as POST };
