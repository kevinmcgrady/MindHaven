import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import type React from 'react';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const maprope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MindHaven',
  description: 'Your Sanctuary for Mental Wellness',
  icons: {
    icon: '/images/blob.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={cn(maprope.className, 'bg-[#F8F9FC]')}>
          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
