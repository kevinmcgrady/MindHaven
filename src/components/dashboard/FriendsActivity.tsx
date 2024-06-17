import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { moods } from '@/constants/moods';
import { urls } from '@/constants/urls';
import { getUsersFollowing } from '@/queries/following';

import CardSection from '../layout/CardSection';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

type FriendsProps = {
  removePadding?: boolean;
  className?: string;
};

const FriendsActivity = async ({
  removePadding = true,
  className,
}: FriendsProps) => {
  const following = await getUsersFollowing();
  const isFollowingSomeone = following && following.length > 0;

  return (
    <CardSection className={className} noSpacing={removePadding}>
      {!isFollowingSomeone && (
        <p className='text-sm text-muted-foreground'>
          Start following someone to see their progress
        </p>
      )}
      {isFollowingSomeone && (
        <Fragment>
          <h2 className='font-semibold text-lg mb-4'>Friends Activity</h2>
          <div className='flex flex-col gap-4'>
            {following.map((follower, index) => {
              const badgeColor = moods.find(
                (mood) => mood.name === follower.avgMood,
              )?.color;
              return (
                <Fragment key={follower.following.username}>
                  <Link
                    href={urls.dashboard.externalUserProfile(
                      follower.following.username!,
                    )}
                  >
                    <div className='flex items-start gap-2'>
                      <Image
                        className='aspect-square rounded-full'
                        src={follower.following.imageUrl}
                        alt={follower.following.firstName}
                        width={30}
                        height={30}
                      />
                      <div>
                        <h3>
                          <strong>
                            {follower.following.firstName}{' '}
                            {follower.following.lastName}
                          </strong>
                          ,{' '}
                          <span className='font-light text-muted-foreground'>
                            {follower.following.country}
                          </span>
                        </h3>
                        {!follower.avgMood && (
                          <p className='text-sm text-muted-foreground'>
                            {follower.following.firstName} has still to create a
                            journal this month!
                          </p>
                        )}

                        {follower.avgMood && (
                          <div className='mt-2 flex gap-2 items-center'>
                            <p className='text-sm text-muted-foreground'>
                              Avg Mood:
                            </p>
                            <Badge
                              style={{ backgroundColor: badgeColor }}
                              className='rounded-md text-xs text-primary'
                            >
                              {follower.avgMood}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                  {index !== following.length - 1 && <Separator />}
                </Fragment>
              );
            })}
          </div>
        </Fragment>
      )}
    </CardSection>
  );
};

export default FriendsActivity;
