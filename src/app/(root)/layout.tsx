import type React from 'react';

import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=' h-screen flex flex-col'>
      <Header hideMobileNav />
      <section className='flex flex-1'>
        <section className='flex-1 w-full'>{children}</section>
      </section>
      <Footer />
    </main>
  );
}
