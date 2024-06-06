import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

import MobileNav from './MobileNav';
import { Button } from './ui/button';

export const Header = async () => {
  const user = await currentUser();

  return (
    <div className='flex gap-8 items-center mb-4 justify-between'>
      <div className='flex gap-2 items-center'>
        <Image
          src='/images/blob.png'
          alt='MindHaven'
          width={50}
          height={50}
          className='w-fit h-fit aspect-square relative'
        />
        <Link href='/'>
          <h1 className='font-extrabold text-lg'>MindHaven</h1>
        </Link>
      </div>
      <MobileNav
        userFirstName={user?.firstName}
        userLastName={user?.lastName}
      />
      <SignedIn>
        <div className='gap-2 items-center hidden md:flex'>
          <UserButton />
          <p className='text-sm font-semibold'>
            {user?.firstName} {user?.lastName}
          </p>
        </div>
      </SignedIn>
      <SignedOut>
        <Link href='/sign-in'>
          <Button>Sign in</Button>
        </Link>
      </SignedOut>
    </div>
  );
};
