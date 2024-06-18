import { getUserDetails } from '@/queries/auth';

import { Button } from '../ui/button';
import Logo from './Logo';
import MobileNav from './MobileNav';
import UserButton from './UserButton';

export const Header = async () => {
  const user = await getUserDetails();

  return (
    <div className='flex gap-8 items-center mb-4 justify-between bg-white p-4'>
      <Logo />
      <MobileNav
        userFirstName={user?.firstName}
        userLastName={user?.lastName}
      />
    </div>
  );
};
