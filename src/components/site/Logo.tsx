import Image from 'next/image';
import Link from 'next/link';

import { urls } from '@/constants/urls';

const Logo = () => {
  return (
    <div className='flex gap-2 items-center'>
      <Image
        src='/images/blob.png'
        alt='MindHaven'
        width={40}
        height={40}
        className='w-fit h-fit aspect-square relative'
      />
      <Link href={urls.home}>
        <h1 className='font-extrabold text-lg'>MindHaven</h1>
      </Link>
    </div>
  );
};

export default Logo;
