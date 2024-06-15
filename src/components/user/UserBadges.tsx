import Image from 'next/image';
import { Fragment } from 'react';

const UserBadges = () => {
  return (
    <Fragment>
      <h3 className='font-semibold text-lg mb-4'>Badges</h3>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <Image
          src='/images/badges/badge.png'
          alt='badge'
          width={100}
          height={100}
          className='aspect-square'
        />
        <Image
          src='/images/badges/best-seller.png'
          alt='badge'
          width={100}
          height={100}
          className='aspect-square'
        />
        <Image
          src='/images/badges/bronze-medal.png'
          alt='badge'
          width={100}
          height={100}
          className='aspect-square'
        />
        <Image
          src='/images/badges/best-seller.png'
          alt='badge'
          width={100}
          height={100}
          className='aspect-square'
        />
      </div>
    </Fragment>
  );
};

export default UserBadges;
