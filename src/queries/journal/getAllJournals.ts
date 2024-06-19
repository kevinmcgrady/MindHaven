'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getAllJournals = async () => {
  const user = await currentUser();

  if (!user) return;

  const journals = await db.journal.findMany({
    where: {
      userId: user.id,
    },
  });

  return journals;
};
