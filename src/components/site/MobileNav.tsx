import { UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { PlanUpgrade } from '../PlanUpgrade';
import { Nav } from './Nav';

type MobileNavProps = {
  userFirstName: string | undefined | null;
  userLastName: string | undefined | null;
};

const MobileNav = ({ userFirstName, userLastName }: MobileNavProps) => {
  return (
    <div className='xl:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className='cursor-pointer' />
        </SheetTrigger>
        <SheetContent side='top'>
          <Nav />
          <PlanUpgrade />
          <div className='flex gap-2 items-center mt-8'>
            <UserButton />
            <p className='text-sm font-semibold'>
              {userFirstName} {userLastName}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
