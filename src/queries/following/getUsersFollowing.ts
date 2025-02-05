'use server';

import { currentUser } from '@clerk/nextjs/server';
import { format } from 'date-fns';

import { db } from '@/lib/db';
import { getUsersAvgMood } from '@/utils/getUsersAvgMood';

export const getUsersFollowing = async () => {
  const user = await currentUser();

  if (!user) return;

  const currentMonth = format(new Date(), 'MMM');
  const currentYear = format(new Date(), 'yyyy');

  const following = await db.follows.findMany({
    where: {
      followerId: user.id,
    },
    select: {
      following: {
        select: {
          firstName: true,
          lastName: true,
          imageUrl: true,
          country: true,
          username: true,
          journal: {
            where: {
              createdAtMonth: {
                equals: currentMonth,
              },
              createdAtYear: {
                equals: currentYear,
              },
            },
          },
        },
      },
    },
  });

  const followingWithAvgMoodForTheMonth = following.map((follower) => {
    return {
      ...follower,
      avgMood:
        follower.following.journal.length > 0
          ? getUsersAvgMood(follower.following.journal)
          : null,
    };
  });

  return followingWithAvgMoodForTheMonth;
};
