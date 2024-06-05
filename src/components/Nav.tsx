'use client';

import { BarChart, Home, Notebook,UserCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { menuItems } from '@/constants/menuItems';
import { cn } from '@/lib/utils';

import { Button } from './ui/button';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className='flex flex-col space-y-4 mt-8'>
      {menuItems.map((item) => {
        const isActive = item.path === pathname;

        return (
          <Link key={item.label} href={item.path}>
            <Button
              size='lg'
              variant={isActive ? 'default' : 'ghost'}
              className='w-full justify-start'
            >
              <item.Icon className='mr-2' /> {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};
