import type React from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='py-4 h-screen flex flex-col'>
      <Header />
      <section className='flex flex-1'>
        <LeftSidebar />
        <section className='flex-1 w-full ml-4'>{children}</section>
        {/* <RightSidebar /> */}
      </section>
      <Footer />
    </main>
  );
}
