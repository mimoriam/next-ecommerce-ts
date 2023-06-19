'use client';

import React, { useEffect, useState } from 'react';

export default function Hydrate({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till hydration completes before rendering the component:
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return <body></body>;

  return <body className="font-roboto px-4 lg:px-48">{children}</body>;
}
