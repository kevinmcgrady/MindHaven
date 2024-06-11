import type React from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { syncUser } from '@/queries/auth';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUser();

  return (
    <main className='container py-4 h-screen flex flex-col'>
      <Header />
      <section className='flex flex-1'>
        <LeftSidebar />
        <section className='flex-1 w-full md:ml-4'>{children}</section>
        <RightSidebar />
      </section>
      <Footer />
    </main>
  );
}
