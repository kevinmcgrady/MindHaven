import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
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
  );
};

export default Logo;
