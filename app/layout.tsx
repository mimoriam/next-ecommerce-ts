import React from 'react';
import './globals.css';
import NavBar from '@/app/components/Navbar';
import Hydrate from '@/app/components/Hydrate';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Hydrate>
        <NavBar session={session} />
        {children}
      </Hydrate>
    </html>
  );
}
