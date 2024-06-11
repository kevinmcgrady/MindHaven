import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

import { getUserDetails } from '@/queries/auth';

import { Button } from '../ui/button';
import Logo from './Logo';
import MobileNav from './MobileNav';
import UserButton from './UserButton';

export const Header = async () => {
  const user = await getUserDetails();

  return (
    <div className='flex gap-8 items-center mb-4 justify-between bg-white p-4 rounded-xl'>
      <Logo />
      <MobileNav
        userFirstName={user?.firstName}
        userLastName={user?.lastName}
      />
      <SignedIn>
        <UserButton
          userFirstName={user?.firstName!}
          userLastName={user?.lastName!}
        />
      </SignedIn>
      <SignedOut>
        <Link href='/sign-in'>
          <Button>Sign in</Button>
        </Link>
      </SignedOut>
    </div>
  );
};
