import Link from 'next/link';

import Logo from '@/components/site/Logo';
import MobileNav from '@/components/site/MobileNav';
import { buttonVariants } from '@/components/ui/button';
import { urls } from '@/constants/urls';
import { getUserDetails } from '@/queries/auth';

type HeaderProps = {
  hideSignInButton?: boolean;
  hideMobileNav?: boolean;
};

export const Header = async ({
  hideSignInButton = false,
  hideMobileNav = false,
}: HeaderProps) => {
  const user = await getUserDetails();
  return (
    <div className='flex gap-8 items-center mb-4 justify-between bg-white p-4'>
      <Logo />
      {!hideMobileNav && (
        <MobileNav
          userFirstName={user?.firstName}
          userLastName={user?.lastName}
        />
      )}

      {!hideSignInButton && (
        <Link className={buttonVariants()} href={urls.auth.signIn}>
          Sign in
        </Link>
      )}
    </div>
  );
};
