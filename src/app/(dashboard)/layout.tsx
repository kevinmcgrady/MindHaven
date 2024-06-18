import type React from 'react';

import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { LeftSidebar } from '@/components/site/LeftSidebar';
import { RightSidebar } from '@/components/site/RightSidebar';
import SearchBar from '@/components/site/SearchBar';
import { syncUser } from '@/queries/auth';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUser();

  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      <SearchBar />
      <section className='container px-0 md:px-8 flex flex-1 mb-4'>
        <LeftSidebar />
        <section className='flex-1 w-full'>{children}</section>
        <RightSidebar />
      </section>
      <Footer />
    </main>
  );
}
