'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getAllJournalCount = async () => {
  const user = await currentUser();

  if (!user) return;

  const count = db.journal.aggregate({
    where: {
      userId: user.id,
    },
    _count: true,
  });

  return count;
};
