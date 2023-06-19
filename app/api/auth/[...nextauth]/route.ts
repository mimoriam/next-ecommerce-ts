import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import { prisma } from '@/utils/prisma-init';
import GithubProvider from 'next-auth/providers/github';
import Stripe from 'stripe';

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
  events: {
    // Create a new Stripe customer as the user signs up:
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
        apiVersion: '2022-11-15',
      });

      const costumer = await stripe.customers.create({
        email: user.email || undefined,
        name: user.name || undefined,
      });

      // Also update our Prisma User model with the stripeCustomerId:
      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripeCustomerId: costumer.id,
        },
      });
    },
  },
  callbacks: {},
});

export { handler as GET, handler as POST };
