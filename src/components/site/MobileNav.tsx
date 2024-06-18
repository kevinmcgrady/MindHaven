import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
          <Nav userFirstName={userFirstName} userLastName={userLastName} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
