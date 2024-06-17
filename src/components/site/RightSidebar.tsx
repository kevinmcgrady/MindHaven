import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { moods } from '@/constants/moods';
import { urls } from '@/constants/urls';
import { getUsersFollowing } from '@/queries/following';

import CardSection from '../layout/CardSection';
import { Badge } from '../ui/badge';

export const RightSidebar = async () => {
  const following = await getUsersFollowing();
  const isFollowingSomeone = following && following.length > 0;

  return (
    <aside className='w-[310px] relative hidden md:flex md:flex-col rounded-xl'>
      {isFollowingSomeone && (
        <Fragment>
          <CardSection noSpacing>
            <h2 className='font-semibold text-lg mb-4'>Friends Activity</h2>
            <div>
              {following.map((follower) => {
                const badgeColor = moods.find(
                  (mood) => mood.name === follower.avgMood,
                )?.color;
                return (
                  <Link
                    key={follower.following.username}
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
                );
              })}
            </div>
          </CardSection>
        </Fragment>
      )}
    </aside>
  );
};
