'use server';

import { currentUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';

import { db } from '@/lib/db';

export const updateUsersProfile = async (
  userDetails: Pick<
    User,
    'bio' | 'country' | 'mentalHealthGoal' | 'username' | 'tags'
  >,
) => {
  const authUser = await currentUser();

  if (!authUser) return;

  const user = await db.user.findUnique({
    where: {
      emailAddress: authUser.emailAddresses[0].emailAddress,
    },
  });

  if (!user) return;

  const updatedUser = await db.user.update({
    where: {
      id: authUser?.id,
    },
    data: {
      ...user,
      bio: userDetails.bio,
      mentalHealthGoal: userDetails.mentalHealthGoal,
      country: userDetails.country,
      username: userDetails.username,
      tags: userDetails.tags,
      hasCompletedProfile: true,
    },
  });

  return updatedUser;
};
