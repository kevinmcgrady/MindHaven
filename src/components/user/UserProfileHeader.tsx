import { User } from '@prisma/client';
import Image from 'next/image';
import { Fragment } from 'react';

import { isUserFollowing } from '@/queries/following';
import { formatDate } from '@/utils/formatDate';

import FollowAndSupportButtons from './FollowAndSupportButtons';

type UserProfileHeaderProps = {
  user: User;
  isCurrentUser: boolean;
  noOfFollowers: number;
  noOfFollowing: number;
};

const UserProfileHeader = async ({
  user,
  isCurrentUser,
  noOfFollowers,
  noOfFollowing,
}: UserProfileHeaderProps) => {
  const isFollowing = await isUserFollowing(user.id);

  return (
    <Fragment>
      <div className='bg-overlay bg-cover bg-no-repeat bg-right-bottom h-40 rounded-t-xl relative' />
      <div className='px-2'>
        <Image
          src={user.imageUrl!}
          width={100}
          height={100}
          alt={user.firstName!}
          className='aspect-square rounded-full mx-auto -mt-[50px] z-10 relative'
        />

        <p className='text-center font-light text-sm mt-4 text-muted-foreground'>
          @{user.username}
        </p>

        <h2 className='text-center mt-2 font-semibold text-xl'>
          {user.firstName} {user.lastName}
        </h2>

        <div className='flex items-center justify-center gap-2 mt-2'>
          <p className='text-sm text-[#F77334] font-semibold'>{user.country}</p>
          <p className='text-sm text-muted-foreground'>
            Joined {formatDate(user.createdAt)}
          </p>
        </div>

        <div className='flex gap-2 justify-center mt-2 text-sm text-muted-foreground'>
          <p>
            Followers: <strong>{noOfFollowers}</strong>
          </p>
          <p>
            Following: <strong>{noOfFollowing}</strong>
          </p>
          <p>
            Support: <strong>0</strong>
          </p>
        </div>

        {!isCurrentUser && (
          <FollowAndSupportButtons
            targetUserId={user.id}
            isUserFollowing={Boolean(isFollowing)}
          />
        )}

        <p className='text-center text-sm text-muted-foreground mt-8'>
          {user.bio}
        </p>
      </div>
    </Fragment>
  );
};

export default UserProfileHeader;
