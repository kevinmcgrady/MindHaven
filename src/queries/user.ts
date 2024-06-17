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
    include: {
      followers: true,
      following: true,
    },
  });

  return user;
};
