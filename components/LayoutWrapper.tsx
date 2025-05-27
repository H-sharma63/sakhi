'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCheckoutPage = pathname === '/checkout';

  return (
    <>
      {!isCheckoutPage && <Navbar />}
      {children}
    </>
  );
}