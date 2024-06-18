import Link from 'next/link';

import Logo from './Logo';

export const Footer = () => {
  return (
    <footer className='bg-[#292829] text-white'>
      <div className='p-8 grid grid-cols-12'>
        <div className='col-span-3'>
          <Logo />
          <p className='text-xs mt-2 mb-4'>
            Your Sanctuary for Connection, Healing, and Mental Wellness.
            Together, We Foster Understanding, Support, and Growth for a
            Healthier Mind.
          </p>
          <p className='text-xs'>
            © {new Date().getFullYear()} MindHaven . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
