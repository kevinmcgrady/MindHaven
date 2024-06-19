'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getUserDetails = async () => {
  const authUser = await currentUser();

  if (!authUser) return;

  const user = db.user.findUnique({
    where: {
      emailAddress: authUser.emailAddresses[0].emailAddress,
    },
    include: {
      followers: true,
      following: true,
    },
  });

  return user;
};
