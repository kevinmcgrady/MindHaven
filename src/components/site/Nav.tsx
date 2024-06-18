'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CardSection from '@/components/layout/CardSection';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/constants/menuItems';

type NavProps = {
  userFirstName: string | undefined | null;
  userLastName: string | undefined | null;
};

export const Nav = ({ userFirstName, userLastName }: NavProps) => {
  const pathname = usePathname();
  return (
    <CardSection noSpacing>
      <nav className='flex flex-col space-y-4'>
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

        <div className='flex gap-2 items-center p-4 rounded-lg border'>
          <UserButton />
          <p className='font-semibold text-sm'>
            {userFirstName} {userLastName}
          </p>
        </div>
      </nav>
    </CardSection>
  );
};
