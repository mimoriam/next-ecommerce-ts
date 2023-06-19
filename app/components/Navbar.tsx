'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Session } from 'next-auth';

type PageProps = {
  session: Session | null;
};

export default function NavBar({ session }: PageProps) {
  return (
    <nav className="flex items-center justify-between py-8">
      <h1>NavBar</h1>
      <ul className="flex items-center gap-12">
        {/* If user is not signed in: */}
        {!session && (
          <li className="rounded-md bg-teal-600 px-4 py-2 text-white">
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}
        {session && (
          <div>
            <li>
              <Image
                src={session.user?.image as string}
                alt={session.user?.name as string}
                height={48}
                width={48}
                className="rounded-full"
                priority={true}
              />
            </li>
            <li>Dashboard</li>
          </div>
        )}
      </ul>
    </nav>
  );
}
