'use server';

import { currentUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';

import { db } from '../lib/db';

export const syncUser = async () => {
  const authUser = await currentUser();

  if (!authUser) return;

  const doesUserExist = await db.user.findUnique({
    where: {
      emailAddress: authUser.emailAddresses[0].emailAddress,
    },
  });

  if (!doesUserExist) {
    await db.user.create({
      data: {
        id: authUser.id,
        imageUrl: authUser.imageUrl,
        emailAddress: authUser.emailAddresses[0].emailAddress,
        firstName: authUser.firstName!,
        lastName: authUser.lastName!,
      },
    });
  }
};

export const getUserDetails = async () => {
  const authUser = await currentUser();

  if (!authUser) return;

  const user = db.user.findUnique({
    where: {
      emailAddress: authUser.emailAddresses[0].emailAddress,
    },
  });

  return user;
};

export const updateUsersProfile = async (
  userDetails: Pick<User, 'bio' | 'country' | 'mentalHealthGoal' | 'username'>,
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
      hasCompletedProfile: true,
    },
  });

  return updatedUser;
};
