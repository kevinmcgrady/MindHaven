import type React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex items-center justify-center h-screen bg-gradient-to-r from-[#CCD9D7] to-[#f8f8f3]'>
      {children}
    </main>
  );
}
