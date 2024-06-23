'use client';

import { UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { menuItems } from '@/constants/menuItems';

import CardSection from '../layout/CardSection';
import { Button } from '../ui/button';

type MobileNavProps = {
  userFirstName: string | undefined | null;
  userLastName: string | undefined | null;
};

const MobileNav = ({ userFirstName, userLastName }: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <div className='xl:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className='cursor-pointer' />
        </SheetTrigger>
        <SheetContent side='top'>
          <CardSection noSpacing>
            <nav className='flex flex-col space-y-4'>
              {menuItems.map((item) => {
                const isActive = item.path === pathname;
                return (
                  <Link key={item.label} href={item.path}>
                    <SheetClose asChild>
                      <Button
                        size='lg'
                        variant={isActive ? 'default' : 'ghost'}
                        className='w-full justify-start'
                      >
                        <item.Icon className='mr-2' /> {item.label}
                      </Button>
                    </SheetClose>
                  </Link>
                );
              })}

              <div className='flex gap-2 items-center p-4 rounded-lg border'>
                <UserButton />
                <p className='font-semibold text-sm'>
                  {userFirstName} {userLastName}
                </p>
              </div>
            </nav>
          </CardSection>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
