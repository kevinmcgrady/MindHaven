'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

import { isUserFollowing } from './isUserFollowing';

export const followUnfollowUser = async (targetUserId: string) => {
  const user = await currentUser();

  if (!user) return;

  const isFollowingAlready = await isUserFollowing(targetUserId);

  if (isFollowingAlready) {
    return await db.follows.delete({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId: targetUserId,
        },
      },
    });
  } else {
    await db.follows.create({
      data: {
        followerId: user.id,
        followingId: targetUserId,
      },
    });
  }
};
