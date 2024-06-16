'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const searchUsers = async (query: string) => {
  const user = await currentUser();

  if (!user) return;

  const results = await db.user.findMany({
    where: {
      OR: [
        { firstName: { contains: query } },
        { lastName: { contains: query } },
        { country: { contains: query } },
        {
          tags: {
            has: query,
          },
        },
      ],
    },
    select: {
      lastName: true,
      firstName: true,
      country: true,
      imageUrl: true,
      username: true,
    },
  });

  return results;
};
