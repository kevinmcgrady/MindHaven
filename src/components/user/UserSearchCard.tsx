import Image from 'next/image';
import Link from 'next/link';

import { urls } from '@/constants/urls';

import { DialogClose } from '../ui/dialog';

type UserSearchCardProps = {
  username: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  country: string;
};

const UserSearchCard = ({
  country,
  firstName,
  imageUrl,
  lastName,
  username,
}: UserSearchCardProps) => {
  return (
    <Link
      className='hover:bg-gray-100 p-4 rounded-lg'
      href={urls.dashboard.externalUserProfile(username)}
    >
      <DialogClose className='flex gap-2 text-start'>
        <Image
          src={imageUrl}
          alt={firstName}
          width={50}
          height={50}
          className='aspect-square rounded-lg'
        />
        <div>
          <p className='text-md font-semibold'>
            {firstName} {lastName}, {country}
          </p>
          <p className='text-sm text-muted-foreground'>@{username}</p>
        </div>
      </DialogClose>
    </Link>
  );
};

export default UserSearchCard;
