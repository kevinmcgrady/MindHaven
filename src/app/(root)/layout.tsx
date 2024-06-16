import type React from 'react';

import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='container py-4 h-screen flex flex-col'>
      <Header />
      <section className='flex flex-1'>
        <section className='flex-1 w-full'>{children}</section>
      </section>
      <Footer />
      <Toaster />
    </main>
  );
}
