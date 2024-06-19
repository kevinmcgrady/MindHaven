'use server';

import { currentUser } from '@clerk/nextjs/server';
import { format } from 'date-fns';

import { db } from '@/lib/db';

export const getJournalByDate = async (date: Date | string) => {
  const user = await currentUser();

  if (!user) return;

  const selectedDate =
    format(date, 'yyyy-MM-dd').split('T')[0] + 'T00:00:00.000Z';

  const journals = await db.journal.findMany({
    where: {
      userId: user.id,
      createdAt: {
        equals: selectedDate,
      },
    },
  });

  return journals;
};
