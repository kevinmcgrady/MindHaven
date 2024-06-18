import type React from 'react';

import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='container  px-0 md:px-8 py-4 h-screen flex flex-col'>
      <Header />
      <section className='flex flex-1'>
        <section className='flex-1 w-full'>{children}</section>
      </section>
      <Footer />
    </main>
  );
}
