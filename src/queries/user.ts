'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getUserByUsername = async (username: string) => {
  const loggedInUser = await currentUser();

  if (!loggedInUser) return;

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

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
