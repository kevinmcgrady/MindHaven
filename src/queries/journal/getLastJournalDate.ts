'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getLastJournalDate = async () => {
  const user = await currentUser();

  if (!user) return;

  const journal = await db.journal.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return journal?.createdAt;
};
