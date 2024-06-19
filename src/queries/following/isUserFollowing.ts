'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const isUserFollowing = async (targetUserId: string) => {
  const user = await currentUser();

  if (!user) return;

  const isFollowingAlready = await db.follows.findFirst({
    where: {
      followerId: user.id,
      followingId: targetUserId,
    },
  });

  return isFollowingAlready;
};
